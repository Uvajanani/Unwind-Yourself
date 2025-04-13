function updateTree(mood) {
    if (localStorage.getItem('moodSelected')) {
      alert("You've already selected your mood for this session! 🌿");
      return;
    }
  
    const treeImage = document.getElementById('treeImage');
    switch (mood) {
      case 'happy':
        treeImage.src = 'images/Happytree.png';
        break;
      case 'sad':
        treeImage.src = 'images/sadtree.png';
        break;
      case 'angry':
        treeImage.src = 'images/angrytree.png';
        break;
      case 'calm':
        treeImage.src = 'images/calmtree.png';
        break;
    }
  
    localStorage.setItem('moodSelected', mood);
  }