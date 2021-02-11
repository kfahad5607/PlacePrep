import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createCode.css';
import { Button, Container, Form } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';

function CreateCodeQuestion() {
    const [lastId, setLastId] = useState(0);
    const [sampleArray, setSampleArray] = useState([{
        id: 0,
        sampleInput: '',
        sampleOutput: ''
    }]);

    const handleAddSampleClick = () => {
        const newSampleObj = {
            id: lastId + 1,
            sampleInput: '',
            sampleOutput: ''
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

    return (
        <Container className="container-createCodeQuest" >
            <h3 className="text-center mb-2 pt-4 "> Create Coding Question</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="codequestForm ">
                <Form>
                    <div className="row">
                        <div className="col-12">
                            <Form.Group controlId="quiztitle" >
                                <Form.Label><b>Question Tiltle</b></Form.Label>
                                <Form.Control className="createC-inputFiled" type="text" placeholder="Enter Title" />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Group controlId="quiztitle" >
                                <Form.Label><b>Question Description</b></Form.Label>
                                <TextareaAutosize className="createC-inputFiled questiontextarea" placeholder="Provide Description...."></TextareaAutosize>
                            </Form.Group>
                        </div>
                    </div>
                    <hr></hr>

                    <h3 className="text-center  mb-2 pt-1 ">Add Samples</h3>
                    <div className="title-border mb-4">
                        <span></span>
                    </div>
                    {/* Sampless starts from below */}
                    {
                        sampleArray.map((ele, index) => {
                            return (
                                <div className="" key={ele.id}>
                                    <div className="row ">
                                        <div className="col-sm-6">
                                            <Form.Group controlId="quiztitle" >
                                                <Form.Label><b>Sample Input</b></Form.Label>
                                                <TextareaAutosize className="createC-inputFiled questiontextarea" placeholder="" name='sampleInput' value={ele.sampleInput} onChange={(e) => handleOnSampleChange(e, index)}   ></TextareaAutosize>
                                            </Form.Group>
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Group controlId="quiztitle" >
                                                <Form.Label><b>Sample Output</b></Form.Label>
                                                <TextareaAutosize className="createC-inputFiled questiontextarea" placeholder="" name='sampleOutput' value={ele.sampleOutput} onChange={(e) => handleOnSampleChange(e, index)}  ></TextareaAutosize>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-sm-12 ">
                                            <Button className="delsamplebtn mb-2" onClick={(e) => handleDeleteSample(e, ele.id)} > Delete </Button>
                                        </div>
                                    </div>
                                </div>);
                        })
                    }

                    {/* samples end here */}

                    <div className=" text-center">
                        <Button className=" addsample mt-3" onClick={handleAddSampleClick} > Add More Samples  </Button>
                    </div>
                    <hr></hr>

                    <div className="row pt-2 pb-3">
                        <div className="col-sm-6">
                            <Form.Label><b className="mr-2">Solution </b></Form.Label>
                            <input type="file" className="Sfile " accept=''></input>
                            <label className="filelabel ">Upload Solution</label>
                        </div>
                        <div className="col-sm-2 pt-1 difflabel">
                            <Form.Label><b className=""> Set Difficulty </b></Form.Label>
                        </div>
                        <div className="col-sm-4">

                            <Form.Group controlId="SelectDifficulty">

                                <Form.Control as="select" className="createC-inputFiled diffdrop " >
                                    <option className="optionSelect">Easy</option>
                                    <option className="optionSelect">Medium</option>
                                    <option className="optionSelect">Hard</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>

                    <div className=" text-center">
                        <Button className="createquestbtn mb-4" > Create Question </Button>
                    </div>

                </Form>

            </div>
        </Container >
    );
}

export default CreateCodeQuestion;