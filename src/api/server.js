import { OpenAI } from 'openai';

// PARAM: Array of ingredients
// OUTPUT: Returns nurtitional output
// TODO: FORMAT OUTPUT--basically a bunch of console tests, we should probably format it

const generateNutrition = async (ingredients = []) => {
    try {
        console.log("Starting nutritional generation...");

        const formattedIngredients = ingredients.join(", ");
        console.log("Formatted Ingredients:", formattedIngredients);

        // TODO: FIX DANGEROUSLY ALLOW (bc like why)
        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
        console.log("OpenAI initialized with API key.");

        console.log("Making request to OpenAI API...");
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

        console.log("API request successful.");

        if (response && response.choices && response.choices.length > 0) {
            console.log("Response from OpenAI:", response.choices[0].message.content);
            return response.choices[0].message.content;
        } else {
            console.error("Error: Response from OpenAI was not in the expected format.");
            return "Failed to fetch nutritional data.";
        }
    } catch (error) {
        console.error('Error generating nutrition:', error);
        return "Failed to fetch nutritional data.";
    }
};

export default generateNutrition;
