import React, { useEffect, Fragment } from 'react';
import "../../code/CodeQuestDisp.css";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import QuizSubTabRow from './QuizSubTabRow';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getQuizSubmissions, getQuizSubmission } from '../../../store/actions/quizActions';

const QuizSubmissions = (props) => {
    const { auth: { user },
        quiz: { submissions }, getQuizSubmissions, getQuizSubmission, match } = props;

    const { quizId } = match.params;

    useEffect(() => {
        if (user?.role === 'student') {
            getQuizSubmissions({ user: user._id });
        }
        else if (user?.role === 'faculty') {
            getQuizSubmissions({ quiz: quizId });
        }
        return () => {
        };
    }, [user]);

    return (
        <Fragment>

            {submissions !== null ? (<Container className="container-codeQuest">
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
                                <th scope="col">{user?.role === 'student' ? 'Title' : 'Name'}</th>
                                <th scope="col">Submitted At</th>
                                <th scope="col">Time Taken</th>
                                <th scope="col">Score</th>
                                {(user?.role === 'faculty' || user?.role === 'admin') && <th scope="col">Operation</th>}
                            </tr>
                        </thead>
                        <tbody className="tbodyCode">
                            {submissions.map((ele, index) => <QuizSubTabRow key={ele._id} name={ele.user.name} eleObj={ele} idx={index} />)}
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
            </Container>) :
                (
                    <Spinner />
                )
            }
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    auth: state.auth
});

export default connect(mapStateToProps, { getQuizSubmissions, getQuizSubmission })(QuizSubmissions);
