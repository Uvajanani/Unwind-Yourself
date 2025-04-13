document.getElementById("storyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const genre = document.getElementById("storyType").value;
  const name = document.getElementById("name").value;
  const favPerson = document.getElementById("favPerson").value;
  const pet = document.getElementById("pet").value;
  const place = document.getElementById("place").value;
  const trait = document.getElementById("trait").value;
  const food = document.getElementById("food").value;
  const timeOfDay = document.getElementById("timeOfDay").value;
  const dreamWord = document.getElementById("dreamWord").value;
  const quote = document.getElementById("quote").value;
  const music = document.getElementById("music").value;
  const weather = document.getElementById("weather").value;

  const templateFunc = storyTemplates[genre];

  if (templateFunc) {
    const storyHTML = templateFunc({
      name,
      favPerson,
      pet,
      place,
      trait,
      food,
      timeOfDay,
      dreamWord,
      quote,
      music,
      weather
    });

    document.getElementById("storyResult").innerHTML = `
      <div id="finalStory">${storyHTML}</div>
      <div class="audio-controls">
        <button onclick="speakStory(document.getElementById('finalStory').innerText)">🔊 Listen</button>
        <button onclick="pauseStory()">⏸ Pause</button>
        <button onclick="resumeStory()">▶️ Resume</button>
        <button onclick="stopStory()">⏹ Stop</button>
      </div>
    `;
  } else {
    document.getElementById("storyResult").innerHTML =
      "<p>Please select a valid genre to continue.</p>";
  }
});


  
  