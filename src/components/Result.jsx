import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

// Uses these variables (taken from edamamapi) to display on results component
function Result({ recipeName, recipeLink, filter1, filter2, filter3, description, imageUrl,recipeIngredients}) {
    const filters = [filter1, filter2, filter3].filter(Boolean); 

    return (
        // edamamapi: -> whole result component links to external recipe page
        <Link 
            to={{
                pathname: "/recipe",
            }} 
            state={{ recipeName, recipeLink, filters, description, imageUrl, recipeIngredients }}
            className="result-container"
            style = {{textDecoration: 'none', color: '#333'}}
            
        >
            {/* recipe name and filters */}
            <div className="result-left">
                <h1>{recipeName}</h1>
                <div className="result-filters">
                    <h4>{filter1}</h4>
                    <h4>{filter2}</h4>
                    <h4>{filter3}</h4>
                </div>
            </div>
            {/* recipe image */}
            <div className="result-right">
                <img 
                    src={imageUrl || "https://uptownprinters.ca/assets/no_image_placeholder.png"} 
                    alt={recipeName} 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
        </Link>
    );
}

Result.propTypes = {
    recipeName: PropTypes.string.isRequired,
    recipeLink: PropTypes.string.isRequired,
    filter1: PropTypes.string,
    filter2: PropTypes.string,
    filter3: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    recipeIngredients: PropTypes.arrayOf(PropTypes.string)
};

export default Result;