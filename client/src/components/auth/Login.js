import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, loadUser } from "../../store/actions/authActions";

const Login = (props) => {
    const { login, loadUser } = props;
    const { error, isAuthenticated } = props.auth;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error) {
            console.log(error);
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history]);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const messageContent = {
        title: "New here ?",
        message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,ex ratione. Aliquid!",
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
            console.log("Please enter all fields", "danger");
        } else {
            login({
                email,
                password,
            });
            // loadUser()
        }
    };
    return (
        <div className="credentials-section">
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
                            <div className="forgot-password">
                                <Link to="/forgotpassword">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                type="submit"
                                value="Login"
                                className="btn-login solid"
                            />
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

export default connect(mapStateToProps, { login, loadUser })(Login);
