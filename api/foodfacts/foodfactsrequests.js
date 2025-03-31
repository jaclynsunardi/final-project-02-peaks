import express from 'express';
import getNutritionalInfo from './nutrition.js';

const router = express.Router();

// Route to fetch nutritional data from Open Food Facts
router.post('/nutrition', async (req, res) => {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: "Invalid request. Please send an array of ingredients." });
    }

    const nutritionData = await getNutritionalInfo(ingredients);
    res.json(nutritionData);
});

export default router;
