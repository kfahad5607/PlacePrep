import React, { Fragment } from 'react'

const CodingSolution = ({ solution }) => {
    return (
        <Fragment>
            <div className='description solution'>
                <div className='head'>
                    <p className='solution-title'>Approach</p>
                </div>
                <hr />
                <div className='solution-description'>
                    <pre>{solution}</pre>
                </div>
            </div>
        </Fragment>
    )
}

export default CodingSolution