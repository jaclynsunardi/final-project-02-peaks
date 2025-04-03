import React, { useState, useEffect } from 'react';
import Result from '../components/Result';
import getRecipe from '../api/edamam';

function Form() {

    //-----------
    //Init recipeData
    const [recipeData, setRecipeData] = useState([]);

      const getRecipes = async () => {
        const recipeArr = await getRecipe(
            inputIngredients, 
            excludedIngredients, 
            [], // dietaryRestrictions -- may implement or delete later, 
            selectedDiets, 
            selectedNationality,
            maxCal, 
            maxTime, 
            3 // temporary placeholder
        )
        setRecipeData(recipeArr)
    }

    //-----------

    // State for calories
    // Might have to get rid of time
    const [maxCal, setMaxCal] = useState(null)
    const [maxTime, setMaxTime] = useState(null)

    const handleCal = (e) => {
        setMaxCal(e.target.value)
    }

    // Commented this because the time thing on the api is wack
    // const handleTime = (e) => {
    //     setMaxTime(e.target.value)
    // }

    //-----------
    
    // State for form input
    const [inputValue, setInputValue] = useState("");
    const [excludedValue, setExcludedValue] = useState("")
    
    // States to send to function
    const [inputIngredients, setInputIngredients] = useState([]);
    const [excludedIngredients, setExcludedIngredients] = useState([]);

    // This will force the string into an array to pass into a function
    // Splits the string with commas
    const parseInputToArray = (input) => {
        return input
          .split(",")
          .map(item => item.trim())
          .filter(item => item.length > 0);
      };

      // Function for included Ingredients
    const handleInputIngredients = (e) => {
        setInputValue(e.target.value);
        setInputIngredients(parseInputToArray(e.target.value))  
    }

    const handleExcludedIngredients = (e) => {
        setExcludedValue(e.target.value)
        setExcludedIngredients(parseInputToArray(e.target.value))  
    }

    // Function for excluded ingredients

    //-----------

    // State for dropdown
    const [selectedNationality, setSelectedNationality] = useState("");

    // Handle changes for nationality drop down
    const handleNationalityChange = (e) => {
        setSelectedNationality(e.target.value);
    };

    //-----------

    // State for diets -> UPDATES 
    const [tempSelectedDiets, setTempSelectedDiets] = useState([]);
    const [selectedDiets, setSelectedDiets] = useState([]);

    // Handle button click to toggle SELECTION
    const handleDietButtonClick = (diet) => {
        setTempSelectedDiets(prev => 
            prev.includes(diet) ? prev.filter(item => item !== diet) : [...prev, diet]
        ); 
    };

    //-------- INFO NEEDED TODO (PLACEHOLDERS -> USE API TO GET THESE VALUES)

    const recipeName = "Recipe Name";
    const recipeLink = "https://en.wikipedia.org/wiki/Placeholder";
    const [filter1, filter2, filter3] = selectedDiets.concat(["", "", ""]).slice(0, 3);
    const description = "Description if we can do it?";
    const imageUrl = ""; 
    const recipeIngredients = ""; // LIKE AN ARRAY (or smth.. pass these values to recipe page)
    
    //-------------
    
    // This function will generate a list of the recipes given the parsed data, and throw it to react to render.
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        if (recipeData.length > 0) {
          let recipeListtmp = [];
          for (let i = 0; i < recipeData.length; i++) {
            let item = recipeData[i];
            recipeListtmp.push(
              <Result 
                key={i}
                recipeName={item.recipeName}
                recipeLink={item.recipeURL}
                filter1={filter1}
                filter2={filter2}
                filter3={filter3}
                description={"Test Description"}
                imageUrl={item.imageURL}
                recipeIngredients={item.ingredients.map(ingr => ingr.food)}
              />
            );
          }
          setRecipeList(recipeListtmp);
        }
      }, [recipeData, filter1, filter2, filter3]);

    //-------------

    // State for submission
    const [errorMessage, setErrorMessage] = useState("");
    const [showSubmitPage, setShowSubmitPage] = useState(false);

    // Handle submission -> Show results after you submit
    const handleSubmit = async () => {
        // Handle empty input message
        if (inputIngredients.length === 0) {
            setErrorMessage("Please enter at least one ingredient");
            return;
        }
        setErrorMessage("");

        setShowSubmitPage(true);
        setSelectedDiets(tempSelectedDiets); // Apply filters
        await getRecipes();
        setTimeout(() => {
            const resultsSection = document.querySelector(".form-submit");
            if (resultsSection) {
                window.scrollTo({ top: resultsSection.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <>
        <div className="form-container">
            {/* Form Fields */}
            <div className="filter-bar">
                {/* Dietary Preference Buttons */}
                <button 
                    type="button"
                    onClick={() => handleDietButtonClick('vegan')} // change to lowercase so the api recognizes the values.
                    className={tempSelectedDiets.includes('vegan') ? 'selected' : ''} 
                >
                    <p style={{ fontFamily:"GroteskReg"}}>Vegan</p>
                </button>
                <button 
                    type="button"
                    onClick={() => handleDietButtonClick('vegetarian')}
                    className={tempSelectedDiets.includes('vegetarian') ? 'selected' : ''}
                >
                    <p style={{ fontFamily:"GroteskReg"}}>Vegetarian</p>
                </button>
                <button 
                    type="button"
                    onClick={() => handleDietButtonClick('gluten-free')}
                    className={tempSelectedDiets.includes('gluten-free') ? 'selected' : ''}
                >
                    <p style={{ fontFamily:"GroteskReg"}}>Gluten Free</p>
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
                        <option value="Central Europe">European</option>
                        <option value="Italian">Italian</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>
                
                {/* Calories Input*/}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Max Calories</p>
                    <input 
                        type="number" 
                        placeholder="999" 
                        onChange={handleCal}
                    />
                </div>

                {/* Time Input
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Time</p>
                    <input 
                        type="number" 
                        placeholder="999"
                        onChange={handleTime} 
                    />
                </div> */}
            </div>

            {/* Main Input */}
            <input 
                type="text" 
                className="form-input" 
                value={inputValue} 
                onChange={handleInputIngredients} 
                placeholder="What ingredients do you want in the recipe? e.g. Tomato, Garlic, Cheese"
            />
            <input 
                type="text" 
                className="form-input" 
                value={excludedValue} 
                onChange={handleExcludedIngredients} 
                placeholder="What ingredients should be left out? e.g. Potato, Peanut, Pepper"
            />

            {/* Submit Button */}
            <button 
                type="button"
                onClick={handleSubmit} 
                className="submit-button"
            >
                Submit
            </button>

            {/* Error for empty input */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Results section */}
        {showSubmitPage && (
            <div className="form-submit">
                {/* <Result 
                    recipeName={recipeName}
                    recipeLink={recipeLink}
                    filter1={filter1}
                    filter2={filter2}
                    filter3={filter3}
                    description={description}
                    imageUrl={imageUrl}
                    recipeIngredients = {recipeIngredients}
                /> */}
                {recipeList}

                {/* Make like maybe 2 more results after we figure this out */}

            </div>
        )}
        </>
    );
}

export default Form;
