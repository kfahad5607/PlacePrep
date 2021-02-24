import React, { useState, useEffect } from 'react';
import '../quiz/quiz.css';
import { Button, Container, Form } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import CreateAptiQuestion from './CreateAptiQuestion';
import { connect } from 'react-redux';
import { updatePracticeProblem, getPracticeProblem } from '../../store/actions/practiceProblemActions';

const EditPracticeProblem = (props) => {
    const { auth: { user },
        practiceProblem: { current },
        updatePracticeProblem,
        getPracticeProblem,
        match
    } = props;
    const id = match.params.id;

    useEffect(() => {
        getPracticeProblem(id);
    }, []);

    useEffect(() => {
        if (current !== null) {
            let tempDeepCopy = JSON.parse(JSON.stringify(current));

            setApti(tempDeepCopy);
        } else {
            setApti({
                author: '',
                topic: '',
                category: 'quantitative analysis',
                question: '',
                answers: ['', '', '', ''],
                correctAnswer: '',
                explanation: ''
            });
        }
    }, [current]);

    const [apti, setApti] = useState({
        author: '',
        topic: '',
        category: 'quantitative analysis',
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: '',
        explanation: ''
    });

    const handleOnChangeQues = (e, index) => {
        const quesObj = { ...apti };
        if (e.target.name === 'question' || e.target.name === 'correctAnswer' || e.target.name === 'explanation') {
            quesObj[e.target.name] = e.target.value;
            setApti(quesObj);
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
            quesObj.answers[optIndex] = e.target.value;
            setApti(quesObj);
        }

    };

    const handleOnChange = (e) => {
        setApti({
            ...apti,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // addTopic(tempApti);
        // {
        //     aptiQuestions : []
        // }
        console.log('temp', apti);
        updatePracticeProblem(apti);

        // setApti([{
        //     id: 0,
        //     author: aptiInfo.author,
        //     topic: aptiInfo.topic,
        //     category: aptiInfo.category,
        //     question: '',
        //     answers: ['', '', '', ''],
        //     correctAnswer: '',
        //     explanation: ''
        // }]);
    };

    return (
        <Container className="container-quiz">
            <h3 className="text-center  mb-2 pt-4 ">TOPIC DETAILS</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="createquizform pb-1">
                <Form onSubmit={onSubmit}  >
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <Form.Group controlId="topic" >
                                <Form.Label><b>Enter Topic</b></Form.Label>
                                <Form.Control className="quiz-inputFiled" name="topic" value={apti.topic} onChange={handleOnChange} placeholder="Enter Topic" />
                            </Form.Group>
                        </div>
                        <div className="col-sm-6">
                            <Form.Group controlId="category" >
                                <Form.Label><b>Select Category</b></Form.Label>
                                <Form.Group controlId="SelectRowsPerpage">
                                    <Form.Control as="select" className="quiz-inputFiled" name='category' value={apti.category} onChange={handleOnChange}  >
                                        <option className="optionSelect" value='quantitative analysis'  >Quantitative Analysis</option>
                                        <option className="optionSelect" value='logical reasoning'  >Logical Reasoning</option>
                                        <option className="optionSelect" value='verbal ability' >Verbal Ability</option>
                                        <option className="optionSelect" value='other topics' >Other Topics</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                        </div>
                    </div>
                    <hr></hr>
                    <h3 className="text-center  mb-2 pt-2 ">ADD QUESTIONS</h3>
                    <div className="title-border mb-3">
                        <span></span>
                    </div>

                    {/* Questions Samples start Here */}
                    <CreateAptiQuestion
                        key={apti._id}
                        index={0}
                        onChangeFunc={(e) => handleOnChangeQues(e, 0)}
                        quesObj={apti} />
                    {/* Question sample end here */}

                    <div className="row">
                        <div className="col-sm-4 text-center" style={{ margin: 'auto' }}>
                            <Button className="createquiz mb-4" type='submit' >Update</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );

};

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        practiceProblem: state.practiceProblem
    });
};

export default connect(mapStateToProps, { updatePracticeProblem, getPracticeProblem })(EditPracticeProblem);