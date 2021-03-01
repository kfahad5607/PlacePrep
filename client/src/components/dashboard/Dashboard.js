import React, { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import "./dashboard.css";
import DashboardCard from "./DashboardCard";
import { connect } from "react-redux";
import { getQuizzes } from "../../store/actions/quizActions";
import { getQuestions } from "../../store/actions/codeActions";
import { getDetailsAndUsers } from "../../store/actions/authActions";

const Dashboard = (props) => {
    const {
        auth: { user },
        quiz: { quizzes },
        code: { questions },
        getQuizzes,
        getQuestions,
        getDetailsAndUsers
    } = props;

    useEffect(() => {
        // getQuizzes();
        // getQuestions();
        getDetailsAndUsers(user?.role === 'student' ? true : false);
        //eslint-disable-next-line
    }, []);
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
                                <h6 className=" mb-0 text-white ">Quizzes</h6>
                            </div>
                            <div className="card-footer cardFooter ">
                                <span className="footerInfo ">
                                    {user.role === "student"
                                        ? "Attempted : "
                                        : "Total : "}
                                    <span>3 / 12</span>{" "}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-primary cardBtn1 setting "
                                >
                                    See Quiz
                                </button>
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
                                <span className="footerInfo ">
                                    {user.role === "student"
                                        ? "Attempted : "
                                        : "Total : "}{" "}
                                    <span>1 / 20</span>{" "}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-primary cardBtn2 setting "
                                >
                                    Questions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="pb-4 hr-m"></hr>

                <div className="row ">
                    <DashboardCard
                        title="Quantitative Analysis"
                        text="See some examples of Quantitative analysis and enhance your problem solving skills."
                        imgSrc="bulb1.jpg"
                    />
                    <DashboardCard
                        title="Logical reasoning"
                        text="See some examples of logical reasoning and enhance your logical reasoning skills."
                        imgSrc="logic1.jpg"
                    />
                    <DashboardCard
                        title="Verbal Ability"
                        text="See some amazing examples of verbal ability and enhance your communication skills."
                        imgSrc="verbal1.jpg"
                    />
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
                    <table className="table table-bordered table-striped tbr text-center mb-3">
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
                                <th scope="row" className="pad-td">
                                    1
                                </th>
                                <td className="pad-td">Mark Otto</td>
                                <td className="pad-td">Markotto@example.com</td>
                                <td>
                                    <Form>
                                        <Form.Group controlId="SelectRole">
                                            <Form.Control
                                                as="select"
                                                name="pageSize"
                                                className="roledrop"
                                            >
                                                <option className="optionSelect">
                                                    Student{" "}
                                                </option>
                                                <option className="optionSelect">
                                                    {" "}
                                                    Faculty
                                                </option>
                                                <option className="optionSelect">
                                                    Admin{" "}
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <span>
                                        <a
                                            className="fa fa-trash operation-D pt-2"
                                            aria-hidden="true"
                                            href="#"
                                        ></a>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="pad-td">
                                    2
                                </th>
                                <td className="pad-td">jacob Oram</td>
                                <td className="pad-td">jacob@example.com</td>
                                <td>
                                    <Form>
                                        <Form.Group controlId="SelectRole">
                                            <Form.Control
                                                as="select"
                                                name="pageSize"
                                                className="roledrop"
                                            >
                                                <option className="optionSelect">
                                                    Student{" "}
                                                </option>
                                                <option className="optionSelect">
                                                    {" "}
                                                    Faculty
                                                </option>
                                                <option className="optionSelect">
                                                    Admin{" "}
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <span>
                                        <a
                                            className="fa fa-trash operation-D pt-2"
                                            aria-hidden="true"
                                            href="#"
                                        ></a>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="pad-td">
                                    3
                                </th>
                                <td className="pad-td">Larry Wheels</td>
                                <td className="pad-td">larry@example.com</td>
                                <td>
                                    <Form>
                                        <Form.Group controlId="SelectRole">
                                            <Form.Control
                                                as="select"
                                                name="pageSize"
                                                className="roledrop"
                                            >
                                                <option className="optionSelect">
                                                    Student{" "}
                                                </option>
                                                <option className="optionSelect">
                                                    {" "}
                                                    Faculty
                                                </option>
                                                <option className="optionSelect">
                                                    Admin{" "}
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <span>
                                        <a
                                            className="fa fa-trash operation-D pt-2"
                                            aria-hidden="true"
                                            href="#"
                                        ></a>
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
                                    <option value={10} className="optionSelect">
                                        10
                                    </option>
                                    <option value={25} className="optionSelect">
                                        25
                                    </option>
                                    <option value={50} className="optionSelect">
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
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    code: state.code,
    auth: state.auth,
});

export default connect(mapStateToProps, { getQuizzes, getQuestions, getDetailsAndUsers })(
    Dashboard
);
