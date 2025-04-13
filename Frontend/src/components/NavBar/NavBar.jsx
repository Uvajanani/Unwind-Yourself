import React, { useContext, useState, useEffect } from 'react'
import './NavBar.css'
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../../context/Context'
import { assets } from '../../assets/assets'


const NavBar = () => {

    const [active, setActive] = useState("home")
    const navigate = useNavigate();
    const {token, setToken} = useContext(Context)

    const logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("user")
      setToken("")
      navigate("/")
      window.location.reload();
    }

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
          setToken(storedToken);
      }
  }, []);
  

  return (
    <div className='navBar'>
      <div className='logo'>
        <img src={assets.logo} alt="" />
      </div>
      <div className='nav-links'>
        <ul>
            <li><Link to='/' className={active === "home" ? "active" : ""} onClick={() => setActive("home")}>HOME</Link></li>
            <li><Link to='/about' className={active === "about" ? "active" : ""} onClick={() => setActive("about")}>ABOUT</Link></li>
            <li><Link to='/contact' className={active === "contact" ? "active" : ""} onClick={() => setActive("contact")}>CONTACT</Link></li>
            <li><Link to='/privacy-policy' className={active === "help" ? "active" : ""} onClick={() => setActive("help")}>PRIVACY POLICY</Link></li>
        </ul>
      </div>

      {!token ? (
        <Link to="/login">
          <button className="nav-button">Sign In</button>
        </Link>
      ) : (
        <div className="navbar-profile">
          <img src={assets.profile} alt="Profile" /> 
          <ul className="nav-profile-dropdown">
            <li onClick={() => navigate('/dashBoard')}>
              <img src={assets.dashboard} alt="Dashboard" />
              <p>DashBoard</p>
            </li>
            
            <hr />
            
            <li onClick={logout}>
              <img src={assets.logout} alt="Logout" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavBar