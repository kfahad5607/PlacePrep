import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './quiz.css';
import { Button, Container, Form } from 'react-bootstrap';
import QuizQuestion from './CreateQuizQuestion';


function CreateQuiz() {
    const [lastId, setLastId] = useState(0);
    const [addQuesArray, setAddQuesArray] = useState([{
        id: 0,
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: ''
    }]);

    const handleAddQuesClick = () => {
        const newQuesObj = {
            id: lastId + 1,
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctOption: ''
        };

        setLastId(lastId + 1);

        const newAddQuesArray = [...addQuesArray, newQuesObj];
        setAddQuesArray(newAddQuesArray);

    };

    const handleOnChange = (e, index) => {
        const newAddQuesArray = [...addQuesArray];
        newAddQuesArray[index][e.target.name] = e.target.value;
        setAddQuesArray(newAddQuesArray);
    };

    const handleOnDelete = (eleId) => {
        const newAddQuesArray = addQuesArray.filter((ele) => {
            return ele.id !== eleId;
        });
        setAddQuesArray(newAddQuesArray);
    };

    return (
        <Container>
            <h3 className="text-center  mb-2 pt-4 ">QUIZ DETAILS</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="createquizform pb-1">
                <Form >
                    <div className="row mb-2">
                        <div className="col-6">
                            <Form.Group controlId="quiztitle" >
                                <Form.Label><b>Quiz title</b></Form.Label>
                                <Form.Control className="quiz-inputFiled" type="" placeholder="Enter Title" />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group controlId="category" >
                                <Form.Label><b>Quiz Category</b></Form.Label>
                                <Form.Control className="quiz-inputFiled" type="" placeholder="Quantitative/ Logical/ Other" />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6 responsivelabel">
                            <Form.Group controlId="topics" >
                                <Form.Label><b>Quiz topics</b></Form.Label>
                                <Form.Control className="quiz-inputFiled " type="email" placeholder="Example: Probability, Trains..." />
                            </Form.Group>

                        </div>
                        <div className="col-6 responsivelabel">
                            <Form.Group controlId="duration" >
                                <Form.Label><b >Duration</b></Form.Label>
                                <Form.Control className="quiz-inputFiled quizDuration " type="number" placeholder="Minutes only" />
                            </Form.Group>
                        </div>
                    </div>
                    <hr></hr>
                    <h3 className="text-center  mb-2 pt-2 ">ADD QUESTIONS</h3>
                    <div className="title-border mb-3">
                        <span></span>
                    </div>


                    {addQuesArray.map((ele, index) => <QuizQuestion
                        key={ele.id}
                        index={index}
                        onDeleteFunc={() => handleOnDelete(ele.id)}
                        onChangeFunc={(e) => handleOnChange(e, index)}
                        quesObj={ele}
                    />
                    )}

                    <div className="row">
                        <div className="col-6">
                            <Button className="addquestbtn mb-4" onClick={handleAddQuesClick} > Add Next Question  </Button>
                        </div>
                        <div className="col-6 text-center">
                            <Button className="createquiz mb-4" > Create Quiz</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default CreateQuiz;