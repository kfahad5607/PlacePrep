import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Button, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateMe } from "../../store/actions/authActions";

const UserProfile = (props) => {
    const { updateMe } = props;
    const { user, isAuthenticated } = props.auth;

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        photo: ""
    });
    const [userPasswordDetails, setUserPasswordDetails] = useState({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
    });

    useEffect(() => {
        if (isAuthenticated) {
            setUserDetails({
                name: user.name,
                email: user.email,
                photo: ""
            })
        }
    }, [])

    const handleOnChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnImageChange = (e) => {
        setUserDetails({
            ...userDetails,
            photo: e.target.files[0],
        });
    };
    const handleOnChangePassword = (e) => {
        setUserPasswordDetails({
            ...userPasswordDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (userDetails.name === "" || userDetails.email === "") {
            console.log("Please enter all fields", "danger");
        } else {
            updateMe(userDetails,'data')
        }
    };

    const handleOnSubmitPassword = (e) => {
        e.preventDefault();
        if (
            userPasswordDetails.passwordCurrent === "" ||
            userPasswordDetails.password === "" ||
            userPasswordDetails.passwordConfirm === ""
        ) {
            console.log("Please enter all fields", "danger");
        } else if (
            userPasswordDetails.password !== userPasswordDetails.passwordConfirm
        ) {
            console.log("Password do not match", "danger");
        } else {
            updateMe(userPasswordDetails,'password')
        }
        setTimeout(() => {
            setUserPasswordDetails({
                passwordCurrent: "",
                password: "",
                passwordConfirm: "",
            })
        }, 2000);
    };

    return (
        <Container className="container-user">
            <h3 className="text-center mb-3 pt-4 ">YOUR ACCOUNT SETTINGS</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="userform">
                <Form className="">
                    <Form.Group controlId="Name">
                        <Form.Label>
                            <b>Name</b>
                        </Form.Label>
                        <Form.Control
                            className="user-inputFiled"
                            type="name"
                            placeholder="Enter name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                            <b>Email address</b>
                        </Form.Label>
                        <Form.Control
                            className="user-inputFiled mb-4"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={userDetails.email}
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    {/* <p><b>Choose Photo</b></p> */}
                    <div className="row">
                        <div className="col-6">
                            <img
                                src="/profile.jpg"
                                className="profilephoto"
                                alt=""
                            ></img>
                            <input
                                type="file"
                                name="photo"
                                className="photo  "
                                accept="image/*"
                                onChange={handleOnImageChange}
                            ></input>
                            <label className="photolabel">
                                Choose new photo
                            </label>
                        </div>
                        <div className="col-6">
                            <Button
                                className=" savesetting setting mt-4"
                                onClick={handleOnSubmit}
                            >
                                Save settings
                            </Button>
                        </div>
                    </div>
                </Form>
                <hr></hr>
                <h3 className="text-center mt-5 mb-3">PASSWORD CHANGE</h3>
                <div className="title-border mb-4">
                    <span></span>
                </div>
                <Form className="">
                    <Form.Group controlId="currentpassword">
                        <Form.Label>
                            <b>Current password</b>
                        </Form.Label>
                        <Form.Control
                            className="user-inputFiled "
                            type="password"
                            name="passwordCurrent"
                            placeholder="••••••••"
                            value={userPasswordDetails.passwordCurrent}
                            onChange={handleOnChangePassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>
                            <b>New password</b>
                        </Form.Label>
                        <Form.Control
                            className="user-inputFiled"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={userPasswordDetails.password}
                            onChange={handleOnChangePassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>
                            <b>Confirm password</b>
                        </Form.Label>
                        <Form.Control
                            className="user-inputFiled"
                            type="password"
                            name="passwordConfirm"
                            placeholder="••••••••"
                            value={userPasswordDetails.passwordConfirm}
                            onChange={handleOnChangePassword}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button
                            className="savepassword setting mt-2 "
                            onClick={handleOnSubmitPassword}
                        >
                            Save password
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { updateMe})(UserProfile);
