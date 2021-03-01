import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./dashboard.css";
import DashboardCard from "./DashboardCard";
import { connect } from "react-redux";
import { getQuizzes } from "../../store/actions/quizActions";
import { getQuestions } from "../../store/actions/codeActions";

const Dashboard = (props) => {
    const {
        auth: { user },
        quiz: { quizzes },
        code: { questions },
        getQuizzes,
        getQuestions,
    } = props;

    useEffect(() => {
        getQuizzes();
        getQuestions();
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
                        btnType="pbtnQ"
                    />
                    <DashboardCard
                        title="Logical reasoning"
                        text="See some examples of logical reasoning and enhance your logical reasoning skills."
                        imgSrc="logic1.jpg"
                        btnType="pbtnL"
                    />
                    <DashboardCard
                        title="Verbal Ability"
                        text="See some amazing examples of verbal ability and enhance your communication skills."
                        imgSrc="verbal1.jpg"
                        btnType="pbtnV"
                    />
                </div>

                {/* tablestarts here */}

                
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    code: state.code,
    auth: state.auth,
});

export default connect(mapStateToProps, { getQuizzes, getQuestions })(
    Dashboard
);
