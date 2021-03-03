import React from 'react';

const SubmitCodeSuccess = ({ userCodeObj }) => {
    return (
        <div>
            <div className={`code-status ${userCodeObj.failed === 0 ? 'code-status-success' : 'code-status-fail'}`} >
                <div>{userCodeObj.failed === 0 ? 'Accepted' : 'Not Accepted'}</div>
            </div>
            <div className='testcase-panel row' >
                <div className='testcase-panel-text col' >
                    <b>Total Testcases: </b><span>{userCodeObj.totalTestcasesRan}</span>
                </div>
            </div>

            <div className='testcase-panel row' >
                <div className='testcase-panel-text col' >
                    <b>Passed: </b><span>{userCodeObj.passed}</span>
                </div>
            </div>
            <div className='testcase-panel row' >
                <div className='testcase-panel-text col'  >
                    <b>Failed: </b><span>{userCodeObj.failed}</span>
                </div>
            </div>

        </div>
    );
};

export default SubmitCodeSuccess;
