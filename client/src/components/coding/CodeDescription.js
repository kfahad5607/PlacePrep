import React, {Fragment} from "react";

const CodeDescription = (props) => {
    const { title, difficulty, description, sampleInputs } = props.current;

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    return (
        <div className="description">
            <div className="head">
                <div className="question-title">
                    <p className="question">{title}</p>
                    {difficulty === "easy" && (
                        <span
                            className=" diffMod badge badgeSuccess ml-2 mt-1"
                            style={{ height: "25px" }}
                        >
                            {capitalize(difficulty)}
                        </span>
                    )}
                    {difficulty === "medium" && (
                        <span
                            className=" diffMod badge badgeWarning ml-2 mt-1"
                            style={{ height: "25px" }}
                        >
                            {capitalize(difficulty)}
                        </span>
                    )}
                    {difficulty === "hard" && (
                        <span
                            className=" diffMod badge badgeDanger ml-2 mt-1"
                            style={{ height: "25px" }}
                        >
                            {capitalize(difficulty)}
                        </span>
                    )}
                </div>
            </div>
            <div className="code-content">
                <p>{description}</p>
            </div>
            <div className="sample-inputs">
                {sampleInputs && sampleInputs.map((inps, index) => (
                    <Fragment key={index}>
                        <p>Example: {index + 1}</p>
                        <pre>
                            Input: {inps.sampleInput} <br />
                            Output: {inps.sampleOutput}
                        </pre>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default CodeDescription;
