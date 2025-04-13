import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
         
      <div className="footer-brand">
        <img src={assets.logo} alt="Unwind Yourself Logo" />
        <div className="footer-text">
          <h2>Unwind Yourself</h2>
          <p>A mental wellness platform for overthinkers</p>
        </div>
      </div>


        <div className='courses'>
            <h3>What do we offer</h3>
            <p>Chatbot</p>
            <p>Journaling</p>
            <p>Emotion Detection</p>
            <p>Story Converter</p>
            <p>Community</p>
            <p>Progress Tracker</p>
        </div>
        <ul className="footer-links">
          <li className='quick'>Quick Links</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        </ul>

        <div className='social-links'>
            <div className='follow'> Follow Us On</div>
            <div className="footer-socials">
              <a href="https://www.instagram.com/unwind___yourself/" target="_blank" rel="noopener noreferrer">
                <img src={assets.instagram} alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/in/uvajanani-r-p-214a44257" target="_blank" rel="noopener noreferrer">
                <img src={assets.linkedin} alt="linkedin" />
              </a>
              <a href="https://www.facebook.com/uyirtarget/" target="_blank" rel="noopener noreferrer">
                <img src={assets.facebook} alt="Facebook" />
              </a>
            </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Unwind Yourself. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;