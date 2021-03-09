import React, { useState, useEffect } from "react";
import "./createCode.css";
import { Button, Container, Form } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import {
    addQuestion,
    getQuestion,
    updateQuestion,
    clearCurrent,
    clearCodeErrors,
    clrCodeCreateSuccess
} from "../../store/actions/codeActions";
import { setAlert } from "../../store/actions/alertActions";

const CreateCodeQuestion = (props) => {
    const {
        addQuestion,
        getQuestion,
        updateQuestion,
        clearCurrent,
        clearCodeErrors,
        clrCodeCreateSuccess,
        setAlert,
    } = props;
    const { current, error, isCreated } = props.code;
    const [codeQuestion, setCodeQuestion] = useState({
        title: "",
        difficulty: "10",
        description: "",
        testcases: "",
        sampleInputs: [],
        solution: "",
        noOfInputs: ""
    });
    const [lastId, setLastId] = useState(0);
    const [clickSubmit, setClickSubmit] = useState(false);
    const [sampleArray, setSampleArray] = useState([]);

    useEffect(() => {
        if (props.match.path.includes("editCodeQuestion")) {
            getQuestion(props.match.params.slug);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isCreated) {
            if (props.match.path.includes("editCodeQuestion")) {
                setAlert('Question has been updated.', 'success');
            }
            else {
                setAlert('Question has been created.', 'success');
                setCodeQuestion({
                    title: "",
                    difficulty: "10",
                    description: "",
                    testcases: "",
                    sampleInputs: [],
                    solution: "",
                    noOfInputs: ""
                });
                setSampleArray([]);
            }
            clrCodeCreateSuccess();
        }

        //eslint-disable-next-line
    }, [isCreated]);

    useEffect(() => {
        if (error) {
            setAlert(error, "danger");
            clearCodeErrors();
        }
        if (current !== null && props.match.path.includes("editCodeQuestion")) {
            props.history.replace({
                pathname: `/editCodeQuestion/${current.slug}`,
            });
            setCodeQuestion(current);
            if (current.sampleInputs) {
                const newArray = current.sampleInputs.map((curr) => ({
                    ...curr,
                }));
                setSampleArray(newArray);
                setLastId(current.sampleInputs.length - 1);
            }
        } else {
            clearCurrent();
            if (
                props.match.path.includes("createCodeQuestion") &&
                codeQuestion.title !== "" &&
                current === null &&
                !clickSubmit
            ) {

                setCodeQuestion({
                    title: "",
                    difficulty: "10",
                    description: "",
                    testcases: "",
                    sampleInputs: [],
                    solution: "",
                    noOfInputs: ""
                });
            }
        }
        // eslint-disable-next-line
    }, [current, error, props.match.path]);

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
        setClickSubmit(true);
        if (
            codeQuestion.title === "" ||
            codeQuestion.description === "" ||
            codeQuestion.testcases === "" ||
            codeQuestion.noOfInputs === ""
        ) {
            setAlert("Please enter all fields", "danger");
        } else {
            let temp = JSON.parse(JSON.stringify(codeQuestion));
            temp.sampleInputs = sampleArray;

            setCodeQuestion({ ...codeQuestion, sampleInputs: sampleArray });

            current !== null
                ? updateQuestion(temp)
                : addQuestion(temp);
        }
    };

    return (
        <Container className="container-createCodeQuest">
            <h3 className="text-center mb-2 pt-4 ">{props.match.path.includes("editCodeQuestion") ? 'Edit' : 'Create'} Coding Question</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="codequestForm ">
                <Form encType="multipart/form-data">
                    <div className="row">
                        <div className="col-12">
                            <Form.Group controlId="quiztitle">
                                <Form.Label>
                                    <b>Title</b>
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
                                    <b>Description</b>
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
                            Add Examples{" "}
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
                        <div className="col-sm-12">
                            <Form.Label>
                                <b className="mr-2">Solution </b>
                            </Form.Label>
                            <TextareaAutosize
                                className="createC-inputFiled questiontextarea "
                                minRows="2"
                                placeholder=""
                                name="solution"
                                value={codeQuestion.solution}
                                onChange={handleOnChange}
                            ></TextareaAutosize>
                        </div>

                    </div>
                    <div className="row pt-2 pb-3">
                        <div className="col-sm-2 pt-1 difflabel">
                            <Form.Label>
                                <b className="">No. of inputs</b>
                            </Form.Label>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group controlId="noOfInputs" >
                                <Form.Control className="quiz-inputFiled quizDuration" name="noOfInputs" value={codeQuestion.noOfInputs} onChange={handleOnChange} type="number" placeholder="" />
                            </Form.Group>
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
                                        value={"10"}
                                        className="optionSelect"
                                    >
                                        Easy
                                    </option>
                                    <option
                                        value={"20"}
                                        className="optionSelect"
                                    >
                                        Medium
                                    </option>
                                    <option
                                        value={"30"}
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
                            {current !== null
                                ? " Edit Question "
                                : " Create Question "}
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
    clearCurrent,
    clearCodeErrors,
    clrCodeCreateSuccess,
    setAlert,
})(CreateCodeQuestion);
