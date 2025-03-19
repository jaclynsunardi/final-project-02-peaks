import getRecipe from "./edamam.js";

// This is just for testing purposes. 


const test = ["banana", "chocolate"]

const test2 = ["cheese"]

const bob = await getRecipe(test, test2);

console.log(bob)
