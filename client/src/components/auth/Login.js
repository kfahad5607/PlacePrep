import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { connect } from "react-redux";
import { login, clearErrors } from "../../store/actions/authActions";
import { setAlert } from "../../store/actions/alertActions";
import ResPassModal from './ResPassModal';

const Login = (props) => {
    
    const { login, setAlert, clearErrors } = props;
    const { error, isAuthenticated } = props.auth;

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error) {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const messageContent = {
        title: "New here ?",
        message:
            "SignUp and start your journey of campus placements preparations with your own campus faculties.",
        btnLink: "/register",
        btnName: "Sign up",
    };

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please enter all fields", "danger");
        } else {
            login({
                email,
                password,
            });
        }
    };
    return (
        <div className="credentials-section">
            <ResPassModal show={modalShow} onHide={() => setModalShow(false)} />

            <Row className="login-container">
                <Col className="panel-container">
                    <MessagePanel content={messageContent} />
                </Col>
                <Col className="form-container">
                    <div className="sign-in-form">
                        <form
                            className="sign-in-form auth-form"
                            onSubmit={handleOnSubmit}
                        >
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fa fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fa fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Login"
                                className="btn-login solid"
                            />
                            <div className="forgot-password">
                                <p onClick={() => setModalShow(true)}>
                                    Forgot Password?
                                </p>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { login, setAlert, clearErrors })(
    Login
);
