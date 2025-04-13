import React, { useContext, useState } from "react";
import "./Login.css"; 
import { assets } from "../../assets/assets";
import { Context } from '../../context/Context'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

    const {url, setToken, setUser} = useContext(Context)
    const[curState, setcurState] = useState("Login")
    const[data, setData] = useState({
        name : "",
        email : "",
        password : ""
    })

    const navigate = useNavigate()

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name] : value}))
       }
    
       const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (curState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
    
        try {
            const response = await axios.post(newUrl, data);
    
            if (response.data.success) {
                const { token, username, user } = response.data;
    
                localStorage.setItem("token", token);
                localStorage.setItem("userEmail", user.email);  
                localStorage.setItem("user", JSON.stringify(user));
    
                setToken(token);
                setUser(user); 
    
                toast.success(
                    curState === "Sign Up" ? "Account created successfully!" : "Logged in successfully!",
                    { position: "top-right", autoClose: 5000 }
                );
    
                setTimeout(() => {
                    navigate(curState === "Sign Up" ? "/questions" : "/main-page");
                }, 2000);
            } else {
                toast.error(response.data.message, { position: "top-right", autoClose: 5000 });
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Something went wrong!", { position: "top-right", autoClose: 5000 });
        }
    };
    

  return (
    <div className="login-container">
        <ToastContainer />
        <div className="login-left">
            <h2>Welcome to UY</h2>
            <form onSubmit={onLogin} className="form-left">
                <div className="form-text">
                    <p>Start your journey</p>
                    <h3>{curState} to Unwind Yourself</h3>
                </div>
            
                <div className="form-input">
                    {curState === "Login"?<></>:<input name = 'name' onChange={onChangeHandler} value = {data.name} type="text" placeholder='Your Name' required/>}
                    <input name = 'email' onChange={onChangeHandler} value = {data.email} type="email" placeholder='Your Email' required/>
                    <input name = 'password' onChange={onChangeHandler} type="password" value={data.password} placeholder='Password' required/>
                </div>
                <button type="submit" className="btn">{curState === "Login" ? "Login" : "Create Account"}</button>
            </form>

            <div className="google-integration">
                <div className="signup-divider">
                    <hr />
                    <p>or {curState} with</p>
                    <hr />
                </div>
                <button className="google-btn"><img src={assets.google} alt="" /> {curState} with Google</button>
                {curState === "Login" 
                    ? <p className="login-account">Create a new account? <span onClick={()=>setcurState("Sign Up")}>Sign Up Here</span></p>
                    : <p className="login-account">Already have an account? <span onClick={()=>setcurState("Login")}>Login Here</span></p>
                }

            </div>

        </div>

        <div className="login-right">
            <img src={assets.login_background} alt="" />
        </div>
    </div>
  );
};

export default Login;
