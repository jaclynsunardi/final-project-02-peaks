import getRecipe from './edamam.js';


// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      hits: [
        {
          recipe: {
            label: 'Test Recipe',
            url: 'https://example.com/recipe',
            image: 'https://example.com/image.jpg',
            ingredients: [
              { text: '1 tomato', weight: 100 },
              { text: '2 garlic cloves', weight: 10 },
            ],
            totalTime: 30,
          },
        },
      ],
    }),
  })
);

describe('getRecipe', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // Test 1: Successful API call
  it('should return a list of recipes for valid inputs', async () => {
    const ingredients = ['tomato', 'garlic'];
    const excludedIngredients = ['cream'];
    const diet = ['balanced'];
    const dietaryRestrictions = ['vegan'];
    const limit = 1;

    const recipes = await getRecipe(ingredients, excludedIngredients, diet, dietaryRestrictions, limit);

    expect(recipes).toEqual([
      {
        recipeName: 'Test Recipe',
        recipeURL: 'https://example.com/recipe',
        imageURL: 'https://example.com/image.jpg',
        ingredients: [
          { text: '1 tomato', weight: 100 },
          { text: '2 garlic cloves', weight: 10 },
        ],
        timetoMake: 30,
      },
    ]);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Test 2: Empty inputs
  it('should handle empty inputs gracefully', async () => {
    const recipes = await getRecipe([], [], [], [], 1);

    expect(recipes).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  // Test 3: No recipes found
  it('should return an empty array when no recipes are found', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ hits: [] }),
      })
    );

    const recipes = await getRecipe(['invalid-ingredient'], [], [], [], 1);

    expect(recipes).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Test 4: API error handling
  it('should handle API errors gracefully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    const recipes = await getRecipe(['tomato'], [], [], [], 1);

    expect(recipes).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});