import React, { useState } from 'react';
// import Logo from '../components/Logo';

function Form() {
    // State for form input
    const [inputValue, setInputValue] = useState(" ");

    // Handle input changes for the text input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // State for dropdown
    const [selectedNationality, setSelectedNationality] = useState(" ");

    // Handle changes for nationality drop down
    const handleNationalityChange = (e) => {
        setSelectedNationality(e.target.value);
    };

    // Manage state for diet pref
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

    // State for submission
    const [submitValue, setSubmitValue] = useState(" ");

    // Handle submission
    const handleSubmit = () => {
        // Handle the submission logic here (e.g., form validation, sending data)
        setSubmitValue("Form Submitted!");
        
        // TODO
    };
    return (
        <div className="form-container">
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
                
                {/* Calories Input (TODO: MIN MAX)*/}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Calories</p>
                    <input 
                        type="text" 
                        placeholder="999" 
                    />
                </div>

                {/* Time Input (TODO: MIN MAX)*/}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Time</p>
                    <input 
                        type="text" 
                        placeholder="999" 
                    />
                </div>
            </div>

            {/* Main Input */}
            <input type="text" className="form-input" value={inputValue} 
            onChange={handleInputChange} placeholder="TODO Add instructions (?) here"/>

            {/* Submit Button */}
            <button 
                type="button"
                onClick = {handleSubmit} 
                className = "submit-button"
            >
                Submit
            </button>
        </div>
    );
}

export default Form;