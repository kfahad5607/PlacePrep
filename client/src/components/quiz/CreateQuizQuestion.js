import React, { useState } from 'react';
// import './quiz.css';
import { Button, Form, Alert, Row, Accordion } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';


function QuizQuestion(props) {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="mb-5">

            <Accordion>
                {/* <Accordion.Toggle as={Row} eventKey="0" style={{ cursor: 'pointer', backgroundColor: 'rgb(164, 166, 179)'}}> */}
                <div className="row ">
                    <div className="col-12">
                        <Form.Group controlId="exampleForm.ControlTextarea1" >
                            <Form.Label> <b>Question {props.index + 1}</b></Form.Label>
                            <Accordion.Toggle as={Alert.Link}
                                onClick={() => setToggle(!toggle)}
                                eventKey="0"
                                style={{ float: 'right', paddingRight: '20px' }}
                            >
                                {toggle ? 'Collapse' : 'Expand'}
                            </Accordion.Toggle>
                            <TextareaAutosize
                                className="quiz-inputFiled questiontextarea"
                                name="question"
                                onChange={props.onChangeFunc}
                                value={props.quesObj.ques}
                                placeholder="Type question here..">

                            </TextareaAutosize>
                        </Form.Group>
                    </div>
                </div>
                {/* </Accordion.Toggle> */}
                <Accordion.Collapse eventKey="0">
                    <>
                        <div className="row ">
                            <div className="col-6">
                                <Form.Group controlId="optionA" >
                                    <Form.Label><b>Option A</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled" onChange={props.onChangeFunc} value={props.quesObj.optA} name="optionA" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="optionB" >
                                    <Form.Label><b>Option B</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.optB} name="optionB" placeholder="" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-6">
                                <Form.Group controlId="optionC" >
                                    <Form.Label><b>Option C</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.optC} name="optionC" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="optionD" >
                                    <Form.Label><b>Option D</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.optD} name="optionD" placeholder="" />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-6">
                                <Form.Group controlId="correctOption" >
                                    <Form.Label><b>Correct option</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " onChange={props.onChangeFunc} value={props.quesObj.correctOpt} name="correctOption" placeholder="Enter answer/text" />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Button className="deletebtn" onClick={props.onDeleteFunc} >Delete question</Button>
                            </div>
                        </div>
                    </>
                </Accordion.Collapse>
            </Accordion>
            <hr className="mt-5 "></hr>
        </div>
    );

}

export default QuizQuestion;