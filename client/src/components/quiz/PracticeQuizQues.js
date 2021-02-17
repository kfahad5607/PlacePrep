import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import PracticeQuizOption from './PracticeQuizOption';
import ViewAnswer from './ViewAnswer';
import './quiz.css';

const PracticeQuizQues = (props) => {
    const temp = [{
        question: 'What does HTML stand for?',
        optionA: 'Hyper Text Preprocessor',
        optionB: 'Hyper Text Markup Language',
        optionC: 'Hyper Text Multiple Language',
        optionD: 'Hyper Text Multi Language',
        correctOption: 'Hyper Text Markup Language'
    },
    {
        question: 'Who is making the Web standards?',
        optionA: 'The World Wide Web Consortium',
        optionB: 'Google',
        optionC: 'Mozilla',
        optionD: 'Firefox',
        correctOption: 'The World Wide Web Consortium'
    },
    {
        question: 'Choose the correct HTML element for the largest heading:',
        optionA: '<head>',
        optionB: '<heading>',
        optionC: '<h1>',
        optionD: '<h6>',
        correctOption: '<h1>'
    },
    {
        question: 'Choose the correct HTML element to define important text',
        optionA: '<strong>',
        optionB: '<i>',
        optionC: '<important>',
        optionD: '<b>',
        correctOption: '<strong>'
    }

    ];


    return props.questions.map((ele, index) => {
        return (
            <Fragment key={index}>
                <Accordion className='my-2'>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {`${index + 1}.`} {ele.question}
                            </Card.Title>
                            {ele.answers.map((ansEle, ansIdx) => <PracticeQuizOption
                                key={ansIdx}
                                text={ansEle}
                                isCorrect={ansEle === ele.correctAnswer ? true : false} />)}
                           
                            <ViewAnswer eKey='0' correctOption={ele.correctAnswer} />
                        </Card.Body>
                    </Card>
                </Accordion>
            </Fragment>
        );
    });

};

export default PracticeQuizQues;