import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import generateNutrition from '../api/server'; 
import { Link } from 'react-router-dom';

function Recipe() {
  // Get variables
  const { state } = useLocation();

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

  // puts ingredients into arrays
  const ingredientsArray = useMemo(() => {
    return recipeIngredients ? recipeIngredients : [];
  }, [recipeIngredients]);

  // State to store nutritional data
  const [nutritionData, setNutritionData] = useState('');

  // uses openai to get nutrition
  useEffect(() => {
    const fetchNutrition = async () => {
      if (ingredientsArray.length > 0) {
        const nutrition = await generateNutrition(ingredientsArray);
        setNutritionData(nutrition);
      }
    };

    fetchNutrition();
  }, [ingredientsArray]);

  return (
    <>
      <Logo />
      <div className="recipe-page">
        <div className="recipe-container">
          <div className="recipe-top">
            <div className="recipe-left">
              {/* Recipe Name -> Clickable link */}
              <h1 className = "recipe-title">
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

          <h1 className="ingredients-title">Ingredients</h1>
          <div className="ingredients-container">
            <ul>
              {/* Render all ingredients */}
              {ingredientsArray.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="nutrition-container">
            <h1>Nutritional Facts</h1>
            {/* Display the fetched nutrition data */}
            {nutritionData ? (
              <div>{nutritionData}</div>
            ) : (
              <p>Loading nutritional data...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
