import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Check if the API key is set in the .env file
if (!process.env.OPEN_AI_KEY) {
    throw new Error("OPEN_AI_KEY is not set in your .env file");
}

// Initialize the OpenAI client with the API key
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

// Function to generate the nutrition description
const generateNutrition = async (ingredients) => {
    try {
        const formattedIngredients = ingredients.join(", "); // Convert array to comma-separated string
        
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Provide a detailed nutritional breakdown for the following ingredients: ${formattedIngredients}. 
                    For each ingredient, include calories, fats, carbohydrates, and proteins. 
                    Also, suggest a healthier or alternative ingredient if possible. 
                    At the end, provide a total macro count for the recipe and include a health rating, 
                    highlighting good aspects and possible improvements.`,
                },
            ],
            max_tokens: 4096,
        });

        // Log the response to the console
        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error('Error generating nutrition:', error);
    }
};

// Example array of ingredients for testing
const testIngredients = ["500g pork intestine", "1 cup white rice"];

generateNutrition(testIngredients);
