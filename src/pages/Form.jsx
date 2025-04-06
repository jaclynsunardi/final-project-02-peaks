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
    const [formData, setFormData] = useState("");

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
        setFormData(parseInputToArray(e.target.value))  
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
            <div className="input-box">
              <h1 className = "form-header">Recipe Search</h1>
                <div className="input-search">
                    <button 
                    className="addButton input-button"
                    onClick={() => {
                        const parsed = parseInputToArray(inputValue);
                        setInputIngredients(prev => [...prev, ...parsed]);
                        setFormData("");
                        setInputValue("");
                    }}
                    >Add</button>
                    <input 
                    className="input-ingredients"
                    value={inputValue}
                    onChange={handleInputIngredients}
                    placeholder="What ingredients do you want in the recipe? e.g. Apple, Kimchi, Cheese"
                    />
                    <button 
                    className="removeButton input-button"
                    onClick={() => {
                        const parsed = parseInputToArray(inputValue);
                        setExcludedIngredients(prev => [...prev, ...parsed]);
                        setFormData("");
                        setInputValue("");
                    }}
                    >Remove</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "40px", marginBottom: "-20px", justifyContent: "center" }}>
                  {inputIngredients.map((ingredient, idx) => (
                    <span
                      key={`include-${idx}`}
                      style={{
                        backgroundColor: "#2ecc71",
                        color: "white",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        fontFamily: "GroteskReg",
                        fontSize: "14px"
                      }}
                    >
                      ✅ {ingredient}
                    </span>
                  ))}
                  {excludedIngredients.map((ingredient, idx) => (
                    <span
                      key={`exclude-${idx}`}
                      style={{
                        backgroundColor: "#FA003F",
                        color: "white",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        fontFamily: "GroteskReg",
                        fontSize: "14px"
                      }}
                    >
                      ❌ {ingredient}
                    </span>
                  ))}
                </div>
                <div className="input-filters filter-bar">
                    <button 
                        type="button"
                        onClick={() => handleDietButtonClick('vegan')}
                        className={`filter-button diet-filter ${tempSelectedDiets.includes('vegan') ? 'selected' : ''}`}
                    >
                        <p style={{ fontFamily: "GroteskReg", color: "black"}}>Vegan</p>
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleDietButtonClick('vegetarian')}
                        className={`filter-button diet-filter ${tempSelectedDiets.includes('vegetarian') ? 'selected' : ''}`}
                    >
                        <p style={{ fontFamily: "GroteskReg", color: "black" }}>Vegetarian</p>
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleDietButtonClick('gluten-free')}
                        className={`filter-button diet-filter ${tempSelectedDiets.includes('gluten-free') ? 'selected' : ''}`}
                    >
                        <p style={{ fontFamily: "GroteskReg", color: "black" }}>Gluten Free</p>
                    </button>

                    <select 
                        value={selectedNationality} 
                        onChange={handleNationalityChange} 
                        className="filter-nationality"
                    >
                        {/* RENAMED TO CUISINE */}
                        <option value="">Select Cuisine</option>
                        <option value="American">American</option>
                        <option value="Asian">Asian</option>
                        <option value="Central Europe">European</option>
                        <option value="Italian">Italian</option>
                        <option value="Indian">Indian</option>
                    </select>

                    <input 
                        className="filter-cal"
                        type="number" 
                        placeholder="Max Calories" 
                        onChange={handleCal}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setInputValue("");
                        setFormData("");
                        setInputIngredients([]);
                        setExcludedIngredients([]);
                        setTempSelectedDiets([]);
                        setSelectedNationality("");
                        setMaxCal(null);
                      }}
                      className="filter-button"
                      style={{
                        border: "1.5px solid grey",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "rgb(34, 33, 33)",
                        fontFamily: "GroteskReg",
                        padding: "5px 10px",
                        width: "90px",
                        fontSize: "1rem"
                      }}
                    >
                      Reset Filters
                    </button>
                </div>
                
            </div>
            {/* Form Fields */}
        

            {/* Main Input */}
            {/* <input 
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
            /> */}

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
