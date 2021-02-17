import React, { Fragment, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import QuizOption from './QuizOption';
import './quiz.css';
import { connect } from 'react-redux';
import { submitQuiz } from '../../store/actions/quizActions';

const QuizQues = (props) => {
    const { submitQuiz } = props;

    let tempUserAnswers;
    useEffect(() => {
        tempUserAnswers = props.questions.map((ele) => {
            return {
                questionId: ele._id,
                selectedAnswer: ''
            };
        });
        setUserAnswers(tempUserAnswers);
    }, [tempUserAnswers]);

    const [userAnswers, setUserAnswers] = useState(null);

    const handleOptClick = (index, ans) => {
        console.log('clcic', index);
        let tempArr = [...userAnswers];
        tempArr[index] = { ...tempArr[index], selectedAnswer: ans };
        setUserAnswers(tempArr);
    };

    const handleOnClick = () => {

        submitQuiz(props.quizId, { userAnswers: userAnswers });
        tempUserAnswers = props.questions.map((ele) => {
            return {
                questionId: ele._id,
                selectedAnswer: ''
            };
        });
        setUserAnswers(tempUserAnswers);
    };

    return (
        <>
            { props.questions.map((ele, index) => (
                userAnswers ? (
                    <Accordion key={index} className='my-2'>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {`${index + 1}.`} {ele.question}
                                </Card.Title>
                                {ele.answers.map((ansEle, ansIdx) => <QuizOption
                                    key={ansIdx}
                                    onClickFunc={() => handleOptClick(index, ansEle)}
                                    isClicked={ansEle === userAnswers[index].selectedAnswer}
                                    text={ansEle} />)}
                            </Card.Body>
                        </Card>
                    </Accordion>) :
                    <h3 key={index}>Loading...</h3>)
            )}
            <div className="text-center" onClick={handleOnClick} style={{ width: '200px', margin: 'auto' }}>
                <Button className="createquiz mb-4"  >Submit Quiz</Button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { submitQuiz })(QuizQues);