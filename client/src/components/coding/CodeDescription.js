import React from "react";

const CodeDescription = (props) => {
    
    const { title, difficulty, description } = props.current;

    return (
        <div className="description">
            <div className="head">
                <div className="question-title">
                    <span className="question-id">102. </span>
                    <p className="question">{title}</p>
                </div>
                <div className="question-details">
                    <span className="difficulty">{difficulty}</span>
                </div>
            </div>
            <div className="code-content">
                <p>
                    {description}
                </p>
            </div>
            <div className="sample-inputs">
                <p>Example: </p>
                <pre>
                    Given nums = [2, 7, 11, 15], target = 9,
                    <br />
                    Because nums[0] +nums[1] = 2 + 7= 9, <br />
                    return [0, 1].
                </pre>
            </div>
        </div>
    );
};



export default CodeDescription;