import React from 'react';
import { Button, Container, Form } from "react-bootstrap";
import './dashboard.css';
import { connect } from "react-redux";

function Dashboard() {
    return (
        <Container className="container-user">
            <h3 className="text-center mb-3 pt-4 ">DASHBOARD</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="userform">

                <div className="row pb-3 pt-3">
                    <div className="col-md-6 mb-3">
                        <div className="card card1">
                            <div className="card-header cardHeader1">
                                <h6 className=" mb-0 text-white ">
                                    Quizzes
                                </h6>
                            </div>
                            <div className="card-footer cardFooter ">
                                <span className="footerInfo ">Attempted : <span>3 / 12</span> </span>
                                <button type="button" className="btn btn-primary cardBtn1 setting ">See Quiz</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card card2">
                            <div className="card-header cardHeader2">
                                <h6 className=" mb-0 text-white ">
                                    Coding Questions
                                </h6>
                            </div>
                            <div className="card-footer cardFooter ">
                                <span className="footerInfo ">Attempted : <span>1 / 20</span> </span>
                                <button type="button" className="btn btn-primary cardBtn2 setting ">Questions</button>
                            </div>

                        </div>
                    </div>
                </div>
                <hr className="pb-4 hr-m"></hr>

                <div className="row ">
                    <div className="col-md-4 pb-4">
                        <div className="card cardP">
                            <img className="card-img-top cardimg" src="bulb1.jpg" alt="Card image cap" ></img>
                            <div className="card-body">
                                <h5 className="card-title text-center">Quantitative Analysis</h5>
                                <p className="card-text text-center">See some examples of Quant analysis and enhance your problem solving skills.</p>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary setting pbtnQ ">Lets Practice</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pb-4">
                        <div className="card cardP">
                            <img className="card-img-top cardimg" src="logic1.jpg" alt="Card image cap" ></img>
                            <div className="card-body">
                                <h5 className="card-title text-center">Logical reasoning</h5>
                                <p className="card-text text-center">See some examples of logical reasoning and enhance your logical reasoning skills.</p>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary setting  pbtnL">Lets Practice</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pb-4">
                        <div className="card cardP">
                            <img className="card-img-top cardimg" src="verbal1.jpg" alt="Card image cap" ></img>
                            <div className="card-body">
                                <h5 className="card-title text-center">Verbal Ability</h5>
                                <p className="card-text text-center">See some amazing examples of verbal ability and enhance your communication skills..</p>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary setting  pbtnV">Lets Practice</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* tablestarts here */}

                <h3 className="text-center mb-2 pt-3 ">USERS</h3>
                <div className="title-border mb-4">
                    <span></span>
                </div>
                <div className="row">
                    <div className="col-12 pb-2">
                        <Form>
                            <Form.Group controlId="codingquestionSearch">
                                <Form.Control
                                    className=" codingQuestSearch"
                                    type="text"
                                    placeholder="Search users by role, name or Email"

                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="table-responsive ">
                    < table className="table table-bordered table-striped tbr text-center mb-3" >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="tbodyCode">
                            <tr>
                                <th scope="row" className="pad-td">1</th>
                                <td className="pad-td">Mark Otto</td>
                                <td className="pad-td">Markotto@example.com</td>
                                <td>
                                    <Form>
                                        <Form.Group controlId="SelectRole">
                                            <Form.Control as="select" name="pageSize" className="roledrop" >
                                                <option className="optionSelect" >Student </option>
                                                <option className="optionSelect"> Faculty</option>
                                                <option className="optionSelect">Admin </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <span>
                                        <a className="fa fa-trash operation-D pt-2" aria-hidden="true" href="#"></a>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="pad-td">2</th>
                                <td className="pad-td">jacob Oram</td>
                                <td className="pad-td">jacob@example.com</td>
                                <td>
                                    <Form>
                                        <Form.Group controlId="SelectRole">
                                            <Form.Control as="select" name="pageSize" className="roledrop" >
                                                <option className="optionSelect" >Student </option>
                                                <option className="optionSelect"> Faculty</option>
                                                <option className="optionSelect">Admin </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <span>
                                        <a className="fa fa-trash operation-D pt-2" aria-hidden="true" href="#"></a>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="pad-td">3</th>
                                <td className="pad-td">Larry Wheels</td>
                                <td className="pad-td">larry@example.com</td>
                                <td>
                                    <Form>
                                        <Form.Group controlId="SelectRole">
                                            <Form.Control as="select" name="pageSize" className="roledrop" >
                                                <option className="optionSelect" >Student </option>
                                                <option className="optionSelect"> Faculty</option>
                                                <option className="optionSelect">Admin </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <span>
                                        <a className="fa fa-trash operation-D pt-2" aria-hidden="true" href="#"></a>
                                    </span>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                {/* pagination starts here */}
                <div className="row">
                    <div className="ml-3 ">
                        <Form>
                            <Form.Group controlId="SelectRowsPerpage">
                                <Form.Control
                                    as="select"
                                    name="pageSize"
                                    className="dispCode-inputFiled rowsPerPg"
                                >
                                    <option
                                        value={10}
                                        className="optionSelect"
                                    >
                                        10
                                            </option>
                                    <option
                                        value={25}
                                        className="optionSelect"
                                    >
                                        25
                                            </option>
                                    <option
                                        value={50}
                                        className="optionSelect"
                                    >
                                        50
                                            </option>
                                    <option
                                        value={100}
                                        className="optionSelect"
                                    >
                                        100
                                            </option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </div>
                    <span className="labelRowsPerPg mt-2 col-4">
                        rows per page.
                    </span>

                    {/* pagination Component yahaa aayega */}

                </div>

            </div >

        </Container >
    )
}
export default Dashboard;