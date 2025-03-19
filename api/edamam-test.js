import getRecipe from "./edamam.js";

// This is just to show how the API works. https://developer.edamam.com/edamam-docs-recipe-api

const ingredients = ["tomato"]
const excludedIngredients = ["cream"] // This is really aggressive for some reason, maybe don't use this often.
const diet = []
const dietaryRestrictions = ["vegan"]
const limit = 2

const res = await getRecipe(ingredients, excludedIngredients, dietaryRestrictions, diet, limit);

console.log(res[0])
