// Original nutrition facts (to test openAI)

import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey:  process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const generateNutrition = async (ingredients) => {
    try {
        const formattedIngredients = ingredients.join(", ");

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

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating nutrition:', error);
        return "Failed to fetch nutritional data.";
    }
};

export default generateNutrition;
