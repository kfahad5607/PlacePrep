import React from 'react';
import './styles.css';

const RunCodeFail = ({ userCodeObj }) => {
    return (
        <div>
            <div className={`code-status code-status-fail`} >
                <div>{userCodeObj.errorType}</div>
            </div>
            <div className='input-panel'>
                <pre className='input-panel-result code-status-fail' >
                    {userCodeObj.error}
                </pre>
            </div>

        </div>
    );
};

export default RunCodeFail;
