import getNutritionalInfo from './foodfactsinfo.js';

// Mock the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        products: [
          {
            nutriments: { energy_kcal: 100, protein: 5 },
            nutriscore_grade: "B",
            allergens: "milk, peanuts",
            additives_tags: ["en:e330", "en:e300"],
          },
        ],
      }),
  })
);

describe("getNutritionalInfo", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // ✅ Test: Successfully retrieves data for an ingredient
  it("should return nutrition, Nutri-Score, allergens, and additives for a valid ingredient", async () => {
    const result = await getNutritionalInfo(["apple"]);

    // Clean up the received allergens and additives for better comparison
    const cleanedResult = result.map(item => ({
      ...item,
      allergens: item.allergens.map(a => a.trim()),  // Trim spaces from allergens
      additives: item.additives.map(a => a.trim()),  // Trim spaces from additives
    }));

    // Now match the cleaned result with the expected values
    expect(cleanedResult).toContainEqual(
      expect.objectContaining({
        ingredient: "apple",
        nutrition: expect.objectContaining({ energy_kcal: 100, protein: 5 }),
        nutriScore: "B",
        allergens: expect.arrayContaining(["milk", "peanuts"]),
        additives: expect.arrayContaining(["e330", "e300"]),
      })
    );
  });

  // ❌ Test: Handle ingredient not found
  it("should return 'No data found' if ingredient is not available", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ products: [] }),
      })
    );

    const result = await getNutritionalInfo(["unknownfood"]);

    expect(result).toEqual([
      { ingredient: "unknownfood", message: "No data found" },
    ]);
  });

  // ❌ Test: Handle API failure
  it("should handle API errors gracefully", async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error("API Error")));

    const result = await getNutritionalInfo(["banana"]);

    expect(result).toEqual([{ ingredient: "banana", error: "Failed to fetch data" }]);
  });
});
