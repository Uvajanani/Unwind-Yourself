document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    
    const userName = document.getElementById('userName').value;
    const userMood = document.getElementById('userMood').value;
  
    // Generate a personalized healing message based on input
    const healingMessage = generateHealingMessage(userName, userMood);
    
    // Display the generated message with animation
    const generatedMessageElement = document.getElementById('generatedMessage');
    generatedMessageElement.textContent = healingMessage;
    
    // Trigger the fade-in animation on the message
    generatedMessageElement.style.opacity = 0; // Reset opacity
    setTimeout(() => {
      generatedMessageElement.style.opacity = 1;
    }, 10); // Small timeout to trigger the CSS animation
  });
  
  function generateHealingMessage(name, mood) {
    // Logic for generating different responses based on mood
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
  
