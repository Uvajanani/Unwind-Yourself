
const storyTemplates = {
    romance: ({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather }) => `
      <h2>🌹 Chapter 1: The First Glance</h2>
      <p>At the peaceful hour of ${timeOfDay}, under the ${weather} sky, lived a soul named <b>${name}</b>, known for their glowing <b>${trait}</b>.</p>
      <p>${name} always believed love was just a story others told—until they met ${favPerson} in the heart of ${place}.</p>
      <p>With their enchanted ${pet} beside them and the taste of ${food} lingering on their lips, everything felt different.</p>
      <p>They carried ${favPerson} in their heart and whispered their favorite quote, <i>"${quote}"</i>, like a spell.</p>
      <p>The soft sounds of ${music} played in the air as they took their first step into a new chapter...</p>
  
      <h2>💕 Chapter 2: Moments of Magic</h2>
      <p>They wandered under moonlight, whispered dreams of ${dreamWord}, and laughed through little storms.</p>
      <p>Every glance from ${favPerson} was like a melody — gentle, true, and unforgettable.</p>
      <p>With ${pet} leading the way, they stumbled upon glowing flowers and talking winds.</p>
  
      <h2>💌 Chapter 3: The Confession</h2>
      <p>In the Garden of Whispers, ${favPerson} finally spoke the truth hidden in their eyes all along...</p>
  
      <h2>💍 Chapter 4: A Promise</h2>
      <p>Under the sky bursting with stardust, they vowed something eternal...</p>
  
      <h2>📖 Chapter 5: Ever After</h2>
      <p>${name} and ${favPerson} built a world filled with ${dreamWord}, guided by ${pet} and powered by the quote they lived by: "${quote}".</p>
      <p>And every time they opened the journal, they remembered...</p>
      <p>"The journey was real, and love was the spell."</p>
    `,
  
    fantasy: ({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather }) => `
      <h2>🧙 Chapter 1: The Calling</h2>
      <p>In the realm of ${place}, during the ${weather} hour of ${timeOfDay}, a being named <b>${name}</b> awakened to the whispers of destiny.</p>
      <p>Guided by their ${trait} and a loyal ${pet}, they set off with only a bag of ${food} and a memory of <b>${favPerson}</b>'s voice.</p>
      <p>That voice echoed, "${quote}," and lit the flames of courage in ${name}'s heart.</p>
  
      <h2>🔮 Chapter 2: The Enchanted Path</h2>
      <p>As ${music} floated in the air, magical lights danced around them...</p>
  
      <h2>🔑 Chapter 3: The Secret of the Dream Word</h2>
      <p>${dreamWord} was more than a wish — it was the name of a forbidden spell hidden in ancient scripts...</p>
  
      <h2>🌌 Chapter 4: The Celestial Trial</h2>
      <p>Trials of mind, heart, and power awaited ${name}, testing every belief they held...</p>
  
      <h2>🏰 Chapter 5: The Crown of Stars</h2>
      <p>With ${favPerson}'s memory strong, and ${pet} by their side, they faced the final challenge and found the truth of their tale.</p>
    `,
  
    feelGood: ({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather }) => `
      <h2>🌞 Chapter 1: A New Beginning</h2>
      <p>On a ${weather} morning at ${timeOfDay}, <b>${name}</b> smiled at the sun rising over ${place}. Their ${trait} always made others feel warm inside.</p>
      <p>Life was full of small joys: the smell of ${food}, the comfort of ${pet}, and the sound of ${music} playing softly in the background.</p>
  
      <h2>🌼 Chapter 2: The Little Wonders</h2>
      <p>Every step in ${place} revealed magic in the mundane. ${name} and ${favPerson} made every walk an adventure, laughing at silly jokes and finding beauty in fallen leaves.</p>
  
      <h2>🍃 Chapter 3: Breezy Days</h2>
      <p>The breeze carried their dreams — little hopes wrapped in the word "${dreamWord}". It was more than just a dream, it was a direction.</p>
  
      <h2>🎈 Chapter 4: Sunshine and Silence</h2>
      <p>In moments of quiet, they found meaning. Sometimes, it was just ${name}, ${favPerson}, and ${pet} lying in the grass, talking about the stars.</p>
  
      <h2>📓 Chapter 5: Always Enough</h2>
      <p>Their favorite quote, "${quote}," echoed in every corner of their simple, beautiful world. And that was enough.</p>
    `,
  
    thriller: ({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather }) => `
      <h2>🌘 Chapter 1: The Disappearance</h2>
      <p>It was a ${weather} ${timeOfDay} in ${place} when <b>${name}</b> noticed ${favPerson} was missing. Their sharp ${trait} sensed something wasn't right.</p>
      <p>Clues were few, but a trail of ${food} crumbs and a melody of ${music} echoed in the shadows...</p>
  
      <h2>🔍 Chapter 2: The Cipher</h2>
      <p>Hidden messages carved into ancient walls whispered the word: "${dreamWord}".</p>
  
      <h2>🗠 Chapter 3: The Hidden Truth</h2>
      <p>${name}, accompanied by ${pet}, uncovered secrets buried deep beneath the city. Everyone had something to hide.</p>
  
      <h2>🚪 Chapter 4: Into the Maze</h2>
      <p>Twisting tunnels and ticking clocks... ${name} had only hours left before the truth would vanish forever.</p>
  
      <h2>⚖️ Chapter 5: The Final Reveal</h2>
      <p>With heart racing, ${name} faced the mastermind — and the words of ${favPerson}'s last note: "${quote}" brought everything together.</p>
    `,
  
    mystery: ({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather }) => `
      <h2>🔯 Chapter 1: Shadows in ${place}</h2>
      <p>${name}, a curious soul known for their ${trait}, stumbled upon a locked diary in an abandoned house during a ${weather} ${timeOfDay}.</p>
      <p>The only clue? A whisper of ${music} and a torn page with "${dreamWord}" written in faded ink.</p>
  
      <h2>🧹 Chapter 2: The Pieces Fit</h2>
      <p>Following the scent of ${food}, ${name} and their ${pet} found a hidden passage beneath ${place}...</p>
  
      <h2>📜 Chapter 3: The Forgotten Name</h2>
      <p>The diary revealed stories of ${favPerson}, a person who vanished decades ago after writing: "${quote}".</p>
  
      <h2>🔀 Chapter 4: Loop of Time</h2>
      <p>Reality blurred as timelines twisted — ${name} was living the story of the diary itself.</p>
  
      <h2>🔓 Chapter 5: Truth Unlocked</h2>
      <p>One final clue from ${pet} brought everything together. ${name} wrote the last line of the diary — and the mystery lived on.</p>
    `,
  
    adventure: ({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather }) => `
      <h2>🏞️ Chapter 1: The Map</h2>
      <p>One ${weather} ${timeOfDay}, ${name} found an old map tucked inside a box of ${food}. The note read: "To find ${dreamWord}, trust your ${trait}."</p>
  
      <h2>🚖 Chapter 2: River of Beats</h2>
      <p>With ${pet} by their side and the sound of ${music}, ${name} paddled down a shimmering river through ${place}.</p>
  
      <h2>🤭 Chapter 3: Signs in the Wild</h2>
      <p>Nature spoke in riddles, and every step closer revealed clues about ${favPerson} and their final journey.</p>
  
      <h2>🔥 Chapter 4: The Fire Within</h2>
      <p>After battling storms and doubts, ${name} discovered the strength they'd always had.</p>
  
      <h2>🎯 Chapter 5: Found and Free</h2>
      <p>At the final spot marked on the map, ${name} whispered, "${quote}" — and the journey turned into legacy.</p>
    `
  };
  
  
  document.getElementById("storyForm").addEventListener("submit", function(e) {
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
      const storyHTML = templateFunc({ name, favPerson, pet, place, trait, food, timeOfDay, dreamWord, quote, music, weather });
      document.getElementById("storyResult").innerHTML = storyHTML;
    } else {
      document.getElementById("storyResult").innerHTML = "<p>Please select a valid genre to continue.</p>";
    }
  });
  