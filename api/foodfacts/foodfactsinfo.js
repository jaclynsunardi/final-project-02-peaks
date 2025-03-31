import dotenv from 'dotenv';
dotenv.config();

const OPENFOODFACTS_API_URL = process.env.OPENFOODFACTS_API_URL || "https://world.openfoodfacts.org";

// Function to get nutrition, Nutri-Score, and allergens for a list of ingredients
const getNutritionalInfo = async (ingredients) => {
    const results = [];

    for (const ingredient of ingredients) {
        try {
            const response = await fetch(`${OPENFOODFACTS_API_URL}/cgi/search.pl?search_terms=${encodeURIComponent(ingredient)}&json=1`);
            const data = await response.json();

            if (!data.products || data.products.length === 0) {
                results.push({ ingredient, message: "No data found" });
                continue;
            }

            // Get first product match
            const product = data.products[0];

            results.push({
                ingredient: ingredient,
                nutrition: product.nutriments || "No nutrition data available",
                nutriScore: product.nutriscore_grade || "N/A",
                allergens: product.allergens ? product.allergens.split(",") : [],
                additives: product.additives_tags ? product.additives_tags.map(additive => additive.replace("en:", "")) : [],
            });
        } catch (error) {
            console.error(`Error fetching data for ${ingredient}:`, error);
            results.push({ ingredient, error: "Failed to fetch data" });
        }
    }
    return results;
};

export default getNutritionalInfo;
