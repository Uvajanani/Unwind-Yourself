

import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom'


const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { avatar: "avatar2.png" };
    const navigate = useNavigate()
  
    return (
        <div className='main'>
            <div className="nav">
                <p>Unwind Yourself</p>
                <img onClick={() => navigate("/edit-profile")} src={`/avatars/${user.avatar}`} alt="User Avatar" />
            </div>
            <div className="main-container">

                {!showResult

                    ? <>
                        <div className="greet">
                            <h1><span>Hello,Buddy💖! Happy to Welcome you!</span></h1>
                            
                        </div>
                        


                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={`/avatars/${user.avatar}`} alt="User Avatar"  />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            {loading
                                ? <div className='loader'>
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