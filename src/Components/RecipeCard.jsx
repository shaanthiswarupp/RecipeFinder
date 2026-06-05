import React from 'react'
import "../Styles/RecipeCard.css"


const RecipeCard = ({recipe, selected}) => {
  return (
    <div className='recipe-card' onClick={()=>selected(recipe)}>
      <img src={recipe.strMealThumb} alt="" />
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strCategory}</p>      
    </div>
  )
}

export default RecipeCard