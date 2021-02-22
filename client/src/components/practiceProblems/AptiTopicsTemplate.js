import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./practiceProblem.css";
import slugify from 'slugify';
import { Container, Button, Form, Accordion, Card, Alert } from 'react-bootstrap';

const AptiTopicsTemplate = (props) => {
    const { topics, title } = props;

    return (

        <Container className="container-problems">
            <Accordion>
                <Accordion.Toggle
                    as={Alert.Link}
                    eventKey="0"
                    style={{ color: "#775ecf" }}
                >
                    <h3 className="text-center mb-3 pt-4 text-capitalize">{title}</h3>
                </Accordion.Toggle>

                <div className="title-border mb-4">
                    <span></span>
                </div>
                <Accordion.Collapse
                    eventKey="0">
                    <>
                        <div className="row mr-2 ml-2">
                            <div className="col-12 ">
                                <Form>
                                    <Form.Group controlId="codingquestionSearch" >
                                        <Form.Control className=" searchField" type="" placeholder="Search Topics" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                        <hr className="hr-1 pb-2"></hr>

                        <div className="Topics pb-4">

                            {/* Topics component starts here */}
                            {topics.map((ele, index) =>
                                <div key={index} className="row topic mb-3 pb-2 pt-2">
                                    <div className="col-sm-6 topic-left">
                                        <h5 className="topic-name">{ele}</h5>
                                    </div>
                                    <div className="col-sm-6 ">
                                        <div className="topic-right">
                                            <span>
                                                <i className="fa fa-trash operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                                            </span>
                                            <Link to={`/practiceproblems/${slugify(ele, { lower: true })}`} >
                                                <span>
                                                    <i className="fa fa-chevron-circle-right operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Topics component ends here */}

                            <div className="text-center">
                                <Link to="/addtopic"><Button className="Addmore-btn mt-2" >Add More Topics</Button></Link>
                            </div>
                        </div>
                    </>
                </Accordion.Collapse>
            </Accordion>
        </Container >
    );
};
export default AptiTopicsTemplate;