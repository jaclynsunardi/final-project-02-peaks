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
    const [maxCal, setMaxCal] = useState(null)
    const [maxTime, setMaxTime] = useState(null)

    const handleCal = (e) => {
        const value = e.target.value;
        const num = parseInt(value, 10);
    
        if (!isNaN(num) && num > 0) {
            setMaxCal(num);
        } else {
            setMaxCal(null);
        }
    }

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

    //--------

    // Takes filters -> Used in recipe page
    const [filter1, filter2, filter3] = selectedDiets.concat(["", "", ""]).slice(0, 3);
    
    //-------------
    
    // This function will generate a list of the recipes given the parsed data, and throw it to react to render.
    const [recipeList, setRecipeList] = useState([]);

    // Itll also check if there are no results
    const [noResults, setNoResults] = useState(false); 
    
    useEffect(() => {
      const timer = setTimeout(() => {
        if (recipeData.length === 0) {
            setNoResults(true);
        } else {
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
            setNoResults(false);
        }
    }, 0);

    return () => clearTimeout(timer);
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
              {/* Recipe Search Title */}
              <h1 className = "form-header">Recipe Search</h1>
                <div className="input-search">

                    {/* Add ingredient button */}
                    <button 
                    className="addButton input-button"
                    onClick={() => {
                        const parsed = parseInputToArray(inputValue);
                        setInputIngredients(prev => [...prev, ...parsed]);
                        setFormData("");
                        setInputValue("");
                    }}
                    >Add</button>

                    {/* Text box for user input */}
                    <input 
                    className="input-ingredients"
                    value={inputValue}
                    onChange={handleInputIngredients}
                    placeholder="What ingredients do you want in the recipe? e.g. Apple, Kimchi, Cheese"
                    />

                    {/* Remove ingredient button */}
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

                {/* Submission -> Show added / remove ingredient */}
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

                {/* vv---------FILTERS---------vv */}

                </div>
                <div className="input-filters filter-bar">
                    {/* vegan filter */}
                    <button 
                        type="button"
                        onClick={() => handleDietButtonClick('vegan')}
                        className={`filter-button diet-filter ${tempSelectedDiets.includes('vegan') ? 'selected' : ''}`}
                    >
                        <p style={{ fontFamily: "GroteskReg", color: "black"}}>Vegan</p>
                    </button>

                    {/* vegetarian button */}
                    <button 
                        type="button"
                        onClick={() => handleDietButtonClick('vegetarian')}
                        className={`filter-button diet-filter ${tempSelectedDiets.includes('vegetarian') ? 'selected' : ''}`}
                    >
                        <p style={{ fontFamily: "GroteskReg", color: "black" }}>Vegetarian</p>
                    </button>

                    {/* gluten free button */}
                    <button 
                        type="button"
                        onClick={() => handleDietButtonClick('gluten-free')}
                        className={`filter-button diet-filter ${tempSelectedDiets.includes('gluten-free') ? 'selected' : ''}`}
                    >
                        <p style={{ fontFamily: "GroteskReg", color: "black" }}>Gluten Free</p>
                    </button>

                    {/* cuisine dropdown */}
                    <select 
                        value={selectedNationality} 
                        onChange={handleNationalityChange} 
                        className="filter-nationality"
                    >
                        <option value="">Select Cuisine</option>
                        <option value="American">American</option>
                        <option value="Asian">Asian</option>
                        <option value="Central Europe">European</option>
                        <option value="Italian">Italian</option>
                        <option value="Indian">Indian</option>
                    </select>
                    
                    {/* max calories */}
                    <input 
                        className="filter-cal"
                        type="number" 
                        min="0"
                        placeholder="Max Calories" 
                        onChange={handleCal}
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                    />

                    {/* reset filters -> REMOVES ALL FILTERS AND INGREDIENTS*/}
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

            {/* submission button */}
            <button 
                type="button"
                onClick={handleSubmit} 
                className="submit-button"
            >
                Submit
            </button>

            {/* Shows error for empty input */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Results section */}
        {showSubmitPage && (
          <div className="form-submit">
              {noResults ? (
                  <p className="error-message">No results found</p>
              ) : (
                  recipeList
              )}
          </div>
        )}
        </>
    );
}

export default Form;