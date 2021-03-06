import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import QuizOptionSub from './QuizOptionSub';
import '../quiz.css';
import { connect } from 'react-redux';
import { submitQuiz } from '../../../store/actions/quizActions';

const QuizQues = (props) => {
    const { userAns } = props;

    // const [userAnswers] = useState(userAns);
    const [userAnswers, setUserAnswers] = useState(userAns);

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
                                {ele.answers.map((ansEle, ansIdx) => <QuizOptionSub
                                    key={ansIdx}
                                    isCorrect={ansEle === ele.correctAnswer}
                                    isClicked={ansEle === userAnswers[index].selectedAnswer}
                                    text={ansEle} />)}
                            </Card.Body>
                        </Card>
                    </Accordion>) :
                    <h3 key={index}>Loading...</h3>)
            )}
            {/* <div className="text-center" onClick={handleOnClick} style={{ width: '200px', margin: 'auto' }}>
                <Button className="createquiz mb-4"  >Submit Quiz</Button>
            </div> */}
        </>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { submitQuiz })(QuizQues);