import React, { useContext } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import Questions from './components/Questions/Questions'
import MainPage from './pages/MainPage/MainPage'
import Chat from './pages/Chat/Chat'
import Community from './components/Community/Community'
import EditProfile from './components/EditProfile/EditProfile'
import ActiveUsers from './components/ActiveUsers/ActiveUsers'
import { Context } from './context/Context'
import SpeechToText from './components/SpeechToText/SpeechToText'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'
import PrivacyPage from './pages/PrivacyPage/PrivacyPage'
import Voice from './components/Voice-Assistant/Voice'
import DashBoard from './components/DashBoard/DashBoard'
import Badges from './components/Badges/Badges'
import StoryGenerator from './components/StoryGenerator/Entertainment'
import Entertainment from './components/StoryGenerator/Entertainment'


const App = () => {

  const {user} = useContext(Context)
  const { id } = useContext(Context)
  
  return (
    <>
      <div className='app'>
        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/main-page' element={<MainPage/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/community' element={<Community currentUser={user}/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/active-users' element={<ActiveUsers currentUser={user}/>}/>
          <Route path='/speech' element={<SpeechToText/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/privacy-policy' element={<PrivacyPage/>}/>
          <Route path='/voice' element={<Voice/>}/>
          <Route path='/dashboard' element={<DashBoard userId={id}/>}/>
          <Route path='/badges' element={<Badges/>}/>
          <Route path='/story' element={<StoryGenerator/>}/>
          <Route path='/entertainment' element={<Entertainment/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App