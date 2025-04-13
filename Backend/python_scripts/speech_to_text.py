import speech_recognition as sr
import pyttsx3
import sys 

# Initialize recognizer
r = sr.Recognizer()

def record_text():
    while True:
        try:
            with sr.Microphone() as source2:
                print("Listening... (Say 'stop' to exit)")
                
                # Reduce noise adjustment time for faster response
                r.adjust_for_ambient_noise(source2, duration=0.5)  
                
                # Listen for input with a timeout to avoid long waits
                audio2 = r.listen(source2, timeout=5, phrase_time_limit=5)  
                
                # Convert speech to text using Google API
                MyText = r.recognize_google(audio2)
                if MyText.lower() == "stop":
                    print("Stopping speech recognition...")
                    sys.exit(0)
                return MyText  

        except sr.WaitTimeoutError:
            print("No speech detected, try again...")
        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))
        except sr.UnknownValueError:
            print("Could not understand the audio, try again...")

def output_text(text):
    with open("output.txt", "a") as f:
        f.write(text + "\n")

# Main loop
while True:
    text = record_text()
    if text:
        output_text(text)
        print("Wrote text:", text)
