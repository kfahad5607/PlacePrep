import React, { useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import "./dashboard.css";
import DashboardCard from "./DashboardCard";
import DashboardPie from "./DashboardPie";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDetails } from "../../store/actions/authActions";

const Dashboard = (props) => {
    const {
        auth: { user, details },
        getDetails,
    } = props;

    useEffect(() => {
        getDetails();
        //eslint-disable-next-line
    }, []);
    return (
        <Fragment>
            {user !== null && details !== null ? (
                <Container className="container-user">
                    <h3 className="text-center mb-3 pt-4 ">DASHBOARD</h3>
                    <div className="title-border mb-4">
                        <span></span>
                    </div>
                    <div className="userform">
                        {user.role === "student" && <DashboardPie submissions={details.codeSubmissions}/>}
                        <div className="row pb-3 pt-3">
                            <div className="col-md-6 mb-3">
                                <div className="card card1">
                                    <div className="card-header cardHeader1">
                                        <h6 className=" mb-0 text-white ">Quizzes</h6>
                                    </div>
                                    <div className="card-footer cardFooter ">
                                        <span className="footerInfo ">
                                            {user.role === "student" ? (
                                                <b>
                                                    {" "}
                                                    Attempted : {
                                                        details.quizSubmissions
                                                    } / {details.quizzes}
                                                </b>
                                            ) : (
                                                    <b> Total : {details.quizzes}</b>
                                                )}
                                        </span>
                                        <Link
                                            to="/quizzes"
                                            className="btn btn-primary cardBtn1 setting "
                                        >
                                            See Quiz
										</Link>
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
                                            {user.role === "student" ? (
                                                <b>
                                                    {" "}
                                                    Attempted : {
                                                        details.codeSubmissions.total
                                                    } / {details.questions}
                                                </b>
                                            ) : (
                                                    <b> Total : {details.questions}</b>
                                                )}
                                        </span>
                                        <Link
                                            to="/codeQuestions"
                                            className="btn btn-primary cardBtn2 setting "
                                        >
                                            Questions
										</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="pb-4 hr-m"></hr>

                        <div className="row ">
                            <DashboardCard
                                title="Quantitative Analysis"
                                text="See some examples of Quants analysis and enhance your problem solving skills."
                                imgSrc="bulb1.jpg"
                                btnType="pbtnQ"
                                role={user.role}
                            />
                            <DashboardCard
                                title="Logical reasoning"
                                text="See some examples of logical reasoning and enhance your logical reasoning skills."
                                imgSrc="logic1.jpg"
                                btnType="pbtnL"
                                role={user.role}
                            />
                            <DashboardCard
                                title="Verbal Ability"
                                text="See some amazing examples of verbal ability and enhance your communication skills."
                                imgSrc="verbal1.jpg"
                                btnType="pbtnV"
                                role={user.role}
                            />
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
});

export default connect(mapStateToProps, { getDetails })(Dashboard);
