import React from 'react';

function Recipe() {
  return (
    <>
        <div className="recipe-page">
            <div className="recipe-container">
                <div className="recipe-left">
                    {/*TODO (API): link to recipe*/}
                    <h1>Recipe Name</h1>
                    <div className="recipe-filters">
                        {/*TODO (API): filters*/}
                        <h4>1</h4>
                        <h4>2</h4>
                        <h4>3</h4>
                    </div>
                    {/*TODO (API): desc? (if possible)*/}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam cumque autem ab fugit voluptas? Delectus iusto molestiae eligendi voluptate! Illo porro asperiores rerum reprehenderit repudiandae aliquam fuga tenetur nobis vel.</p>
                </div>
                <div className="recipe-right">
                    {/*TODO (API): image*/}
                </div>
                <h1>Ingredients</h1>
                <div className="ingredients-container">
                    <div className="ingredients-left">
                        {/*TODO (API): Ingredients (left)*/}
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                    <div className="ingredients-right">
                        {/*TODO (API): Ingredients (right)*/}
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                </div>
                <div className="nutrition-container">
                    <h1>Nutritional Facts</h1>
                </div>
            </div>
        </div>
    </>
  );
}

export default Recipe;