import React, { Fragment } from 'react'

const CodingSolution = ({ solution }) => {
    return (
        <Fragment>
            <div className='description solution'>
                <div className='head'>
                    <p className='solution-title'>Solution</p>
                </div>
                <hr />
                <div className='solution-description'>
                    <pre className="solution-container">{solution}</pre>
                </div>
            </div>
        </Fragment>
    )
}

export default CodingSolution