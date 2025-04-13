import React from 'react'
import '../Header/Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
        <div className="main-content">
            <div className="hero">
              <div className='header-img'>
                <h1 className="header-title"> Welcome to Unwind Yourself ! 🕊</h1>
                <p>“Quiet the mind, and the soul will speak.”</p>
                <img src={assets.background} alt=""/>
              </div>
            </div>
        </div>
      
        
    </div>
  )
}

export default Header