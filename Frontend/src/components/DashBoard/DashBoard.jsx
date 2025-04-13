import React from 'react'
import './DashBoard.css'
import { assets } from '../../assets/assets'
import EmotionBarChart from '../EmotionBarChart.jsx/EmotionBarChart';
import SpeechEmotionBarChart from '../SpeechEmotionBarChart/SpeechEmotionBarChart';
import WeeklyLineChart from '../WeeklyLineChart/WeeklyLineChart';
import MonthlyPieChart from '../MonthlyPieChart/MonthlyPieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const DashBoard = ({userId}) => {
    const [developedAreas, setDevelopedAreas] = useState({
        meditation: 0,
        blogging: 0,
        moodTracker: 0,
      });
    
      useEffect(() => {
        console.log("Fetching developed areas for userId:", userId); 
      
        const fetchDevelopedAreas = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/api/developedArea/developedArea/${userId}`);
            console.log("Developed areas response:", res.data); 
      
            if (res.data.success) {
              setDevelopedAreas(res.data.developedAreas);
            }
          } catch (err) {
            console.error("Error fetching developed areas:", err);
          }
        };
      
        if (userId) fetchDevelopedAreas();
      }, [userId]);


      const [emotionData, setEmotionData] = useState(null);

      useEffect(() => {
      const fetchEmotions = async () => {
        console.log("Fetching developed areas for userId:", userId);

      try {
        const response = await axios.get(`http://localhost:4000/api/emotion/getUser/${userId}`);
        setEmotionData(response.data.probabilities); 
      } catch (err) {
        console.error("Error fetching emotion data:", err);
      }
    };

      if (userId) fetchEmotions();
    }, [userId]);


    const [speechData, setSpeechData] = useState(null);

    useEffect(() => {
        const fetchSpeechEmotions = async () => {
         try {
            const res = await axios.get(`http://localhost:4000/api/getSpeech/${userId}`);
            setSpeechData(res.data.probabilities);
        } catch (err) {
            console.error("Error fetching speech emotion data:", err);
        }
    };

    if (userId) fetchSpeechEmotions();
  }, [userId]);

  const [weeklyEmotionData, setWeeklyEmotionData] = useState([]);

  useEffect(() => {
    const fetchWeeklyEmotions = async () => {
      try {
        const textRes = await axios.get(`http://localhost:4000/api/emotion/getUser/${userId}`);
        const speechRes = await axios.get(`http://localhost:4000/api/getSpeech/${userId}`);
  
        if (textRes.data && speechRes.data) {
          const textProb = textRes.data.probabilities;
          const speechProb = speechRes.data.probabilities;
  
          const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
          const dummyWeeklyData = days.map((day, i) => ({
            day,
            textEmotion: {
              ...textProb,
              joy: (textProb.joy || 0) + i * 0.1,
            },
            speechEmotion: {
              ...speechProb,
              joy: (speechProb.joy || 0) + i * 0.05,
            },
          }));
  
          setWeeklyEmotionData(dummyWeeklyData);
        }
      } catch (err) {
        console.error("Error fetching weekly emotion data:", err);
      }
    };
  
    if (userId) fetchWeeklyEmotions();
  }, [userId]);

  const [monthlyEmotionData, setMonthlyEmotionData] = useState([]);

useEffect(() => {
  const fetchMonthlyEmotionData = async () => {
    try {
      const textRes = await axios.get(`http://localhost:4000/api/emotion/getUser/${userId}`);
      const speechRes = await axios.get(`http://localhost:4000/api/getSpeech/${userId}`);

      const text = textRes.data.probabilities || {};
      const speech = speechRes.data.probabilities || {};

      const emotions = new Set([...Object.keys(text), ...Object.keys(speech)]);
      const merged = Array.from(emotions).map((emotion) => {
        const val1 = parseFloat(text[emotion]) || 0;
        const val2 = parseFloat(speech[emotion]) || 0;
        return {
          name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
          value: (val1 + val2) / 2,
        };
      });

      setMonthlyEmotionData(merged);
    } catch (err) {
      console.error("Error fetching monthly emotion data:", err);
    }
  };

  if (userId) fetchMonthlyEmotionData();
}, [userId]);

     


  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <div className='dashboard-header-left'>
            <div className='dashboard-header-img'>
                <img src={assets.logo} alt="" />
            </div>
            <div className='dashboard-header-title'>
                <h1>Welcome, Buddy</h1>
                <p>Your personal dashboard overview</p>
            </div>
        </div>

        <div className='dashboard-header-right'>
            <img src={assets.profile} alt="" />
        </div>
      </div>

       <div className='dashboard-profile'>
            <div className='dashboard-profile-left'>
                <div className='dashboard-profile-title'>
                    <h1>Profile</h1>
                </div>
                <div className='dashboard-profile-img'>
                    <img src={assets.profile} alt="" />
                </div>
                <div className='dashboard-profile-title'>
                    <h1>John</h1>
                </div>
                <div className='dashboard-profile-tracker'>
                    <div className='dashboard-profile-tracker-item'>
                        <img src={assets.established} alt="" />
                        <p>Medium</p>
                    </div>
                    <div className='dashboard-profile-tracker-item'>
                        <img src={assets.brain} alt="" />
                        <p>13</p>
                    </div>
                </div>
            </div>

            
            <div className='dashboard-profile-middle'>
                <div className='dashboard-profile-middle-title'>
                    <h1>Tasks completed</h1>
                </div>
                <div className='dashboard-profile-right-title'>
                    <h2>0%</h2>
                    <p>Avg. Completed</p>
                </div>
            </div>

            <div className='dashboard-profile-right'>
                <div className='dashboard-profile-right-title'>
                    <h1>User Improvement</h1>
                </div>
                <div className='dashboard-profile-right-title'>
                    <h2>0%</h2>
                    <p>Avg. Improvement</p>
                </div>
            </div>

            <div className='dashboard-right'>
                <div className='dashboard-right-title'>
                    <h1>Developed Areas</h1>
                    <p>Most common areas of interests</p>
                </div>

                <div className='dashboard-bar'>
                    <div className='sports'>
                        <h3>Meditation</h3>
                        <p>{developedAreas.meditation}%</p>
                    </div>

                    <div className='blog'>
                        <h3>Blogging</h3>
                        
                        <p>{developedAreas.blogging}%</p>
                    </div>

                    <div className='mediation'>
                        <h3>MoodTracker</h3>
                        
                        <p>{developedAreas.moodTracker}%</p>
                    </div>

                    
                </div>
            </div>
       </div> 

        <div className='dashboard-analysis'>
            <div>
                <h2>Emotion Analysis</h2>
            </div>
            
            <div className='dashboard-analysis-wrapper'>
                <div className='dashboard-analysis'>
                    <div className='dashboard-text-analysis'>
                        <h1>Text Emotion Analysis</h1>
                        <div className='dashboard-text-bar'>
                            <EmotionBarChart emotionData={emotionData}/>
                        </div>
                    </div>
                </div>

                <div className='dashboard-analysis'>
                    <div className='dashboard-speech-analysis'>
                        <h1>Speech Emotion Analysis</h1>
                        <div className='dashboard-speech-bar'>
                            <SpeechEmotionBarChart emotionData={speechData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='dashboard-weekly-monthly'>
            <div className='dashboard-weekly'>
                <h2>Weekly Analysis</h2>
                <WeeklyLineChart weeklyEmotionData={weeklyEmotionData} />
            </div>

            <div className='dashboard-monthly'>
                <h2>Monthly Analysis</h2>
                <MonthlyPieChart data={monthlyEmotionData}/>
            </div>
        </div>

        <div className='badge-journal'>
            <div className='dashboard-badges'>
                <h3>Badges</h3>
                <div className='badge-item'>
                    <img src={assets.badge1} alt="" />
                    <p>Best Performer</p>
                </div>
                <div className='badge-item'>
                    <img src={assets.badge2} alt="" />
                    <p>Best Emotion Handler</p>
                </div>
            </div>

        </div>

        <footer className="about-footer">
            © {new Date().getFullYear()} Unwind Yourself. All rights reserved.
        </footer>
    </div>
  )
}

export default DashBoard