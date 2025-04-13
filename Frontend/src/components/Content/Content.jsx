import React from "react";
import './Content.css'
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Content = () => {

    const navigate = useNavigate()

    return (
        <div>
        <div className="content-container">
            <div onClick={() => navigate('/chat')} className="chatbot">
                <div className="content-img">
                    <img src={assets.chatbot} alt="" />
                </div>

                <div className="content-text">
                    <h4>ChatBot</h4>
                    <p>Users can chat and share their feelings, providing emotional support and guidance. </p>
                </div>
            </div>

            <div onClick={() => navigate('/community')} className="Community">
                <div className="content-img">
                    <img src={assets.community} alt="" />
                </div>

                <div className="content-text">
                    <h4>Community</h4>
                    <p>Users can connect with others, share their feelings, and find emotional support. </p>
                </div>
            </div>

            <div onClick={() => navigate('/entertainment')} className="Entertainment">
                <div className="content-img">
                    <img src={assets.soul} alt="" />
                </div>

                <div className="content-text">
                    <h4>Entertainment</h4>
                    <p>Users can engage in recommended activities like meditation, listening to stress-free music, and other calming exercises.</p>
                </div>
            </div>

            <div onClick={() => navigate('/voice')} className="Voice">
                <div className="content-img">
                    <img src={assets.voice} alt="" />
                </div>

                <div className="content-text">
                    <h4>Voice Talk</h4>
                    <p>The AI analyzes emotions from the user's voice and provides personalized assistance. </p>
                </div>
            </div>
        </div>
    
        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Unwind Yourself. All rights reserved.</p>
        </div>
        </div>
    )
}

export default Content