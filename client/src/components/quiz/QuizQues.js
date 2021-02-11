import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import QuizOption from './QuizOption';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ViewAnswer from './ViewAnswer';
import './quiz.css';

const QuizQues = () => {
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



    return temp.map((ele, index) => {
        return (
            <Fragment key={index}>
                <Accordion className='my-2'>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {`${index + 1}.`} {ele.question}
                            </Card.Title>
                            <QuizOption key={1} text={ele.optionA} isCorrect={ele.optionA === ele.correctOption ? true : false} />
                            <QuizOption key={2} text={ele.optionB} isCorrect={ele.optionB === ele.correctOption ? true : false} />
                            <QuizOption key={3} text={ele.optionC} isCorrect={ele.optionC === ele.correctOption ? true : false} />
                            <QuizOption key={4} text={ele.optionD} isCorrect={ele.optionD === ele.correctOption ? true : false} />
                            <ViewAnswer eKey='0' correctOption={ele.correctOption} />
                        </Card.Body>
                    </Card>
                </Accordion>
            </Fragment>
        );
    });

    // return (
    //     <Fragment>
    //         <Accordion className='my-2'>
    //             <Card>
    //                 <Card.Body>
    //                     <Card.Title>
    //                         1. What does HTML stand for?
    //             </Card.Title>
    //                     <QuizOption text='Hyper Text Preprocessor' eKey='1' />
    //                     <QuizOption text='Hyper Text Markup Language' eKey='2' />
    //                     <QuizOption text='Hyper Text Multiple Language' eKey='3' />
    //                     <QuizOption text='Hyper Text Multi Language' eKey='4' />
    //                     <ViewAnswer eKey='2' />
    //                 </Card.Body>
    //             </Card>
    //         </Accordion>
    //     </Fragment>
    // );
};

export default QuizQues;