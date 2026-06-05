import React, { useState } from 'react'
import "./App.css"

import Home from './Pages/Home.jsx'
import Navbar from './Components/Navbar.jsx'

const App = () => {
  // ---------------------------------------------------------------------------------8th
  const [darkMode, setDarkMode] = useState(false);
  //-------onclick on RecipeFinder logo  ------------------------------10th
  const [resetHome, setResetHome] = useState(false);/*  -------------------------------------------12th*/



  //-----------toggleDarkMode send to navbar------------------------------------------9th
  const toggleDarkMode =()=>{
    const lightMode = !darkMode;
    setDarkMode(lightMode);
    document.body.classList.toggle("dark", lightMode);//--->> "dark" is className isin App.css 
  }

   //-------onclick on RecipeFinder logo  ------------------------------10th
  const handleHomeClick=()=>{ setResetHome((prev)=> !prev); }

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onTitleClick={handleHomeClick}/>
      <Home resetHome={resetHome}  onTitleClick={handleHomeClick}/>
    </div>
  )
}

export default App