import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import './quiz.css';

const QuizOption = (props) => {

    return (
        <Fragment>
            <div className={`mt-3 mb-3 pr-2 rounded option ${(props.isClicked && 'correct')}`}>
                <Accordion.Toggle as={Button} onClick={props.onClickFunc} variant="" eventKey={props.isCorrect ? '0' : '1'}  >
                    {props.text}
                </Accordion.Toggle>

                {/* <div className='icon cross' ><i className="fa fa-times" aria-hidden="true"></i></div> */}
            </div>
        </Fragment>
    );
};

export default QuizOption;
