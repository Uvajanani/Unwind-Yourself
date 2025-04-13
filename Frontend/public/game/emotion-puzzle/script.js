const emotions = [
    { face: '😊', emotion: 'Happy', opposite: 'Angry' },
    { face: '😢', emotion: 'Sad', opposite: 'Happy' },
    { face: '😡', emotion: 'Angry', opposite: 'Calm' },
    { face: '😌', emotion: 'Calm', opposite: 'Sad' }
  ];
  
  const grid = document.getElementById('puzzle-grid');
  const result = document.getElementById('result');
  
  let selectedFace = null;
  let matchCount = 0;
  let gameEnded = false;
  
  function createPuzzle() {
    const shuffledFaces = [...emotions].sort(() => 0.5 - Math.random());
    const shuffledLabels = [...emotions].sort(() => 0.5 - Math.random());
  
    shuffledFaces.forEach(item => {
      const faceDiv = document.createElement('div');
      faceDiv.className = 'puzzle-item';
      faceDiv.textContent = item.face;
      faceDiv.onclick = () => {
        if (gameEnded) return;
        selectedFace = item;
        result.textContent = `Selected: ${item.face}`;
      };
      grid.appendChild(faceDiv);
    });
  
    shuffledLabels.forEach(item => {
      const labelDiv = document.createElement('div');
      labelDiv.className = 'puzzle-item';
      labelDiv.textContent = item.opposite;
      labelDiv.onclick = () => {
        if (gameEnded) return;
        if (!selectedFace) {
          result.textContent = 'Select a face first!';
          return;
        }
        if (selectedFace.opposite === item.opposite) {
          result.textContent = '🎉 Correct match!';
          matchCount++;
          if (matchCount === emotions.length) {
            result.textContent = 'You’ve completed the Emotion Puzzle!';
            gameEnded = true;
          }
        } else {
          result.textContent = 'Try again!';
        }
        selectedFace = null;
      };
      grid.appendChild(labelDiv);
    });
  }
  
  createPuzzle();
  