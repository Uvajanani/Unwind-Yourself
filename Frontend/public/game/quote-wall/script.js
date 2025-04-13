const quotes = [
    "You are stronger than you think.",
    "This too shall pass.",
    "Breathe. Relax. You got this.",
    "Be kind to yourself.",
    "You are doing your best and that’s enough.",
    "It’s okay to not be okay.",
    "Healing takes time. Keep going."
  ];
  
  const quoteGrid = document.getElementById('quoteGrid');
  const greeting = document.getElementById('greeting');
  const voiceover = document.getElementById('voiceover');
  const moodSelector = document.getElementById('moodSelector');
  
  const userName = localStorage.getItem('userName') || 'Bharathi';
  greeting.textContent = `Hey ${userName}, here's your healing wall 💖`;
  
  quotes.forEach((quote, index) => {
    const card = document.createElement('div');
    card.className = 'quote-card';
    card.textContent = quote;
    card.addEventListener('click', () => {
      const audio = new SpeechSynthesisUtterance(`${userName}, ${quote}`);
      audio.rate = 1;
      audio.pitch = 1.2;
      speechSynthesis.speak(audio);
    });
    quoteGrid.appendChild(card);
  });
  
  moodSelector.addEventListener('change', (e) => {
    const mood = e.target.value;
    const body = document.body;
    switch (mood) {
      case 'happy':
        body.style.background = 'linear-gradient(to right, #fceabb, #f8b500)';
        break;
      case 'sad':
        body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        break;
      case 'angry':
        body.style.background = 'linear-gradient(to right, #e74c3c, #c0392b)';
        break;
      case 'calm':
        body.style.background = 'linear-gradient(to right, #a1ffce, #faffd1)';
        break;
      default:
        body.style.background = 'linear-gradient(to right, #a1c4fd, #c2e9fb)';
    }
  });
  