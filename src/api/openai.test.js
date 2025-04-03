import { 
    generateNutrition, 
    generateHealthEvaluation, 
    generateIngredientSubstitutions 
  } from './server';
  
  // Mock the OpenAI module properly
  jest.mock('openai', () => {
    const mockCreate = jest.fn();
    return {
      OpenAI: jest.fn(() => ({
        chat: {
          completions: {
            create: mockCreate
          }
        }
      })),
      // Export the mock function so we can manipulate it in tests
      mockCreate
    };
  });
  
  // Get the mock create function
  const { mockCreate } = require('openai');
  
  describe('OpenAI Service', () => {
    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
    });
  
    describe('generateNutrition', () => {
      it('should call the API with correct parameters', async () => {
        // Setup mock response
        const mockResponse = {
          choices: [{
            message: {
              content: 'Nutritional data here'
            }
          }]
        };
        mockCreate.mockResolvedValue(mockResponse);
        
        const ingredients = ['apple', 'banana'];
        const result = await generateNutrition(ingredients);
        
        // Verify API call
        expect(mockCreate).toHaveBeenCalledWith({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: expect.stringContaining(ingredients.join(", "))
          }],
          max_tokens: 1500,
        });
        
        // Verify response
        expect(result).toBe(mockResponse.choices[0].message.content);
      });
  
      it('should handle errors gracefully', async () => {
        mockCreate.mockRejectedValue(new Error('API error'));
        
        const result = await generateNutrition(['apple']);
        expect(result).toBe("Failed to fetch nutritional data.");
      });
    });
  
    describe('generateHealthEvaluation', () => {
      it('should call the API with correct format requirements', async () => {
        const mockResponse = {
          choices: [{
            message: {
              content: '\n**Overall Health Rating:** 8\n\n**Strengths:** ...'
            }
          }]
        };
        mockCreate.mockResolvedValue(mockResponse);
        
        const ingredients = ['chicken', 'broccoli'];
        const result = await generateHealthEvaluation(ingredients);
        
        expect(mockCreate).toHaveBeenCalledWith({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: expect.stringContaining('Evaluate the overall healthiness')
          }],
          max_tokens: 1500,
        });
        
        expect(result).toMatch(/\n\*\*Overall Health Rating:\*\*/);
        expect(result).toMatch(/\n\*\*Strengths:\*\*/);
      });
  
      it('should handle errors gracefully', async () => {
        mockCreate.mockRejectedValue(new Error('API error'));
        const result = await generateHealthEvaluation(['chicken']);
        expect(result).toBe("Failed to fetch health evaluation.");
      });
    });
  
    describe('generateIngredientSubstitutions', () => {
      it('should call the API with diet type', async () => {
        const mockResponse = {
          choices: [{
            message: {
              content: 'Substitution suggestions here'
            }
          }]
        };
        mockCreate.mockResolvedValue(mockResponse);
        
        const ingredients = ['milk', 'cheese'];
        const dietType = 'vegan';
        const result = await generateIngredientSubstitutions(ingredients, dietType);
        
        expect(mockCreate).toHaveBeenCalledWith({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: expect.stringContaining(`suitable for a ${dietType} diet`)
          }],
          max_tokens: 1500,
        });
        
        expect(result).toBe(mockResponse.choices[0].message.content);
      });
  
      it('should use "healthy" as default diet type', async () => {
        const mockResponse = {
          choices: [{
            message: {
              content: 'Substitution suggestions here'
            }
          }]
        };
        mockCreate.mockResolvedValue(mockResponse);
        
        await generateIngredientSubstitutions(['milk']);
        
        expect(mockCreate.mock.calls[0][0].messages[0].content)
          .toContain('suitable for a healthy diet');
      });
  
      it('should handle errors gracefully', async () => {
        mockCreate.mockRejectedValue(new Error('API error'));
        const result = await generateIngredientSubstitutions(['milk']);
        expect(result).toBe("Failed to fetch ingredient substitutions.");
      });
    });
  });