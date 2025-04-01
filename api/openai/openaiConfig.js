import { OpenAI } from 'openai'; // Correctly import OpenAI from 'openai'
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPEN_AI_KEY) {
    throw new Error("OPEN_AI_KEY is not set in your .env file");
}

// Use the OpenAI client directly without the Configuration constructor
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export default openai;
