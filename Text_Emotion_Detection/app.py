from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

model_path = "model/text_emotion.pkl" 
pipe_lr = joblib.load(model_path)

emotions_emoji_dict = {
    "anger": "😠", "disgust": "🤮", "fear": "😨😱", "happy": "🤗",
    "joy": "😂", "neutral": "😐", "sad": "😔", "sadness": "😔",
    "shame": "😳", "surprise": "😮"
}

app = Flask(__name__)
CORS(app)  

def predict_emotions(text):
    prediction = pipe_lr.predict([text])[0]
    probability = pipe_lr.predict_proba([text])[0] 
    return prediction, probability

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    print("Received request data:", data) 

    text = data.get("text", "")

    if not text:
        print("No text provided!")
        return jsonify({"error": "No text provided"}), 400

    try:
        predicted_emotion, probabilities = predict_emotions(text)
        print("Predicted emotion:", predicted_emotion)

        response = {
            "text": text,
            "predicted_emotion": predicted_emotion,
            "emoji": emotions_emoji_dict.get(predicted_emotion, ""),
            "probabilities": {
                emotion: round(prob, 4) 
                for emotion, prob in zip(pipe_lr.classes_, probabilities)
            }
        }

        return jsonify(response)
    
    except Exception as e:
        print("Prediction error:", str(e))  
        return jsonify({
            "predicted_emotion": "unknown",
            "botReply": "Something went wrong."
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
