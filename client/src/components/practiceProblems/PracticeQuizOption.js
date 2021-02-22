import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import '../quiz/quiz.css';

const PracticeQuizOption = (props) => {
    const [ansClicked, setAnsClicked] = useState(false);

    const handleOnClick = () => {
        setAnsClicked(true);
    };

    return (
        <Fragment>
            <div className={`mt-3 mb-3 pr-2 rounded option ${ansClicked && (props.isCorrect ? 'correct' : 'incorrect')}`}>
                <Accordion.Toggle as={Button} onClick={handleOnClick} variant="" eventKey={props.isCorrect ? '0' : '1'}  >
                    {props.text}
                </Accordion.Toggle>
                {ansClicked && (props.isCorrect ?
                    <div className='icon tick' ><i className="fa fa-check" aria-hidden="true"></i></div> :
                    <div className='icon cross' ><i className="fa fa-times" aria-hidden="true"></i></div>
                )}
                {/* <div className='icon cross' ><i className="fa fa-times" aria-hidden="true"></i></div> */}
            </div>
        </Fragment>
    );
};

export default PracticeQuizOption;
