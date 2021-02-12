import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { Link } from "react-router-dom";

const Login = () => {
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

    const handleOnChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log(user)
    }
    return (
        <div className="credentials-section">
            <Row className="login-container">
                <Col className="panel-container">
                    <MessagePanel content={messageContent} />
                </Col>
                <Col className="form-container">
                    <div className="sign-in-form">
                        <form className="sign-in-form auth-form" onSubmit={handleOnSubmit}>
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
                            <Link to="/forgotpassword">Forgot Password?</Link>
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

export default Login;