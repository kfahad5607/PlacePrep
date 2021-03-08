import React from 'react';
import './styles.css';

const RunCodeSuccess = ({ userCodeObj }) => {
    return (
        <div>
            <div className={`code-status ${userCodeObj.failed === 0 ? 'code-status-success' : 'code-status-fail'}`} >
                <div>{userCodeObj.failed === 0 ? 'Correct Answer' : 'Wrong Answer'}</div>
            </div>
            <div className="pre-container">
                <div className='input-panel-text' ><b>Input</b></div>
                <pre className='input-panel-result' >
                    {userCodeObj.input}
                </pre>
            </div>

            <div className="pre-container">
                <div className='input-panel-text' ><b>Output</b></div>
                <pre className='input-panel-result' >
                    {userCodeObj.output}
                </pre>
            </div>
            <div className="pre-container">
                <div className='input-panel-text'  ><b>Expected</b></div>
                <pre className='input-panel-result'>
                    {userCodeObj.expected}
                </pre>
            </div>

        </div>
    );
};

export default RunCodeSuccess;
