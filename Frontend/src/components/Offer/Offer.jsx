import React from 'react';
import './Offer.css';

const sections = [
  {
    title: 'Your Personal AI Companion',
    text: 'Talk to your own AI chatbot anytime, anywhere — always ready to listen and guide you.',
    img: 'https://cdn-icons-png.flaticon.com/512/4712/4712100.png',
    link: '/chatbot',
  },
  {
    title: 'Personalized Journal Prompts',
    text: 'Receive AI-based suggestions to express your thoughts, reflect, and grow day by day.',
    img: 'https://cdn-icons-png.flaticon.com/512/2907/2907102.png',
    link: '/journal',
  },
  {
    title: 'Speech & Text Emotion Detector',
    text: 'Let your words speak for your emotions. We analyze and respond with kindness and care.',
    img: 'https://cdn-icons-png.flaticon.com/512/742/742751.png',
    link: '/emotion',
  },
  {
    title: 'Story Converter',
    text: 'Transform your thoughts into expressive stories. A gentle way to reflect and heal.',
    img: 'https://cdn-icons-png.flaticon.com/512/7929/7929354.png',
    link: '/story',
  },
  {
    title: 'Supportive Community',
    text: 'Connect with others who understand — share, listen, and grow together.',
    img: 'https://cdn-icons-png.flaticon.com/512/4202/4202843.png',
    link: '/community',
  },
  {
    title: 'Daily Progress Tracker',
    text: 'Monitor your mental wellness, milestones, and improvements with beautiful insights.',
    img: 'https://cdn-icons-png.flaticon.com/512/4167/4167483.png',
    link: '/tracker',
  },
];

const Offer = () => {
  return (
    <div className="offer-wrapper">
      <div className="offer-header">
        <h1>Why Choose</h1>
        <h1 className="highlight">Unwind Yourself</h1>
      </div>
      <div className="offer-grid">
        {sections.map((section, idx) => (
          <div className="offer-card" key={idx}>
            <div className="icon-wrap">
              <img src={section.img} alt={section.title} />
              <h2>{section.title}</h2>
            </div>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
