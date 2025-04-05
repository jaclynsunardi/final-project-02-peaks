# Miso Hungry


## Final Project Group
- Group #2 Peaks
- Group Members: 
    - Jaclyn Sunardi (Project Manager)
    - Nicholas Chan
    - Elena Nguyen
    - Nathan Thamtoro



## Project Description
Everyone nowadays are looking for ways to save money in a world that charges you top price for seemingly everything you do. Unfortunately, eating out is no exception as it happens to be the main thing that empties peoples pockets in this day and age. The simple solution to this problem would be to cook at home more, but a lot of people are either too busy or just don't know how to cook with the ingredients they have in their fridge. Luckily we have created the website MISO HUNGRY to help solve this problem for all the individuals dealing with it. MISO HUNGRY is an application that helps generate recipes based off what the user currently has in their pantry or just dishes the user if currently interested in making. The website returns multiple recipes based off the users preferences and wants and provides the recipe link, ingredients needed, nutritional information, and even a health evaluation to aid those who want to keep a healthy lifestyle. Through this, MISO HUNGRY aims to improve situations for health-conscious individuals, busy students, financially weary people, and home cooks by enhancing mealtime experiences. 



## Features  
- **Returns a list of meals based on user inputted ingredients**: The website has a search bar where the user can input ingredients they have around their house or potential dishes they want to make. The application then returns multiple potential recipes the user can pick from based off the user input. 

- **Filter recipes based off preference, nationality, and allergies**: Users have the option to exclude specific ingredients using the search bar or click buttons to fit dietary restrictions. These buttons include gluten free, vegetarian, vegan, max calories, and even cuisine type. 

- **Return links to recipe instructions and full ingredients list**: Once the recipe the user wants to cook is selected, the application returns a full list of ingredients needed and a link to the recipe instructions. 

- **Return Calories and Macros for each individual ingredient serving and total**: To know if the recipe is actually healthy the application returns a list of all the ingredients involved and the calories + macros for each ingredient per serving. It also returns a total amount of calories and macronutrients which is helpful for those tracking calories. 

- **Gives user a health rating and evaluation**: The application takes in the list of ingredients and gives a rating out of 10 showing the user how healthy the meal is. It also takes in all the ingredients in total and gives the user a evaluation of the whole recipe signfying the pros health wise and the cons. 

- **Gives alternative ingredients (healthier alternatives)**: The website also gives user alternative ingredients if they don't have the needed ingredients at home or they want to potentially make the recipe healthier. It also returns reasons why the alternative ingredient is more benefititial health wise. 



## Step-by-step instructions for the project to be deployed locally  

### **1. Make sure to have the following API keys**  
 

- **OpenAI API Key**  
- **Edamam API Key**  

### **2. Clone the repository in your terminal**  
```bash
git clone git@github.com:CMPT-276-SPRING-2025/final-project-02-peaks.git
```
CD to the directory containing the root repository:
```bash
cd final-project-02-peaks
```

### **3. Install Dependencies**  
Using npm:  
```bash
npm install
```

### **4. Switch to Working Branch**
Switch into the style-2 branch:
```bash
git checkout style-2
```

### **5. Set Up API Keys**  
Create a `.env.local` file in the root directory and add the API keys in the matching variables:  
```env
REACT_APP_EDAMAM_APP_ID =
REACT_APP_EDAMAM_API_KEY =

# for openAI
REACT_APP_OPENAI_API_KEY = 
``` 

### **6. Run the Server**  
Using npm:  
```bash
npm start
```
It should open a browser, if not, open a browser and go to this link:  
 **http://localhost:3000**  
 


## Project Sources  
- **Live Website**: final-project-02-peaks.vercel.app
- **GitHub Repository**: [GitHub Repository](https://github.com/CMPT-276-SPRING-2025/final-project-02-peaks)



## License 
