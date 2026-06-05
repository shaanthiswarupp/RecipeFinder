import React from 'react'
import "../Styles/Loader.css";


const Loader = () => {
  return (
    <div className='loader'>
        <div className='spinner'>|</div>

        <p>Loading Recipes...</p>
    </div>
  )
}

export default Loader