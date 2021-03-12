import React, { useState, useRef } from 'react';
// import './quiz.css';
import { Button, Form, Alert, Accordion } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';

const CreateAptiQuestion = (props) => {
    const [toggle, setToggle] = useState(false);
    const inpRef = useRef(null);

    const handleOnFocus = () => {
        if (!toggle) {
            inpRef.current.click();
        }
    };

    return (
        <div className="mb-4">

            <Accordion>
                <div className="row ">
                    <div className="col-12">
                        <Form.Group controlId={`question${props.index}`} >
                            <Form.Label> <b>Question {props.index + 1}</b></Form.Label>
                            <Accordion.Toggle as={Alert.Link}
                                ref={inpRef}
                                onClick={() => setToggle(!toggle)}
                                eventKey="0"
                                style={{ float: 'right', paddingRight: '20px', color: "#775ecf" }}
                            >
                                {toggle ? 'Collapse' : 'Expand'}
                            </Accordion.Toggle>
                            <TextareaAutosize
                                id={`question${props.index}`}
                                className="quiz-inputFiled questiontextarea"
                                name="question"
                                onFocus={handleOnFocus}
                                onChange={props.onChangeFunc}
                                value={props.quesObj.question}
                                placeholder="Type question here..">

                            </TextareaAutosize>
                        </Form.Group>
                    </div>
                </div>
                {/* </Accordion.Toggle> */}
                <Accordion.Collapse eventKey="0">
                    <>
                        <div className="row ">
                            <div className="col-sm-6">
                                <Form.Group controlId={`optionA-${props.index}`} >
                                    <Form.Label><b>Option A</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled" onChange={props.onChangeFunc} value={props.quesObj.answers[0]} name="optionA" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-sm-6">
                                <Form.Group controlId={`optionB-${props.index}`} >
                                    <Form.Label><b>Option B</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.answers[1]} name="optionB" placeholder="" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-6">
                                <Form.Group controlId={`optionC-${props.index}`} >
                                    <Form.Label><b>Option C</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.answers[2]} name="optionC" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-sm-6">
                                <Form.Group controlId={`optionD-${props.index}`} >
                                    <Form.Label><b>Option D</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.answers[3]} name="optionD" placeholder="" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-6">
                                <Form.Group controlId={`correctOption-${props.index}`} >
                                    <Form.Label><b>Correct option</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.correctAnswer} name="correctAnswer" placeholder="Enter answer/text" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-9">
                                <Form.Group controlId={`explanation${props.index}`}>

                                    <Form.Label><b>Explanation</b></Form.Label>
                                    <TextareaAutosize id={`explanation${props.index}`} className="quiz-inputFiled questiontextarea" onChange={props.onChangeFunc} value={props.quesObj.explanation} name="explanation" placeholder="" ></TextareaAutosize>
                                </Form.Group>
                            </div>
                            {props.onDeleteFunc && <div className="col-sm-3">
                                <Button className="deletebtn" onClick={props.onDeleteFunc} >Delete question</Button>
                            </div>}
                        </div>
                        <hr className="mb-4 mt-4"></hr>
                    </>
                </Accordion.Collapse>
            </Accordion>

        </div>
    );

};

export default CreateAptiQuestion;