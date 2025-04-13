import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div>
    <section className="privacy-wrapper">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-intro">
          At <strong>Overthinker's Haven</strong>, your privacy is a top priority. This Privacy Policy explains how we collect, use, and protect your personal information while offering a personalized and supportive user experience.
        </p>

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <ul className="privacy-list">
            <li><strong>Personal Information:</strong> Includes your name, email, and optional profile details.</li>
            <li><strong>Chat & Journal Entries:</strong> Securely processed content to enhance emotional insights and personalization.</li>
            <li><strong>Emotion Data:</strong> Voice and text analysis for understanding emotional states and offering support.</li>
            <li><strong>Usage Behavior:</strong> Actions like page visits, time spent, and interactions to improve usability.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>2.  How We Use Your Data</h2>
          <ul className="privacy-list">
            <li>Provide personalized chatbot and journaling experiences.</li>
            <li>Offer emotion-driven tips and wellness suggestions.</li>
            <li>Generate analytics and track your mental wellness journey.</li>
            <li>Continuously improve platform functionality based on user behavior.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. Information Sharing</h2>
          <p>
            <strong>We never sell or share your data</strong> with third parties. All data remains within Overthinker’s Haven, secured by encryption and privacy protocols.
          </p>
        </div>

        <div className="privacy-section">
          <h2>4. Your Rights & Choices</h2>
          <ul className="privacy-list">
            <li>Access, modify, or delete your profile information at any time.</li>
            <li>Disable emotion detection features if preferred.</li>
            <li>Request a complete export of your personal data.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>5. Data Protection</h2>
          <p>
            We implement industry-leading encryption, secure storage, and access control measures. Your emotional and personal data are strictly safeguarded.
          </p>
        </div>

        <div className="privacy-section">
          <h2>6. Children’s Privacy</h2>
          <p>
            Our services are designed for individuals 13 and older. We do not knowingly collect data from children without verified parental consent.
          </p>
        </div>

        <div className="privacy-section">
          <h2>7. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy as our services evolve. Significant changes will be clearly communicated through platform notifications or email.
          </p>
        </div>

        <div className="privacy-section">
          <h2>8. Contact Us</h2>
          <p>We're here to help with any privacy-related inquiries.</p>
          <p><strong>Email:</strong> unwindyourself25@gmail.com</p>
        </div>
      </div>
    </section>

    <footer className="about-footer">
        © {new Date().getFullYear()} Unwind Yourself. All rights reserved.
    </footer>
   </div>
  );
};

export default Privacy;
