import React from "react";

const CodeDescription = () => {
    return (
        <div className="description">
            <div className="head">
                <div className="question-title">
                    <span className="question-id">102. </span>
                    <p className="question">Two Sum</p>
                </div>
                <div className="question-details">
                    <span className="difficulty">Medium</span>
                </div>
            </div>
            <div className="content">
                <p>
                    Given an array of integers nums and an integer target,
                    return indices of the two numbers such that they add up to
                    target.<br /> You may assume that each input would have exactly
                    one solution, and you may not use the same element twice.
                    You can return the answer in any order.
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