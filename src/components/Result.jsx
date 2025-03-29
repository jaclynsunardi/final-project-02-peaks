import React from 'react';
import { useNavigate } from 'react-router-dom';

function Result({ recipeName, recipeLink, filter1, filter2, filter3, description, imageUrl,recipeIngredients}) {
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleClick = () => {
        // When clicked, navigate to the Recipe page and pass the data via state
        navigate('/recipe', {
            state: { recipeName, recipeLink, filter1, filter2, filter3, description, imageUrl,recipeIngredients}
        });
    };

    return (
        <div className="result-container" onClick={handleClick}>
            <div className="result-left">
                <h1>{recipeName}</h1>
                <div className="result-filters">
                    <h4>{filter1}</h4>
                    <h4>{filter2}</h4>
                    <h4>{filter3}</h4>
                </div>
                <p>{description}</p>
            </div>
            <div className="result-right">
                {/* Image with fallback */}
                <img 
                    src={imageUrl || "https://uptownprinters.ca/assets/no_image_placeholder.png"} 
                    alt={recipeName} 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
        </div>
    );
}

export default Result;
