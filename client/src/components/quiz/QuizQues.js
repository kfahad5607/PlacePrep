import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import QuizOption from './QuizOption';
import Spinner from '../layout/Spinner';
import './quiz.css';
import { connect } from 'react-redux';
import { submitQuiz, clrQuizCreateSuccess } from '../../store/actions/quizActions';
import { clearTestDetails } from '../../store/actions/authActions';
import { setAlert } from '../../store/actions/alertActions';

const QuizQues = (props) => {
    const { quiz: { isCreated }, submitQuiz, clearTestDetails, setAlert, clrQuizCreateSuccess } = props;

    useEffect(() => {
        if (isCreated) {
            setAlert('Quiz Submitted.', 'success');
            clrQuizCreateSuccess();
            clearTestDetails();
        }
        
        //eslint-disable-next-line
    }, [isCreated]);

    let tempUserAnswers;
    useEffect(() => {
        // eslint-disable-next-line
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

export default connect(mapStateToProps, {
    submitQuiz,
    clearTestDetails,
    setAlert,
    clrQuizCreateSuccess
})(QuizQues);