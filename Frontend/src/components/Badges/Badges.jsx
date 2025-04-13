import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Badges.css'; 
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const badges = [
  {
    title: 'Kind Seed 💖',
    description: 'Planted your first supportive reply in the community.',
    image: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
    locked: false,
  },
  {
    title: 'Empathy Echo 🎧',
    description: 'Wrote 5+ comforting replies with empathy and care.',
    image: 'https://cdn-icons-png.flaticon.com/512/3468/3468377.png',
    locked: false,
  },
  {
    title: 'Hope Builder 🧱',
    description: 'Shared a personal story that inspired others.',
    image: 'https://cdn-icons-png.flaticon.com/512/2762/2762494.png',
    locked: false,
  },
  {
    title: 'Positive Pulse 💗',
    description: 'Maintain consistent positivity in all replies.',
    image: 'https://cdn-icons-png.flaticon.com/512/1484/1484679.png',
    locked: false,
  },
  {
    title: 'Support Star 🌟',
    description: 'Received 5+ likes or thank-yous from other users.',
    image: 'https://cdn-icons-png.flaticon.com/512/2909/2909767.png',
    locked: false,
  },
  {
    title: 'Mindful Mentor 🧘‍♂️',
    description: '7-day streak of kind and helpful interactions.',
    image: 'https://cdn-icons-png.flaticon.com/512/3308/3308582.png',
    locked: false,
  },
  {
    title: 'The Phoenix 🔥🕊',
    description: 'Earned all badges and now lead with clarity.',
    image: 'https://cdn-icons-png.flaticon.com/512/4509/4509119.png',
    locked: false,
  },
  {
    title: 'Silent Supporter 🤫',
    description: 'Quietly cheered others on during tough times.',
    image: 'https://cdn-icons-png.flaticon.com/512/5473/5473666.png',
    locked: false,
  },
  {
    title: 'Uplift Warrior 🛡️',
    description: 'Defended others from negativity with kindness.',
    image: 'https://cdn-icons-png.flaticon.com/512/1982/1982830.png',
    locked: false,
  },
];

const Badges = () => {
    const navigate = useNavigate()
  useEffect(() => {
    const newlyUnlocked = badges.filter(b => b.newlyUnlocked);
    if (newlyUnlocked.length > 0) {
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.wav');
      audio.play();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
      });

      const toast = document.getElementById('toast');
      toast.textContent = `You unlocked: ${newlyUnlocked[0].title}!`;
      toast.style.display = 'block';
      setTimeout(() => (toast.style.opacity = 1), 100);
      setTimeout(() => (toast.style.opacity = 0), 3000);
      setTimeout(() => (toast.style.display = 'none'), 3400);
    }
  }, []);

  return (
    <div className="badge-container">
      <img onClick={() => navigate('/dashboard')} className='left-img' src={assets.leftArrow} alt="" />
      <h1>🌟 Badges Showcase</h1>
      <div className="profile">
        <h4>unwindyourself25@gmail.com</h4>
        <p>“From chaos to clarity ✨”</p>
      </div>

      <div className="badges">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`badge ${badge.locked ? 'locked' : ''} ${badge.newlyUnlocked ? 'newly-unlocked' : ''}`}
          >
            <img src={badge.image} alt={badge.title} />
            <h3>{badge.title}</h3>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>

      <div id="toast" className="toast"></div>
    </div>
  );
};

export default Badges;
