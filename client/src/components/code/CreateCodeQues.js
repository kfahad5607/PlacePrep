import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./createCode.css";
import { Button, Container, Form } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import {
    addQuestion,
    getQuestion,
    updateQuestion,
} from "../../store/actions/codeActions";

const CreateCodeQuestion = (props) => {
    const { addQuestion, getQuestion, updateQuestion } = props;
    const { current } = props.code;
    const [codeQuestion, setCodeQuestion] = useState({
        title: "",
        difficulty: "easy",
        description: "",
        testcases: "",
        sampleInput: [],
    });
    const [lastId, setLastId] = useState(0);
    const [sampleArray, setSampleArray] = useState([
        {
            id: 0,
            sampleInput: "",
            sampleOutput: "",
        },
    ]);

    useEffect(() => {
        if (props.match.path.includes("editCodeQuestion")) {
            getQuestion(props.match.params.id);
        }
    }, []);

    useEffect(() => {
        if (current !== null) {
            setCodeQuestion(current);
        } else {
            setCodeQuestion({
                title: "",
                difficulty: "easy",
                description: "",
                testcases: "",
                sampleInput: [],
            });
        }
    }, [current]);

    const handleAddSampleClick = () => {
        const newSampleObj = {
            id: lastId + 1,
            sampleInput: "",
            sampleOutput: "",
        };
        setLastId(lastId + 1);

        const newSampleArray = [...sampleArray, newSampleObj];
        setSampleArray(newSampleArray);
    };

    const handleOnSampleChange = (e, index) => {
        const newSampleArray = [...sampleArray];
        newSampleArray[index][e.target.name] = e.target.value;

        setSampleArray(newSampleArray);
    };

    const handleDeleteSample = (e, eleId) => {
        const newSampleArray = sampleArray.filter((ele) => {
            return ele.id !== eleId;
        });
        setSampleArray(newSampleArray);
    };

    const handleOnChange = (e) => {
        setCodeQuestion({
            ...codeQuestion,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (
            codeQuestion.title === "" ||
            codeQuestion.description === "" ||
            codeQuestion.testcases === ""
        ) {
            console.log("Please enter all fields", "danger");
        } else {
            setCodeQuestion({ ...codeQuestion, sampleInput: sampleArray });
            current !== null
                ? updateQuestion(codeQuestion)
                : addQuestion(codeQuestion);
        }
    };

    return (
        <Container className="container-createCodeQuest">
            <h3 className="text-center mb-2 pt-4 "> Create Coding Question</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="codequestForm ">
                <Form>
                    <div className="row">
                        <div className="col-12">
                            <Form.Group controlId="quiztitle">
                                <Form.Label>
                                    <b>Question Tiltle</b>
                                </Form.Label>
                                <Form.Control
                                    className="createC-inputFiled"
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    value={codeQuestion.title}
                                    onChange={handleOnChange}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Group controlId="quiztitle">
                                <Form.Label>
                                    <b>Question Description</b>
                                </Form.Label>
                                <TextareaAutosize
                                    className="createC-inputFiled questiontextarea"
                                    placeholder="Provide Description...."
                                    name="description"
                                    value={codeQuestion.description}
                                    onChange={handleOnChange}
                                ></TextareaAutosize>
                            </Form.Group>
                        </div>
                    </div>
                    <hr></hr>

                    <h3 className="text-center  mb-2 pt-1 ">Add Samples</h3>
                    <div className="title-border mb-4">
                        <span></span>
                    </div>
                    {/* Sampless starts from below */}
                    {sampleArray.map((ele, index) => {
                        return (
                            <div className="" key={ele.id}>
                                <div className="row ">
                                    <div className="col-sm-6">
                                        <Form.Group controlId="quiztitle">
                                            <Form.Label>
                                                <b>Sample Input</b>
                                            </Form.Label>
                                            <TextareaAutosize
                                                className="createC-inputFiled questiontextarea"
                                                placeholder=""
                                                name="sampleInput"
                                                value={ele.sampleInput}
                                                onChange={(e) =>
                                                    handleOnSampleChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            ></TextareaAutosize>
                                        </Form.Group>
                                    </div>
                                    <div className="col-sm-6">
                                        <Form.Group controlId="quiztitle">
                                            <Form.Label>
                                                <b>Sample Output</b>
                                            </Form.Label>
                                            <TextareaAutosize
                                                className="createC-inputFiled questiontextarea"
                                                placeholder=""
                                                name="sampleOutput"
                                                value={ele.sampleOutput}
                                                onChange={(e) =>
                                                    handleOnSampleChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            ></TextareaAutosize>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-sm-12 ">
                                        <Button
                                            className="delsamplebtn mb-2"
                                            onClick={(e) =>
                                                handleDeleteSample(e, ele.id)
                                            }
                                        >
                                            {" "}
                                            Delete{" "}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* samples end here */}
                    <div className=" text-center">
                        <Button
                            className=" addsample mt-3"
                            onClick={handleAddSampleClick}
                        >
                            {" "}
                            Add More Samples{" "}
                        </Button>
                    </div>
                    <hr></hr>

                    <h3 className="text-center  mb-2 pt-1 ">Add TestCases</h3>
                    <div className="title-border mb-4">
                        <span></span>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <Form.Group controlId="quiztitle">
                                <TextareaAutosize
                                    className="createC-inputFiled questiontextarea "
                                    minRows="2"
                                    placeholder=""
                                    name="testcases"
                                    value={codeQuestion.testcases}
                                    onChange={handleOnChange}
                                ></TextareaAutosize>
                            </Form.Group>
                        </div>
                    </div>
                    <hr className="mt-2"></hr>

                    <div className="row pt-2 pb-3">
                        <div className="col-sm-6">
                            <Form.Label>
                                <b className="mr-2">Solution </b>
                            </Form.Label>
                            <input
                                type="file"
                                className="Sfile "
                                accept=""
                            ></input>
                            <label className="filelabel ">
                                Upload Solution
                            </label>
                        </div>
                        <div className="col-sm-2 pt-1 difflabel">
                            <Form.Label>
                                <b className=""> Set Difficulty </b>
                            </Form.Label>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group controlId="SelectDifficulty">
                                <Form.Control
                                    as="select"
                                    name="difficulty"
                                    className="createC-inputFiled diffdrop "
                                    value={codeQuestion.difficulty}
                                    onChange={handleOnChange}
                                >
                                    <option
                                        value="easy"
                                        className="optionSelect"
                                    >
                                        Easy
                                    </option>
                                    <option
                                        value="medium"
                                        className="optionSelect"
                                    >
                                        Medium
                                    </option>
                                    <option
                                        value="hard"
                                        className="optionSelect"
                                    >
                                        Hard
                                    </option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>

                    <div className=" text-center">
                        <Button
                            className="createquestbtn mb-4"
                            onClick={handleOnSubmit}
                        >
                            {current !== null ? ' Edit Question ' : ' Create Question '}
                            
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    code: state.code,
});

export default connect(mapStateToProps, {
    addQuestion,
    getQuestion,
    updateQuestion,
})(CreateCodeQuestion);
