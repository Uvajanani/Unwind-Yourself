from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper, tempfile, os, base64
from gtts import gTTS
import google.generativeai as genai
import subprocess
import requests
from pydub import AudioSegment


app = Flask(__name__)
CORS(app)



genai.configure(api_key="AIzaSyDM9dN0Na5fS0ymucQxAktjxRlHixBHrkY")
gemini_model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
whisper_model = whisper.load_model("base")
DEEPGRAM_API_KEY = "b36cb0a9ce446eda1ce124a21279af5a586b092a"

@app.route('/assistant', methods=['POST'])
def assistant():
    try:
        audio_file = request.files['audio']
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as f:
            audio_file.save(f.name)
            audio_path = f.name
            output_path = audio_path.replace(".webm", ".wav")

        subprocess.run(['ffmpeg', '-i', audio_path, output_path])
        result = whisper_model.transcribe(output_path)
        user_text = result["text"]

        if not user_text.strip():
            return jsonify({"reply": "Didn't catch that."})

        ai_reply = gemini_model.generate_content(user_text).text.strip()

        tts = gTTS(text=ai_reply, lang='en')
        mp3_path = os.path.join(tempfile.gettempdir(), "reply.mp3")
        tts.save(mp3_path)

        with open(mp3_path, "rb") as f:
            audio_base64 = base64.b64encode(f.read()).decode("utf-8")

        return jsonify({"text": user_text, "reply": ai_reply, "audio": audio_base64})

    except Exception as e:
        print("🔥 Assistant route error:", e) 
        return jsonify({"error": str(e)}), 500


@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    audio_path = "temp.wav"

    audio = AudioSegment.from_file(audio_file, format="webm")
    audio.export(audio_path, format="wav")

    with open(audio_path, 'rb') as f:
        response = requests.post(
            "https://api.deepgram.com/v1/listen?punctuate=true&model=nova&emotion=true",
            headers={
                "Authorization": f"Token {DEEPGRAM_API_KEY}",
                "Content-Type": "audio/wav"
            },
            data=f
        )

    os.remove(audio_path)

    if response.status_code != 200:
        return jsonify({'error': 'Deepgram API failed', 'details': response.text}), 500

    data = response.json()

    print("🔍 Deepgram response:", data)

    emotions = data.get("results", {}).get("channels", [{}])[0].get("alternatives", [{}])[0].get("emotions", {})
    
    if not emotions:
        print("⚠️ No emotions detected.")
        emotions = {"neutral": 1.0}
    return jsonify({'emotions': emotions})




if __name__ == '__main__':
    app.run(port=5000)