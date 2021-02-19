import React, { useEffect, Fragment } from "react";
import "./CodeQuestDisp.css";
import { Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { getQuestions } from "../../store/actions/codeActions";
import CodeTableRow from "./codeTableRow";
import Spinner from '../layout/Spinner'

const CodeQuestions = (props) => {
    const { getQuestions } = props;
    const { user } = props.auth;
    const { questions } = props.code;
    useEffect(() => {
        setTimeout(() => {
            getQuestions();
        }, 2000);
        //     eslint-disable-next-line
    }, []);

    if (questions !== null && questions.length === 0) {
        return <h4>Currently There are No Question Available</h4>;
    }
    return (
        <Fragment>
            {questions !== null ? (
                <Container className="container-codeQuest">
                    <h3 className="text-center  mb-2 pt-4 ">
                        Coding Questions
                    </h3>
                    <div className="title-border mb-4">
                        <span></span>
                    </div>
                    <div className="displayQuest pb-2">
                        <div className="row">
                            <div className="col-12 pb-2">
                                <Form>
                                    <Form.Group controlId="codingquestionSearch">
                                        <Form.Control
                                            className=" codingQuestSearch"
                                            type=""
                                            placeholder="Search question titles, descriptions or ID"
                                        />
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
                                {questions.map((question, index) => (
                                    <CodeTableRow
                                        question={question}
                                        key={index}
                                        id={index}
                                        user={user}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="ml-3 ">
                                <Form>
                                    <Form.Group controlId="SelectRowsPerpage">
                                        <Form.Control
                                            as="select"
                                            className="dispCode-inputFiled rowsPerPg"
                                        >
                                            <option className="optionSelect">
                                                10
                                            </option>
                                            <option className="optionSelect">
                                                25
                                            </option>
                                            <option className="optionSelect">
                                                50
                                            </option>
                                            <option className="optionSelect">
                                                100
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                            <span className="labelRowsPerPg mt-2 col-4">
                                rows per page.
                            </span>

                            <div className=" paginatt ">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination nav2">
                                        <li className="">
                                            <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Previous"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="pagntColor"
                                                >
                                                    &laquo;
                                                </span>
                                            </a>
                                        </li>
                                        <li className=" ">
                                            <a
                                                className="page-link pagntColor"
                                                href="#1"
                                            >
                                                1
                                            </a>
                                        </li>
                                        <li className="active">
                                            <a
                                                className="page-link pagntColor "
                                                href="#2"
                                            >
                                                2
                                            </a>
                                        </li>
                                        <li className=" ">
                                            <a
                                                className="page-link pagntColor "
                                                href="#3"
                                            >
                                                3
                                            </a>
                                        </li>
                                        <li className="">
                                            <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Next"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="pagntColor"
                                                >
                                                    &raquo;
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </Container>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    code: state.code,
});

export default connect(mapStateToProps, { getQuestions })(CodeQuestions);
