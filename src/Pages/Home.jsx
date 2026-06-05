import React, { useEffect, useState } from 'react'
import "./Home.css";
//1
import { fetchRecipesFromApi } from "../Utils/API.js"
//2
import RecipeCard from '../Components/RecipeCard.jsx';
//6th
import Loader from '../Components/Loader';
//-------7th over in home.jsx
import RecipeModel from '../Components/RecipeModel.jsx';

//=========================================================== in App.jsx=============>> 8th
//-------search bar import ---------------------------------------------11th
import Searchbar from '../Components/Searchbar.jsx';


const Home = ({resetHome , onTitleClick}) => {

  //home page default & loadData into these states
  const [chickenRecipes, setChickenRecipes] = useState([]);
  const [soupRecipes, setsoupRecipes] =       useState([]);
  const [exploreAll, setExploreAll] =         useState([]);

  /*to set visible count for exploreAll ] -------4th---- */
  const [visibleCount, setVisibleCount] =     useState(6);

  /*loading animation  -----------------------------------------------------------------------6th*/
  const [loading, setLoading] =                useState(true);

  /* to show recipeDetails onclick of that particular recipe ] ---------------------------------7th---- */
  const [selectedRecipe, setSelectedRecipe] =  useState(null);

  const [searchQuery, setSearchQuery] = useState("");/*  -------------------------------------------11th*/
  const [recipes, setRecipes] = useState([]);/*  -------------------------------------------11th*/


  /*  ----------onTitleclick---------------------------------13th*/
  useEffect( ()=>{ setSearchQuery("");  setRecipes([]);  }, [resetHome] )


  /*-----home page load by default-------------------------------------------------------------1st-----*/
  useEffect(()=>{
    /*----home page default fetchData & query --1st- */
    const fetchData = async() =>{
      setLoading(true);
      const chicken = await fetchRecipesFromApi("chicken");
      setChickenRecipes(chicken.slice(0, 6));/*load data to chickenRecipes */
      const soup = await fetchRecipesFromApi("soup");
      setsoupRecipes(soup.slice(0, 6));/*load data to soupRecipes */
      const explore = await fetchRecipesFromApi("a");
      setExploreAll(explore);/*load data to exploreAll */
      setLoading(false);
    }

    /*---------Call the function ------2nd-----*/
    fetchData();
  },[]);

  const handleSearch = async(query)=>{
    setSearchQuery(query);
    if(query.trim()==="") return;
    setLoading(true);
    const results = await fetchRecipesFromApi(query)//"chicken"
    setRecipes(results);
    setLoading(false);

  }
  const clearSearch =()=>{
    setSearchQuery("");
    setRecipes([])
  }

  /*-----show more button function -->onclick----------------------------------------------------5th--- */
  const showMore = ()=>{ setVisibleCount((prev) => prev + 6 ); }

  /*---send each item to RecipeCard of each State ---------------------------------------------------3rd----*/
  if(loading) return <Loader/>;/*call & return the loadingeffect from <Loader/> */

  return (
    <div className='home-container'>
      <Searchbar onSearch={handleSearch} onClear={clearSearch}/>
      {
        searchQuery ? (
                        <div className='section'>
                          <h2>Search Results for "{searchQuery}"</h2>
                          <button className='back-btn' onClick={onTitleClick}>Back</button>
                          { recipes.length>0 ?( <div className='section-grid'>
                                              {recipes.map( (eachItem) => ( <RecipeCard recipe={eachItem} 
                                                                                          key={eachItem.idMeal}
                                                                                          selected={setSelectedRecipe}/>) )
                                            }
                                          </div>):(<p>No Recipes Found For :-- {searchQuery}</p>) }
                        </div>) : ( <>
                        <div className='section'>
                          <h2> Chicken Recipes </h2>
                          <div className='section-grid'>
                            { chickenRecipes.map( (eachItem) => ( <RecipeCard recipe={eachItem}
                                                                              key={eachItem.idMeal}
                                                                              selected={setSelectedRecipe}/>) )
                            }
                          </div>
                        </div>

                        <div className='section'>
                            <h2> Soup Recipes </h2>
                            <div className='section-grid'>
                              {soupRecipes.map( (eachItem) => ( <RecipeCard recipe={eachItem} 
                                                                            key={eachItem.idMeal}
                                                                            selected={setSelectedRecipe}/>) )
                              }
                            </div>
                        </div>

                        <div className='section'>
                            <h2> ExploreAll Recipes </h2>
                            <div className='section-grid'>
                              {exploreAll.slice(0, visibleCount).map( (eachItem) => ( <RecipeCard recipe={eachItem}
                                                                                                  key={eachItem.idMeal}
                                                                                                  selected={setSelectedRecipe}/>) ) 
                                }
                            </div>
                            { visibleCount < exploreAll.length && <button className='load-more' onClick={showMore}>Show more</button> }
                        </div>
                      </> )

      }      

      { selectedRecipe && <RecipeModel recipe={selectedRecipe} onClose={()=> setSelectedRecipe(null)}/>   }

    </div>
  )
}

export default Home