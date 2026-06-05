import React, { useState } from 'react'
import "../Styles/Searchbar.css"


const Searchbar = ({onSearch, onClear}) => {   

    const [query, setQuery] = useState("");//console.log(query);    

    const handleSubmit = (e) =>{

        e.preventDefault();
        if(query.trim() ==="") return;
        onSearch(query);
    };

    const handleClear =()=>{
        setQuery("");
        onClear();
    };

  return (    
        <form onSubmit={handleSubmit}  className='search-bar'>
            <input type="text" value={query} className='input' placeholder='Search Recipes' onChange={(e) => setQuery(e.target.value)} />
            <button type='button' className='btn1'>search</button>
            { query && (<button type='button' className='clear-btn' onClick={handleClear}>X</button>) }
        </form>
    
  )
}

export default Searchbar