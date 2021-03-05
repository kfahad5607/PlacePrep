import React, { Fragment } from 'react';
import './spinner.css';

function Spinner() {
    return (
        <Fragment>
            <div id="spinner-container">
                <div className="spinner"></div>
            </div>
            {/* <img src={spinner} alt='Loading...' style={{
                width: '200px', margin: 'auto',
                display: 'block'
            }}></img> */}
        </Fragment>
    );
}

export default Spinner;