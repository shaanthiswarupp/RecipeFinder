import React from 'react'
import "../Styles/RecipeModel.css"

const RecipeModel = ({recipe, onClose}) => {
  if(!recipe) return null;

  // collect ingredients & their measure ex: rice-1kg
  const ingredients = [];

  for(let i=1; i<=20; i++){
    const ingredient = recipe[`strIngredient${i}`];
    console.log(ingredient);
    const measure = recipe[`strMeasure${i}`];
    console.log(measure);

    if(ingredient && ingredient.trim()!==""){
      ingredients.push( `${ingredient ? ingredient:""} - ${measure ? measure:""}`.trim() )
    }
  }
  //console.log(ingredients);

  // split the instructions into steps 1.2.3.4....
  const steps = recipe.strInstructions ? 
              recipe.strInstructions.split(/[.\n]/).map( (step)=>step.trim() ).filter((step)=>step.length >3 ) : [];


  return (
    <div className='model' onClick={onClose}  >

      <div className='model-full' onClick={(e)=> e.stopPropagation()}>   
        <button className='close-btn' onClick={onClose}>X</button>
        <div className='model-body' >          
          <div className='model-image'><img src={recipe.strMealThumb} alt=""/></div>
          <div className='model-details'>

            <h2>Item Name -:- {recipe.strMeal}</h2>
            <p><strong>Category :</strong> {recipe.strCategory}</p>
            <p><strong>Area : </strong> {recipe.strArea}</p>

            { /*show the ingredients that are in recipe */ } 
            {
              ingredients.length>0 && (
                <div className='ingredents-section'>
                  <h3>Ingredents </h3>
                  <ol>{ ingredients.map((item, index)=>( <li key={index}>{item}</li>) ) }</ol>
                </div>
              )
            }
            
            {
              steps.length>0 && ( 
                                  <div className='instructions'>
                                    <h3>Process : </h3>
                                    <ol>{steps.map((step,index)=> <li key={index}> {step}</li>)}</ol>
                                  </div> )
            }

            {
              recipe.strYoutube && <a href={recipe.strYoutube}
                                      target='_blank' 
                                      className='youtube-link'>Watch on Youtube
                                    </a>

            }
          </div>

        </div>

      </div>
    </div>
  )
}

export default RecipeModel