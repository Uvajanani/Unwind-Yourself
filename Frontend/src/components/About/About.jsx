import React from "react";
import "./About.css";
import { assets } from "../../assets/assets";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Unwind Yourself</h1>
        <p className="about-para">Your calm corner in a noisy world.</p>
      </header>

      <section className="about-why">
        <img
          src={assets.calmPerson}
          alt="Calm person"
          className="about-image"
        />
        <div className="about-text">
          <h2>Why Unwind Youself?</h2>
          <p>
            Overthinking can steal your joy, disturb your peace, and make you
            feel lost. That’s why we created Unwind Youself — a space that listens,
            understands, and supports you whenever you need it.
            <br />
            <br />
            
            In a world that never pauses, <b>"Unwind Yourself"</b> is your gentle reminder to breathe, reflect, and reconnect. We’re not just another wellness app — we’re a safe space crafted for overthinkers, deep feelers, and anyone seeking calm in chaos. 

            <br />
            <br />
            With personalized emotional support, mindful content, and a nurturing community, we help you slow down the mental noise and rediscover peace — one moment at a time. Choose Unwind Yourself, because your thoughts deserve kindness too
          </p>
        </div>
      </section>

      <section className="meet-our-team">
        <h2>Meet our team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="team-member-img">
                <img src={assets.developer1} alt="" />
            </div>
            <div className="team-member-info">
                <h3>Uvajanani R P</h3>
                <a href="https://www.linkedin.com/in/uvajanani-r-p-214a44257" target="_blank" rel="noopener noreferrer">
                    <img src={assets.linkedin} alt="LinkedIn" />
                </a>
            </div>
            <div className="team-member-role">
                <p>MERN Stack Developer</p>
            </div>
          </div>

          <div className="team-member">
            <div className="team-member-img">
                <img src={assets.developer2} alt="" />
            </div>
            <div className="team-member-info">
                <h3>Yuhanncia Mary S</h3>
                <a href="https://www.linkedin.com/in/yuhannciamary21" target="_blank" rel="noopener noreferrer">
                    <img src={assets.linkedin} alt="LinkedIn" />
                </a>
            </div>
            <div className="team-member-role">
                <p>Web Developer</p>
            </div>
          </div>

          <div className="team-member">
            <div className="team-member-img">
                <img src={assets.developer3} alt="" />
            </div>
            <div className="team-member-info">
                <h3>Yugabharathi T</h3>
                <a href="https://www.linkedin.com/in/yuga-bharathi-688b2b257" target="_blank" rel="noopener noreferrer">
                    <img src={assets.linkedin} alt="LinkedIn" />
                </a>
            </div>
            <div className="team-member-role">
                <p>Web Developer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-promise">
        <h2>Our Promise</h2>
        <div className="promise-grid">
            <div className="promise-item">
                <h3>🫶 We Listen Without Judgment</h3>
                <p>We promise to be your safe space — where you can speak your mind, share your thoughts, without fear of being judged or misunderstood.</p>
            </div>

            <div className="promise-item">
                <h3>🌈 We Guide With Empathy</h3>
                <p>Through mindful tools, emotion-aware chat support, and gentle nudges, we help you find clarity and calm in the chaos.</p>
            </div>

            <div className="promise-item">
                <h3>🧘‍♀️ We Celebrate Your Journey</h3>
                <p>You don’t need to have it all figured out. Every step you take toward peace, no matter how small, is worth celebrating. </p>
            </div>
        </div>
      </section>

      <footer className="about-footer">
        © {new Date().getFullYear()} Unwind Yourself. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
