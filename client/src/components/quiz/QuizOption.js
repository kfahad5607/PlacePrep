import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import './quiz.css';

const QuizOption = (props) => {
    const [ansClicked, setAnsClicked] = useState(false);

    const handleOnCLick = () => {
        setAnsClicked(true);
    };

    return (
        <Fragment>
            <div className={`mt-3 mb-3 pr-2 rounded option ${ansClicked && (props.isCorrect ? 'correct' : 'incorrect')}`}>
                <Accordion.Toggle as={Button} onClick={handleOnCLick} variant="" eventKey={props.isCorrect ? '0' : '1'}  >
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

export default QuizOption;
