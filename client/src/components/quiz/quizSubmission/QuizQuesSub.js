import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import QuizOptionSub from './QuizOptionSub';
import Spinner from '../../layout/Spinner';
import '../quiz.css';
import { connect } from 'react-redux';
import { submitQuiz } from '../../../store/actions/quizActions';

const QuizQues = (props) => {
    const { userAns } = props;

    const [userAnswers] = useState(userAns);
    // const [userAnswers, setUserAnswers] = useState(userAns);

    return (
        <>
            { props.questions.map((ele, index) => (
                userAnswers ? (
                    <Accordion key={index} className={`my-2`} >
                        <Card>
                            {userAnswers[index].selectedAnswer === '' &&
                                <span className="subStatus badge badgeDanger mt-2"
                                    style={{ margin: '0 auto' }}
                                >Not Attempted</span>}
                            <Card.Body>
                                <Card.Title>
                                    {`${index + 1}.`} {ele.question}
                                </Card.Title>
                                {ele.answers.map((ansEle, ansIdx) => <QuizOptionSub
                                    key={ansIdx}
                                    isCorrect={ansEle === ele.correctAnswer}
                                    isClicked={ansEle === userAnswers[index].selectedAnswer}
                                    text={ansEle} />)}
                            </Card.Body>
                        </Card>
                    </Accordion>) :
                    <Spinner />)
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { submitQuiz })(QuizQues);