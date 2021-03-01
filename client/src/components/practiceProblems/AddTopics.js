import React, { useState, useEffect } from "react";
import "../quiz/quiz.css";
import { Button, Container, Form } from "react-bootstrap";
import CreateAptiQuestion from "./CreateAptiQuestion";
import { connect } from "react-redux";
import { addTopic, clearPracticeProblemErrors } from "../../store/actions/practiceProblemActions";
import { setAlert } from "../../store/actions/alertActions";

const AddTopics = (props) => {
    const {
        auth: { user },
        practiceProblem: { error },
        addTopic,
        clearPracticeProblemErrors,
        setAlert,
    } = props;

    const [aptiInfo, setAptiInfo] = useState({
        topic: "",
        category: "quantitative analysis",
    });
    const [apti, setApti] = useState([
        {
            id: 0,
            author: "",
            topic: "",
            category: "",
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
        },
    ]);

    const [lastId, setLastId] = useState(0);

    useEffect(() => {
        if (error) {
            setAlert(error, "danger");
            clearPracticeProblemErrors();
        }
    }, [error]);

    const handleAddQuesClick = () => {
        const newQuesObj = {
            id: lastId + 1,
            author: aptiInfo.author,
            topic: aptiInfo.topic,
            category: aptiInfo.category,
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
        };

        setLastId(lastId + 1);

        const newQuesArray = [...apti, newQuesObj];
        setApti(newQuesArray);
    };

    const handleOnChangeQues = (e, index) => {
        const quesArray = [...apti];
        if (
            e.target.name === "question" ||
            e.target.name === "correctAnswer" ||
            e.target.name === "explanation"
        ) {
            quesArray[index][e.target.name] = e.target.value;
            setApti(quesArray);
        } else {
            let optIndex = 0;
            if (e.target.name === "optionB") {
                optIndex = 1;
            } else if (e.target.name === "optionC") {
                optIndex = 2;
            } else if (e.target.name === "optionD") {
                optIndex = 3;
            }
            quesArray[index].answers[optIndex] = e.target.value;
            setApti(quesArray);
        }
    };

    const handleOnChange = (e) => {
        setAptiInfo({
            ...aptiInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnDelete = (eleId) => {
        const newQuesArray = apti.filter((ele) => {
            return ele.id !== eleId;
        });
        setApti(newQuesArray);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (aptiInfo.topic === "") {
            setAlert("Please enter topic", "danger");
        } else {
            let tempApti = apti.map((ele) => {
                ele.topic = aptiInfo.topic;
                ele.category = aptiInfo.category;
                ele.author = user._id;
                return ele;
            });
            // addTopic(tempApti);
            // {
            //     aptiQuestions : []
            // }
            console.log("temp", tempApti);
            addTopic({
                aptiQuestions: tempApti,
            });

            setAptiInfo({
                topic: "",
                category: "quantitative analysis",
            });

            setApti([
                {
                    id: 0,
                    author: "",
                    topic: "",
                    category: "",
                    question: "",
                    answers: ["", "", "", ""],
                    correctAnswer: "",
                    explanation: "",
                },
            ]);
        }
    };

    return (
        <Container className="container-quiz">
            <h3 className="text-center  mb-2 pt-4 ">TOPIC DETAILS</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="createquizform pb-1">
                <Form onSubmit={onSubmit}>
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <Form.Group controlId="topic">
                                <Form.Label>
                                    <b>Enter Topic</b>
                                </Form.Label>
                                <Form.Control
                                    className="quiz-inputFiled"
                                    name="topic"
                                    value={aptiInfo.topic}
                                    onChange={handleOnChange}
                                    placeholder="Enter Topic"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-sm-6">
                            <Form.Group controlId="category">
                                <Form.Label>
                                    <b>Select Category</b>
                                </Form.Label>
                                <Form.Group controlId="SelectRowsPerpage">
                                    <Form.Control
                                        as="select"
                                        className="quiz-inputFiled"
                                        name="category"
                                        value={aptiInfo.category}
                                        onChange={handleOnChange}
                                    >
                                        <option
                                            className="optionSelect"
                                            value="quantitative analysis"
                                        >
                                            Quantitative Analysis
                                        </option>
                                        <option
                                            className="optionSelect"
                                            value="logical reasoning"
                                        >
                                            Logical Reasoning
                                        </option>
                                        <option
                                            className="optionSelect"
                                            value="verbal ability"
                                        >
                                            Verbal Ability
                                        </option>
                                        <option
                                            className="optionSelect"
                                            value="other topics"
                                        >
                                            Other Topics
                                        </option>
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
                    {apti.map((ele, index) => (
                        <CreateAptiQuestion
                            key={ele.id}
                            index={index}
                            onDeleteFunc={() => handleOnDelete(ele.id)}
                            onChangeFunc={(e) => handleOnChangeQues(e, index)}
                            quesObj={ele}
                        />
                    ))}
                    {/* Question sample end here */}

                    <div className="row">
                        <div className="col-sm-6">
                            <Button
                                className="addquestbtn mb-2"
                                onClick={handleAddQuesClick}
                            >
                                {" "}
                                Add Next Question{" "}
                            </Button>
                        </div>
                        <div className="col-sm-6 text-center">
                            <Button className="createquiz mb-4" type="submit">
                                Add Topic
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        practiceProblem: state.practiceProblem,
    };
};

export default connect(mapStateToProps, { addTopic, clearPracticeProblemErrors, setAlert })(AddTopics);
