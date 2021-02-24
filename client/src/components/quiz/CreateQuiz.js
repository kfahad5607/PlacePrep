import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './quiz.css';
import { Button, Container, Form } from 'react-bootstrap';
import QuizQuestion from './CreateQuizQuestion';
import { connect } from 'react-redux';
import { addQuiz } from '../../store/actions/quizActions';

function CreateQuiz(props) {
    const { auth: { user }, addQuiz } = props;

    const [quiz, setQuiz] = useState({
        author: '',
        title: '',
        category: 'quants',
        topic: '',
        duration: '',
        questions: [{
            id: 0,
            question: '',
            answers: ['', '', '', ''],
            correctAnswer: ''
        }]
    });

    const [lastId, setLastId] = useState(0);

    const handleAddQuesClick = () => {
        const newQuesObj = {
            id: lastId + 1,
            question: '',
            answers: ['', '', '', ''],
            correctAnswer: ''
        };

        setLastId(lastId + 1);

        const newQuesArray = [...quiz.questions, newQuesObj];
        setQuiz({
            ...quiz,
            questions: newQuesArray
        });

    };

    const handleOnChange = (e) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeQues = (e, index) => {
        const quesArray = [...quiz.questions];
        if (e.target.name === 'question' || e.target.name === 'correctAnswer') {
            quesArray[index][e.target.name] = e.target.value;
            setQuiz({
                ...quiz,
                questions: quesArray
            });
        }
        else {
            let optIndex = 0;
            if (e.target.name === 'optionB') {
                optIndex = 1;
            }
            else if (e.target.name === 'optionC') {
                optIndex = 2;
            }
            else if (e.target.name === 'optionD') {
                optIndex = 3;
            }
            quesArray[index].answers[optIndex] = e.target.value;
            setQuiz({
                ...quiz,
                questions: quesArray
            });
        }

    };

    const handleOnDelete = (eleId) => {
        const newQuesArray = quiz.questions.filter((ele) => {
            return ele.id !== eleId;
        });
        setQuiz({
            ...quiz,
            questions: newQuesArray
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let tempQuiz = JSON.parse(JSON.stringify(quiz));
        tempQuiz.author = user._id;
        console.log('quiz', tempQuiz);
        addQuiz(tempQuiz);

        setQuiz({
            title: '',
            category: '',
            topic: '',
            duration: '',
            questions: [{
                id: 0,
                question: '',
                answers: ['', '', '', ''],
                correctAnswer: ''
            }]
        });
    };

    return (
        <Container className="container-quiz">
            <h3 className="text-center  mb-2 pt-4 ">QUIZ DETAILS</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="createquizform pb-1">
                <Form onSubmit={onSubmit} >
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <Form.Group controlId="quiztitle" >
                                <Form.Label><b>Quiz title</b></Form.Label>
                                <Form.Control className="quiz-inputFiled" name="title" value={quiz.title} onChange={handleOnChange} type="" placeholder="Enter Title" />
                            </Form.Group>
                        </div>
                        <div className="col-sm-6">
                            <Form.Group controlId="category" >
                                <Form.Label><b>Select Category</b></Form.Label>
                                <Form.Group controlId="SelectRowsPerpage">
                                    <Form.Control as="select" className="quiz-inputFiled" name='category' value={quiz.category} onChange={handleOnChange} >
                                        <option className="optionSelect" value='quantitative analysis' >Quantitative Analysis</option>
                                        <option className="optionSelect" value='logical reasoning' >Logical Reasoning</option>
                                        <option className="optionSelect" value='verbal ability' >Verbal Ability</option>
                                        <option className="optionSelect" value='other topics' >Others</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-sm-6 responsivelabel">
                            <Form.Group controlId="topics" >
                                <Form.Label><b>Quiz topics</b></Form.Label>
                                <Form.Control className="quiz-inputFiled " name="topic" value={quiz.topic} onChange={handleOnChange} type="" placeholder="Example: Probability, Trains..." />
                            </Form.Group>

                        </div>
                        <div className="col-sm-6 responsivelabel">
                            <Form.Group controlId="duration" >
                                <Form.Label><b >Duration</b></Form.Label>
                                <Form.Control className="quiz-inputFiled quizDuration " name="duration" value={quiz.duration} onChange={handleOnChange} type="number" placeholder="Minutes only" />
                            </Form.Group>
                        </div>
                    </div>
                    <hr></hr>
                    <h3 className="text-center  mb-2 pt-2 ">ADD QUESTIONS</h3>
                    <div className="title-border mb-3">
                        <span></span>
                    </div>

                    {quiz.questions.map((ele, index) => <QuizQuestion
                        key={ele.id}
                        index={index}
                        onDeleteFunc={() => handleOnDelete(ele.id)}
                        onChangeFunc={(e) => handleOnChangeQues(e, index)}
                        quesObj={ele}
                    />
                    )}

                    <div className="row">
                        <div className="col-sm-6">
                            <Button className="addquestbtn mb-2" onClick={handleAddQuesClick} > Add Next Question  </Button>
                        </div>
                        <div className="col-sm-6 text-center">
                            <Button className="createquiz mb-4" type="submit" >Create Quiz</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return ({
        quiz: state.quiz,
        auth: state.auth
    });
};

export default connect(mapStateToProps, { addQuiz })(CreateQuiz);