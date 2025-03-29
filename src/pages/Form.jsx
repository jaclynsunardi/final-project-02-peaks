import React, { useState } from 'react';
import Result from '../components/Result';

function Form() {

    // State for form input
    const [inputValue, setInputValue] = useState("");

    // Handle input changes for the text input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    //-----------

    // State for dropdown
    const [selectedNationality, setSelectedNationality] = useState("");

    // Handle changes for nationality drop down
    const handleNationalityChange = (e) => {
        setSelectedNationality(e.target.value);
    };

    //-----------

    // Manage state for diet preference
    const [selectedDiets, setSelectedDiets] = useState([]);

    // Handle button click to toggle SELECTION
    const handleDietButtonClick = (diet) => {
        setSelectedDiets(prevSelectedDiets => {
            if (prevSelectedDiets.includes(diet)) {
                return prevSelectedDiets.filter(item => item !== diet);
            } else {
                return [...prevSelectedDiets, diet];
            }
        });
    };

    //-------- INFO NEEDED TODO (PLACEHOLDERS -> USE API TO GET THESE VALUES)

    const recipeName = "Recipe Name";
    const recipeLink = "https://en.wikipedia.org/wiki/Placeholder";
    const [filter1, filter2, filter3] = selectedDiets.concat(["", "", ""]).slice(0, 3);
    const description = "Description if we can do it?";
    const imageUrl = ""; 
    const recipeIngredients = ""; // LIKE AN ARRAY (or smth.. pass these values to recipe page)
    
    //-------------

    // State for submission 
    const [submitValue, setSubmitValue] = useState("");
    const [showSubmitPage, setShowSubmitPage] = useState(false);

    // Handle submission -> Show results after you submit
    const handleSubmit = () => {
        setShowSubmitPage(true); 

        setTimeout(() => {
            const resultsSection = document.querySelector(".form-submit");
            if (resultsSection) {
                const scrollPosition = resultsSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: scrollPosition - 100,  
                    behavior: 'smooth',
                });
            }
        }, 100);  // Delay
    };

    return (
        <>
        <div className="form-container">
            {/* Form Fields */}
            <div className="filter-bar">
                {/* Dietary Preference Buttons */}
                <button 
                    type="button"
                    onClick={() => handleDietButtonClick('Vegan')}
                    className={selectedDiets.includes('Vegan') ? 'selected' : ''} 
                >
                    Vegan
                </button>
                <button 
                    type="button"
                    onClick={() => handleDietButtonClick('Vegetarian')}
                    className={selectedDiets.includes('Vegetarian') ? 'selected' : ''}
                >
                    Vegetarian
                </button>
                <button 
                    type="button"
                    onClick={() => handleDietButtonClick('Gluten Free')}
                    className={selectedDiets.includes('Gluten Free') ? 'selected' : ''}
                >
                    Gluten Free
                </button>

                {/* Nationality Dropdown */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Nationality</p>
                    <select 
                        value={selectedNationality} 
                        onChange={handleNationalityChange} 
                        className="filter-nationality"
                    >
                        <option value="">Select Nationality</option>
                        <option value="American">American</option>
                        <option value="Asian">Asian</option>
                        <option value="European">European</option>
                        <option value="African">African</option>
                    </select>
                </div>
                
                {/* Calories Input (TODO: MIN MAX) */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Calories</p>
                    <input 
                        type="text" 
                        placeholder="999" 
                    />
                </div>

                {/* Time Input (TODO: MIN MAX) */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Time</p>
                    <input 
                        type="text" 
                        placeholder="999" 
                    />
                </div>
            </div>

            {/* Main Input */}
            <input 
                type="text" 
                className="form-input" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Add instructions (?) here"
            />

            {/* Submit Button */}
            <button 
                type="button"
                onClick={handleSubmit} 
                className="submit-button"
            >
                Submit
            </button>
        </div>

        {/* Results section */}
        {showSubmitPage && (
            <div className="form-submit">
                <Result 
                    recipeName={recipeName}
                    recipeLink={recipeLink}
                    filter1={filter1}
                    filter2={filter2}
                    filter3={filter3}
                    description={description}
                    imageUrl={imageUrl}
                    recipeIngredients = {recipeIngredients}
                />

                {/* Make like maybe 2 more results after we figure this out */}


            </div>
        )}
        </>
    );
}

export default Form;
