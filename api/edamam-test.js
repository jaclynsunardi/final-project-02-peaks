import getRecipe from "./edamam.js";

// This is just to show how the API works. https://developer.edamam.com/edamam-docs-recipe-api

const ingredients = ["tomato", "garlic"]
const excludedIngredients = ["cream"]
const diet = ["balanced"]
const dietaryRestrictions = ["vegan"]
const limit = 2

const res = await getRecipe(ingredients, excludedIngredients, diet, dietaryRestrictions, limit);

console.log(res[0])
