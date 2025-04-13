function changeBalloonColor() {
    const mood = document.getElementById('mood-select').value;
    const balloon = document.getElementById('balloon');
  
    if (mood === 'angry') {
      balloon.style.background = '#ff4d4d'; 
    } else if (mood === 'sad') {
      balloon.style.background = '#4da6ff';
    } else {
      balloon.style.background = '#ff6b81'; 
    }
  }
  
  function updateBalloonText() {
    const thought = document.getElementById("thought").value;
    document.getElementById("balloon-text").textContent = thought.slice(0, 60);
  }
  
  function popBalloon() {
    const mood = document.getElementById('mood-select').value;
    const thought = document.getElementById("thought").value.trim();
    const balloon = document.getElementById("balloon");
    const popSound = document.getElementById("pop-sound");
    const flySound = document.getElementById("fly-sound");
    const poppedText = document.getElementById("popped");
  
    if (thought === "") {
      alert("Please write something inside the balloon before releasing.");
      return;
    }
  
    balloon.classList.remove("burst", "fly-away");
    poppedText.classList.add("hidden");
  
    if (mood === "angry") {
      balloon.classList.add("burst");
      popSound.play();
      poppedText.innerText = "💥 Balloon Popped! Feel lighter now 💖";
    } else if (mood === "sad") {
      balloon.classList.add("fly-away");
      flySound.play();
      poppedText.innerText = "🎈 Balloon Flew Away with your sadness 💫";
    } else {
      alert("Please select a mood before releasing.");
      return;
    }
  
    poppedText.classList.remove("hidden");
  
    setTimeout(() => {
      balloon.style.display = "none";
      setTimeout(() => {
        resetBalloon();
      }, 1500);
    }, 1000);
  }
  
  function resetBalloon() {
    const balloon = document.getElementById("balloon");
    const thought = document.getElementById("thought");
    document.getElementById("balloon-text").textContent = "";
    thought.value = "";
    balloon.classList.remove("burst", "fly-away");
    changeBalloonColor();
    balloon.style.display = "flex";
  }
  
  