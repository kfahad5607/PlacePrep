import React from 'react';

import './CodeQuestDisp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';

function CodeQuestions() {

    return (
        <Container className="container-codeQuest">
            <h3 className="text-center  mb-2 pt-4 ">Coding Questions</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="displayQuest pb-2">
                <div className="row">
                    <div className="col-12 pb-2">
                        <Form>
                            <Form.Group controlId="codingquestionSearch" >
                                <Form.Control className=" codingQuestSearch" type="" placeholder="Search question titles, descriptions or ID" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <table className="table  ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Solution</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Acceptance</th>
                            <th scope="col">Operations</th>
                        </tr>

                    </thead>
                    <tbody className="tbodyCode">
                        <tr>
                            <th scope="row" >1</th>
                            <td ><a className="questTitle" href="/code">Two Sums</a></td>
                            <td className=""><span><a className="fa fa-book questSol" aria-hidden="true" href="#"></a></span></td>
                            <td className=""><span className=" diffMod badge  ">Medium</span></td>
                            <td>53.4 %</td>
                            <td>
                                <span>
                                    < a className="fa fa-pencil-square operation-E mr-3 " aria-hidden="true" href="#"></a>
                                </span>
                                <span>
                                    < a className="fa fa-trash operation-D" aria-hidden="true" href="#"></a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" >2</th>
                            <td ><a className="questTitle" href="/code">Add Two Numbers</a></td>
                            <td className=""><span><a className="fa fa-book questSol" aria-hidden="true" href="#"></a></span></td>
                            <td className=""><span className=" diffEasy badge bg-success ">Easy</span></td>
                            <td>75.7 %</td>
                            <td>
                                <span>
                                    < a className="fa fa-pencil-square operation-E  mr-3" aria-hidden="true" href="#"></a>
                                </span>
                                <span>
                                    < a className="fa fa-trash operation-D" aria-hidden="true" href="#"></a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" >3</th>
                            <td ><a className="questTitle" href="/code">Largest Substring Without Representing Characters</a></td>
                            <td className=""><span><a className="fa fa-book questSol" aria-hidden="true" href="#"></a></span></td>
                            <td className=""><span className=" diffEasy badge bg-danger ">Hard</span></td>
                            <td>50.7 %</td>
                            <td>
                                <span>
                                    < a className="fa fa-pencil-square operation-E mr-3 " aria-hidden="true" href="#"></a>
                                </span>
                                <span>
                                    < a className="fa fa-trash operation-D" aria-hidden="true" href="#"></a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" >4</th>
                            <td ><a className="questTitle" href="/code">Median Of Two Sorted Numbers</a></td>
                            <td className=""><span><a className="fa fa-book questSol" aria-hidden="true" href="#"></a></span></td>
                            <td className=""><span className=" diffMod badge  ">Medium</span></td>
                            <td>40.1 %</td>
                            <td>
                                <span>
                                    < a className="fa fa-pencil-square operation-E mr-3  " aria-hidden="true" href="#"></a>
                                </span>
                                <span>
                                    < a className="fa fa-trash operation-D" aria-hidden="true" href="#"></a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" >5</th>
                            <td ><a className="questTitle" href="/code">Longest Palindrome Substring</a></td>
                            <td className=""><span><a className="  fa fa-book questSol" aria-hidden="true" href="#"></a></span></td>
                            <td className=""><span className=" diffEasy badge bg-danger ">Hard</span></td>
                            <td>34.7 %</td>
                            <td>
                                <span>
                                    < a className="fa fa-pencil-square operation-E  mr-3 " aria-hidden="true" href="#"></a>
                                </span>
                                <span>
                                    < a className="fa fa-trash operation-D" aria-hidden="true" href="#"></a>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="ml-3 ">
                        <Form>
                            <Form.Group controlId="SelectRowsPerpage">
                                <Form.Control as="select" className="dispCode-inputFiled rowsPerPg" >
                                    <option className="optionSelect">10</option>
                                    <option className="optionSelect">25</option>
                                    <option className="optionSelect">50</option>
                                    <option className="optionSelect">100</option>
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </div>
                    <div className="col-4 mt-2 ">
                        <span className="labelRowsPerPg ">rows per page.</span>
                    </div>
                    <div className=" paginatt ">
                        <nav aria-label="Page navigation example" >
                            <ul className="pagination nav2">
                                <li className="">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true" className="pagntColor">&laquo;</span>
                                    </a>
                                </li>
                                <li className=" "><a className="page-link pagntColor" href="#1">1</a></li>
                                <li className="active"><a className="page-link pagntColor " href="#2">2</a></li>
                                <li className=" "><a className="page-link pagntColor " href="#3">3</a></li>
                                <li className="">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true" className="pagntColor">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>

            </div>

        </Container>
    )

}


export default CodeQuestions;