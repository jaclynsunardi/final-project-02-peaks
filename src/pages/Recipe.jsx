import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import { generateNutrition, generateHealthEvaluation, generateIngredientSubstitutions } from '../api/server';
import Footer from './Footer';
import ScrollToTop from '../components/ScrollToTop';

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

  // Group the health evaluation lines into sections for Strengths, Weaknesses, and Suggestions.
const groupHealthData = (text) => {
  const lines = text.split("\n");
  const groups = []; // Each group will have a header and an array of list items
  let currentGroup = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (/^(Strengths|Weaknesses|Suggestions for Improvement):/i.test(trimmed)) {
      // If there's an existing group, push it to groups
      if (currentGroup) {
        groups.push(currentGroup);
      }
      // Start a new group with this header
      currentGroup = { header: trimmed.replace(":", ""), items: [] };
    } else if (/^\d+\./.test(trimmed) && currentGroup) {
      // Add list item to the current group
      currentGroup.items.push(trimmed);
    }
  });
  if (currentGroup) groups.push(currentGroup);
  return groups;
};

const healthGroups = healthEvaluation ? groupHealthData(healthEvaluation) : [];


  return (
    <>
      <ScrollToTop/>
      <Logo />
      <div className="recipe-page">
        <hr/>
        <div className="recipe-container">
          <div className="recipe-wrapper">
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
              <div className="ingredients-wrapper">
                <h1 className="ingredients-title">Ingredients</h1>
                <div className="ingredients-container">
                  <ul>
                    {ingredientsArray.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="recipe-right">
              {imageUrl ? (
                <img src={imageUrl} alt={recipeName} />
              ) : (
                <img src="https://uptownprinters.ca/assets/no_image_placeholder.png" alt="No Image" />
              )}
            </div>
          </div>
          </div>
          
          <h1 className="nutrition-title">Nutritional Facts</h1>
          <div className="nutrition-container">
            {nutritionData ? (
              <div className = "nutrition-ingredient-wrapper">
                {nutritionData.split("\n\n").map((section, index) => (
                  <div className = "nutrition-ingredients" key={index}>
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

          <h1 className="health-evaluation-title">Health Evaluation</h1>
          <div className="health-evaluation-container">
            {healthEvaluation ? (
              <div className="health-evaluation-content">
                {healthEvaluation.split("\n").map((line, index) => {
                  // Health rating
                  if (/^\s*(Overall Health Rating):/i.test(line.trim())) {
                    const ratingMatch = line.match(/(\d+(\.\d+)?)/);
                    return (
                      <p key={index} className="health-rating">
                        {ratingMatch ? ratingMatch[0] : ""}
                      </p>
                    );
                  }
                })}

                {/* group sections strength / weaknesses / suggestions into own divs */}
                {healthGroups.map((group, idx) => (
                  <div key={idx} className={`health-section ${group.header.toLowerCase().replace(/\s+/g, '-')}`}>
                    <p className="health-section-title">
                      <strong>{group.header}:</strong>
                    </p>
                    <ul>
                      {group.items.map((item, jdx) => (
                        <li key={jdx} className="health-list-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading health evaluation...</p>
            )}
          </div>

          <h1 className="ingredient-substitutions-title">Ingredient Substitutions</h1>
          <div className="ingredient-substitutions-container">
            {ingredientSubstitutions ? (
              <div>
                <ul className="ingredient-substitutions-list">
                  {ingredientSubstitutions.split("\n").map((line, index) => {
                    const match = line.match(/^(\d+)\.\s*(.*)$/);
                    if (match) {
                      return (
                        <h4 key={index} className="ingredient-substitution-item">
                          <strong>{match[1]}. {match[2]} </strong>
                        </h4>
                      );
                    }
                    return <p key={index} className="ingredient-substitution-item">{line}</p>;
                  })}
                </ul>
              </div>
            ) : (
              <p>Loading ingredient substitutions...</p>
            )}
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Recipe;