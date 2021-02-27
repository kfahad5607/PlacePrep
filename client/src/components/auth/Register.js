import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { connect } from "react-redux";
import { register, clearErrors } from "../../store/actions/authActions";
import { setAlert } from "../../store/actions/alertActions";

const Register = (props) => {
    const { register, setAlert, clearErrors } = props;
    const { error, isAuthenticated } = props.auth;

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
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const { name, email, password, passwordConfirm } = user;

    const messageContent = {
        title: "One of us ?",
        message:
            "Stop roaming around, login here and get quality content for your campus drives managed by your own staff.",
        btnLink: "/login",
        btnName: "Sign in",
    };

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            passwordConfirm === ""
        ) {
            setAlert("Please enter all fields", "danger");
        } else if (password !== passwordConfirm) {
            setAlert("Password do not match", "danger");
        } else {
            register({
                name,
                email,
                password,
                passwordConfirm,
            });
        }
    };

    return (
        <div className="credentials-section">
            <Row className="login-container sign-up">
                <Col className="form-container">
                    <div className="sign-up-form">
                        <form
                            className="sign-up-form auth-form"
                            onSubmit={handleOnSubmit}
                        >
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fa fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fa fa-envelope"></i>
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
                            <div className="input-field">
                                <i className="fa fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Sign up"
                                className="btn-login solid"
                            />
                        </form>
                    </div>
                </Col>
                <Col className="panel-container">
                    <MessagePanel content={messageContent} />
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { register, setAlert, clearErrors })(
    Register
);
