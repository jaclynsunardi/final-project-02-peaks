import getRecipe from "./edamam.js";

// This is just to show how the API works. https://developer.edamam.com/edamam-docs-recipe-api

const ingredients = ["tomato", "garlic"]
const excludedIngredients = ["cream"]
const diet = []
const dietaryRestrictions = ["vegan"]
const cuisineType = "italian"
const limit = 10
const maxCal = 400
const maxTime = 50

const res = await getRecipe(ingredients, excludedIngredients, diet, dietaryRestrictions, cuisineType, maxCal, maxTime, limit);

for (let i = 0; i < res.length; i++) {
    console.log("Recipe Name: ", res[i].recipeName)
    console.log("Recipe URL: ", res[i].recipeURL)
    console.log("Cuisine:", res[i].cuisineType[0])
    console.log("Cooking Time: ", res[i].timetoMake)
    console.log("Calories: ", res[i].calories, "\n")
}


