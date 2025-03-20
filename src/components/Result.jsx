import React from 'react';

function Result() {
  return (
    <>
        <div className="result-container">
            <div className="result-left">
                <h1>Recipe Name</h1>
                <div className="result-filters">
                    {/*TODO (API): filters*/}
                    <h4>1</h4>
                    <h4>2</h4>
                    <h4>3</h4>
                </div>
                {/*TODO (API): Desc? (if possible)*/}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam cumque autem ab fugit voluptas? Delectus iusto molestiae eligendi voluptate! Illo porro asperiores rerum reprehenderit repudiandae aliquam fuga tenetur nobis vel.</p>
                <div className="result-ingredients">
                    {/*TODO (API): ingredients included and not included (max 3?)*/}
                    <h4>1</h4>
                    <h4>2</h4>
                    <h4>3</h4>
                </div>
            </div>
            <div className="result-right">
                {/*TODO (API): image*/}
            </div>
        </div>
    </>
  );
}

export default Result;