import React, {Fragment} from "react";

const CodeDescription = (props) => {
    const { title, difficulty, description, sampleInputs } = props.current;

    return (
        <div className="description">
            <div className="head">
                <div className="question-title">
                    <p className="question">{title}</p>
                    <div className="diff-span">
                    {difficulty === "10" && (
                        <span
                            className=" diffMod badge badgeSuccess ml-2 mt-1"
                            style={{ height: "25px" }}
                        >
                            Easy
                        </span>
                    )}
                    {difficulty === "20" && (
                        <span
                            className=" diffMod badge badgeWarning ml-2 mt-1"
                            style={{ height: "25px" }}
                        >
                            Medium
                        </span>
                    )}
                    {difficulty === "30" && (
                        <span
                            className=" diffMod badge badgeDanger ml-2 mt-1"
                            style={{ height: "25px" }}
                        >
                            Hard
                        </span>
                    )}
                    </div>
                </div>
            </div>
            <div className="code-content">
                <p>{description}</p>
            </div>
            <div className="sample-inputs">
                {sampleInputs && sampleInputs.map((inps, index) => (
                    <Fragment key={index}>
                        <p> <b>Example {index + 1} :</b></p>
                        <pre>
                            <b>Input:</b> {inps.sampleInput} <br />
                            <b>Output:</b> {inps.sampleOutput}
                        </pre>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default CodeDescription;
