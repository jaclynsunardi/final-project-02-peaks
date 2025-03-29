import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';

function Recipe() {
  const { state } = useLocation();  // Get variables 

  const { 
    recipeName, 
    recipeLink, 
    filter1, 
    filter2, 
    filter3, 
    description, 
    imageUrl, 
    recipeIngredients 
  } = state || {};

  return (
    <>
      <Logo />
      <div className="recipe-page">
        <div className="recipe-container">
            <div className="recipe-top">
                <div className="recipe-left">
                    {/* Recipe Name as a clickable link */}
                    <h1>
                    <a href={recipeLink} target="_blank" rel="noopener noreferrer">
                        {recipeName}
                    </a>
                    </h1>
                    <div className="recipe-filters">
                    {/* Filters */}
                    <h4>{filter1}</h4>
                    <h4>{filter2}</h4>
                    <h4>{filter3}</h4>
                    </div>
                    {/* Recipe Description */}
                    <p>{description}</p>
                </div>
                <div className="recipe-right">
                    {/* Recipe Image */}
                    {imageUrl ? (
                    <img src={imageUrl} alt={recipeName} />
                    ) : (
                    <img src="https://uptownprinters.ca/assets/no_image_placeholder.png" alt="No Image" />
                    )}
                </div>
          </div>

          <h1>Ingredients</h1>
          <div className="ingredients-container">
            <div className="ingredients-left">
              {/* Left side ingredients */}
              <ul>
                {recipeIngredients && recipeIngredients.left && recipeIngredients.left.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="ingredients-right">
              {/* Right side ingredients */}
              <ul>
                {recipeIngredients && recipeIngredients.right && recipeIngredients.right.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="nutrition-container">
            <h1>Nutritional Facts</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
