import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import QuizOption from './QuizOption';
import Spinner from '../layout/Spinner';
import './quiz.css';
import { connect } from 'react-redux';
import { submitQuiz } from '../../store/actions/quizActions';

const QuizQues = (props) => {
    let history = useHistory();
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

        console.log('Submitting');
        submitQuiz(props.quizId, { userAnswers: userAnswers });
        tempUserAnswers = props.questions.map((ele) => {
            return {
                questionId: ele._id,
                selectedAnswer: ''
            };
        });
        setUserAnswers(tempUserAnswers);
        // window.alert('Quiz Submitted successfully!. Redirectng to /quizzes after 2 sec');
        setTimeout(() => {
            history.push('/quizzes');
        }, 2000);
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
                    <Spinner key={index} />)
            )}
            <div className="text-center" style={{ width: '200px', margin: 'auto' }}>
                <Button className="createquiz mb-4" ref={props.refProp} onClick={handleOnClick}  >Submit Quiz</Button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { submitQuiz })(QuizQues);