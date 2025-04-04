import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

// Feature 1: Get Nutritional Breakdown
export const generateNutrition = async (ingredients = []) => {
    try {
        const formattedIngredients = ingredients.join(", ");
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Provide a detailed nutritional breakdown for the following ingredients: ${formattedIngredients}. 
                For each ingredient, include calories, fats, carbohydrates, and proteins per serving size.  
                Return the output as a numbered list (1, 2, 3, etc.) for each ingredient. 
                At the end of the list, provide a summary in the following format:
                Total:
                - Calories: [total_calories] kcal
                - Fats: [total_fats] g
                - Carbohydrates: [total_carbs] g
                - Proteins: [total_proteins] g`
            }],
            max_tokens: 1500,
        });

        const nutritionData = response.choices[0].message.content;
        
        // Return formatted response
        return nutritionData;
    } catch (error) {
        console.error('Error fetching nutrition:', error);
        return "Failed to fetch nutritional data.";
    }
};

export const generateHealthEvaluation = async (ingredients = []) => {
    try {
        const formattedIngredients = ingredients.join(", ");
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Evaluate the overall healthiness of this combination of ingredients: ${formattedIngredients}.
                Format the response exactly as follows, ensuring a line break before each bolded section:

                \nOverall Health Rating: (Provide a single rating out of 10)


                \nStrengths: (List the general strengths of this ingredient combination)

                \nWeaknesses: (List the general weaknesses of this ingredient combination)

                \nSuggestions for Improvement: (Provide suggestions on how to make this dish healthier)

                Ensure that the format stays the same every time and avoid evaluating ingredients separately.`
            }],
            max_tokens: 1500,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching health evaluation:', error);
        return "Failed to fetch health evaluation.";
    }
};

export const generateIngredientSubstitutions = async (ingredients = [], dietType = "healthy") => {
    try {
        const formattedIngredients = ingredients.join(", ");
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `For the following ingredients: ${formattedIngredients}, suggest alternative substitutions suitable for a ${dietType} diet and explanation. 

                            Please provide the response in the following format:
                            1. [Original Ingredient]: [Substitution]
                            2. [Original Ingredient]: [Substitution]
                            ...
                            Make sure each substitution is clearly numbered.`
            }],
            max_tokens: 1500,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching ingredient substitutions:', error);
        return "Failed to fetch ingredient substitutions.";
    }
};

