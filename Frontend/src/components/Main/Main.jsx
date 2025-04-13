// import React, { useContext } from "react";
// import "./Main.css";
// import { assets, avatars } from "../../assets/assets";
// import { Context } from "../../context/Context";
// import { useNavigate } from "react-router-dom";
// import "chart.js/auto"; // Import Chart.js for bar chart

// const Main = () => {
//   const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, emotionData } =
//     useContext(Context);
//   const navigate = useNavigate();

//   return (
//     <div className="main">
//       <div className="nav">
//         <p>Welcome to Unwind Yourself 🕊️</p>
//         <img onClick={() => navigate("/edit-profile")} src={avatars.avatar12} alt="User" />
//       </div>
//       <div className="main-container">
//         {!showResult ? (
//           <div className="greet">
//             <p>Feel free to share with me ❤️</p>
//           </div>
//         ) : (
//           <div className="result">
//             <div className="result-title">
//               <img src={avatars.avatar12} alt="User" />
//               <p>{recentPrompt}</p>
//             </div>
//             <div className="result-data">
//               {loading ? (
//                 <div className="loader">
//                   <hr />
//                 </div>
//               ) : (
//                 <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
//               )}
//             </div>
//           </div>
//         )}
//         <div className="main-bottom">
//           <div className="search-box">
//             <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter your feelings" />
//             <div>
//               <img onClick={() => onSent()} src={assets.send_icon} alt="Send" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;



import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)


    return (
        <div className='main'>
            <div className="nav">
                <p>Unwind Yourself</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult

                    ? <>
                        <div className="greet">
                            <p><span>Hello,Buddy.</span></p>
                            <p></p>
                        </div>
                        


                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            {loading
                                ? <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your feelings' />
                        <div>
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    
                </div>
            </div>

            

        </div>
    )
}

export default Main