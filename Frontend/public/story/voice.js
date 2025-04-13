let currentUtterance = null;

function speakStory(text) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  const calmVoice = voices.find(voice =>
    voice.name.includes("Google UK English Female") || voice.name.includes("Zira")
  );

  if (calmVoice) {
    utterance.voice = calmVoice;
  }

  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function pauseStory() {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
  }
}

function resumeStory() {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}

function stopStory() {
  window.speechSynthesis.cancel();
}

