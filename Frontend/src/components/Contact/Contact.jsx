import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwg-Gqxs1Q-AuGB5Z9k9dHm_TPVWI6Ub7P5rpYbXFDMMsporjmsiXAB4TdQmVDvuV_T/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: form,
      });

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error!', error.message);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <header>
        <h1>Unwind Yourself</h1>
      </header>

      <div className="container">
        <div className="contact-card">
          <div className="left-section">
            <div className="form-section">
              <h2>Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit">Send Message</button>
                {success && <p className="success-message">✅ Your message has been sent successfully!</p>}
              </form>
            </div>
          </div>

          <div className="right-section">
            <div className="details-section">
              <h2>Our Contact Details</h2>
              <p>📧 Email : unwindyourself25@gmail.com</p>
              <p>🏢 Company : Unwind Yourself</p>
              <p>📍 Address : Anna Salai, Tiruchirapalli - 620002</p>
            </div>

            <div className="map-section">
              <h2>Find Us Here</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7834.482904920124!2d78.75912111120664!3d10.945124967296548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1742790083337!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <footer className="about-footer">
        © {new Date().getFullYear()} Unwind Yourself. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
