import React, { Fragment } from 'react';
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/addon/display/autorefresh";

const CodingSolution = ({ solution }) => {
    let options = {
        lineNumbers: true,
        mode: "text/plain",
        theme: "eclipse",
        autoRefresh: true,
        styleActiveLine: true,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        scrollbarStyle: "overlay",
        readOnly: true
    };

    return (
        <Fragment>
            <div className='description solution'>
                <div className='head'>
                    <p className='solution-title'>Solution</p>
                </div>
                <hr />
                <div className='solution-description'>
                    {solution === '' ? <h5 className='text-center'>Not Available</h5>
                        :
                        <CodeMirror
                            value={solution}
                            options={options}
                            autoFocus={true}
                        />}
                </div>
            </div>
        </Fragment>
    );
};

export default CodingSolution;