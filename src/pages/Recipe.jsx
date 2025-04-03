import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import { generateNutrition, generateHealthEvaluation, generateIngredientSubstitutions } from '../api/server';
import { Link } from 'react-router-dom';

function Recipe() {
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

  // Convert ingredients into an array
  const ingredientsArray = useMemo(() => recipeIngredients || [], [recipeIngredients]);

  // State variables to store API responses
  const [nutritionData, setNutritionData] = useState('');
  const [healthEvaluation, setHealthEvaluation] = useState('');
  const [ingredientSubstitutions, setIngredientSubstitutions] = useState('');

  // Fetch nutrition data
  useEffect(() => {
    const fetchNutrition = async () => {
      if (ingredientsArray.length > 0) {
        const nutrition = await generateNutrition(ingredientsArray);
        setNutritionData(nutrition);
      }
    };
    fetchNutrition();
  }, [ingredientsArray]);

  // Fetch health evaluation
  useEffect(() => {
    const fetchHealthEvaluation = async () => {
      if (ingredientsArray.length > 0) {
        const healthData = await generateHealthEvaluation(ingredientsArray);
        setHealthEvaluation(healthData);
      }
    };
    fetchHealthEvaluation();
  }, [ingredientsArray]);

  // Fetch ingredient substitutions
  useEffect(() => {
    const fetchSubstitutions = async () => {
      if (ingredientsArray.length > 0) {
        const substitutions = await generateIngredientSubstitutions(ingredientsArray);
        setIngredientSubstitutions(substitutions);
      }
    };
    fetchSubstitutions();
  }, [ingredientsArray]);

  return (
    <>
      <Logo />
      <div className="recipe-page">
        <div className="recipe-container">
          <div className="recipe-top">
            <div className="recipe-left">
              <h1 className="recipe-title">
                <a href={recipeLink} target="_blank" rel="noopener noreferrer">
                  {recipeName}
                </a>
              </h1>
              <div className="recipe-filters">
                <h4>{filter1}</h4>
                <h4>{filter2}</h4>
                <h4>{filter3}</h4>
              </div>
              <p>{description}</p>
            </div>
            <div className="recipe-right">
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
              {ingredientsArray.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="nutrition-container">
            <h1>Nutritional Facts</h1>
            {nutritionData ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {nutritionData.split("\n\n").map((section, index) => (
                  <div key={index}>
                    <ul style={{ fontSize: '1.2rem', listStyleType: 'none', padding: 0 }}>
                      {section.split("\n").map((line, lineIndex) => (
                        <li key={lineIndex} style={{ fontWeight: line.match(/^\d+\./) || line.toLowerCase().includes("total") ? 'bold' : 'normal' }}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading nutritional data...</p>
            )}
          </div>

          <div className="health-evaluation-container">
            <h1 className="health-evaluation-title">Health Evaluation</h1>
            {healthEvaluation ? (
              <div className="health-evaluation-content">
                {healthEvaluation.split("\n").map((line, index) => {
                  if (/^\s*(Overall Health Rating):/i.test(line.trim())) {
                    const parts = line.split(":");
                    return (
                      <p key={index}>
                        <strong>{parts[0]}:</strong>{" "}
                        <span className="health-rating">{parts[1]}</span>
                      </p>
                    );
                  }

                  if (/^\s*(Strengths|Weaknesses|Suggestions for Improvement):/i.test(line.trim())) {
                    return <p key={index} className="health-section-title"><strong>{line.trim().replace(":", "")}:</strong></p>;
                  }

                  if (/^\d+\./.test(line.trim())) {
                    return <li key={index} className="health-list-item">{line.trim()}</li>;
                  }

                  return <p key={index} className="health-text">{line}</p>;
                })}
              </div>
            ) : (
              <p>Loading health evaluation...</p>
            )}
          </div>

          <div className="ingredient-substitutions-container">
            <h1>Ingredient Substitutions</h1>
            {ingredientSubstitutions ? (
              <div>
                <ul className="ingredient-substitutions-list">
                  {ingredientSubstitutions.split("\n").map((line, index) => {
                    const match = line.match(/^(\d+)\.\s*(.*)$/);
                    if (match) {
                      return (
                        <li key={index} className="ingredient-substitution-item">
                          <strong>{match[1]}.</strong> {match[2]}
                        </li>
                      );
                    }
                    return <li key={index} className="ingredient-substitution-item">{line}</li>;
                  })}
                </ul>
              </div>
            ) : (
              <p>Loading ingredient substitutions...</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Recipe;
