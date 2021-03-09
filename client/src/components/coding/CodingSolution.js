import React, { Fragment } from 'react';

const CodingSolution = (props) => {
    return (
        <Fragment>
            <div className='description solution'>
                <div className='head'>
                    <p className='solution-title'>Solution</p>
                </div>
                <hr />
                <div className='solution-description'>
                    {props.current.solution === '' ? <h5 className='text-center'>Not Available</h5>
                        : <pre>{props.current.solution}</pre>}
                </div>
            </div>
        </Fragment>
    );
};

export default CodingSolution;