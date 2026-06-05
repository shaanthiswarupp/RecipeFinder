import React from 'react'
import "../Styles/Navbar.css"

const Navbar = ({darkMode , toggleDarkMode , onTitleClick }) => {
  return (
    <div className='navbar'>
        <h1 className='logo' onClick={onTitleClick}>Recipe Finder</h1>
        <button className='dark-btn' onClick={toggleDarkMode}>{darkMode? "LightMode" : "DarkMode"}</button>
    </div>
  )
}

export default Navbar