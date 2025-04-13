import numpy as np
import sounddevice as sd
import librosa
import librosa.display
import tensorflow as tf
from tensorflow.keras.models import load_model
import scipy.io.wavfile as wav

model = load_model("C:/Users/JANANI/Desktop/Emotion/speech_emotion_model.h5")

DURATION = 10 
SAMPLE_RATE = 22050 

def record_audio(duration, sample_rate):
    print("Recording...")
    audio_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
    sd.wait()
    print("Recording finished.")
    return audio_data.flatten()

def extract_features(audio, sample_rate):
    mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
    mfccs = np.mean(mfccs.T, axis=0)
    return mfccs.reshape(1, -1)

def predict_emotion():
    audio = record_audio(DURATION, SAMPLE_RATE)
    features = extract_features(audio, SAMPLE_RATE)

    features = np.expand_dims(features, axis=-1)

    predictions = model.predict(features)
    predicted_emotion = np.argmax(predictions)

    emotion_labels = {0: "Happy", 1: "Sad", 2: "Angry", 3: "Fear", 4: "Neutral"}
    print(f"Predicted Emotion: {emotion_labels.get(predicted_emotion, 'Unknown')}")

if __name__ == "__main__":
    predict_emotion()
