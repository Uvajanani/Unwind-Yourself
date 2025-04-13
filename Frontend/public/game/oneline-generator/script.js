document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const userName = document.getElementById('userName').value;
    const userMood = document.getElementById('userMood').value;
  
    const healingMessage = generateHealingMessage(userName, userMood);
    
    const generatedMessageElement = document.getElementById('generatedMessage');
    generatedMessageElement.textContent = healingMessage;
    
    generatedMessageElement.style.opacity = 0; 
    setTimeout(() => {
      generatedMessageElement.style.opacity = 1;
    }, 10); 
  });
  
  function generateHealingMessage(name, mood) {
    if (mood.toLowerCase() === "happy") {
      return `Hey ${name}, keep shining brightly! Your positivity is contagious! 🌟`;
    } else if (mood.toLowerCase() === "sad") {
      return `Hey ${name}, it's okay to feel this way. Remember, even the darkest clouds eventually clear up. You got this! ☁️🌈`;
    } else if (mood.toLowerCase() === "angry") {
      return `Hey ${name}, take a deep breath. Let the storm pass. You’re strong enough to handle this! 💨💪`;
    } else if (mood.toLowerCase() === "calm") {
      return `Hey ${name}, peace is within you. Embrace it, and feel the serenity all around you. 🌸✨`;
    } else {
      return `Hey ${name}, whatever you're feeling right now is valid. Take a moment to breathe and let peace fill your heart. 🌿💖`;
    }
  }
  
