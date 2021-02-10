import React, {useState} from "react";
import { Row, Col } from "react-bootstrap";
import MessagePanel from "./MessagePanel";

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const messageContent = {
        title: "One of us ?",
        message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad.",
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
        console.log(user);
    };

    return (
        <div className="credentials-section">
            <Row className="login-container sign-up">
                <Col className="form-container">
                    <div className="sign-up-form">
                        <form
                            className="sign-up-form"
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
                                    name="confirmPassword"
                                    value={confirmPassword}
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

export default Register;