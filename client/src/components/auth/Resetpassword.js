import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import '../quiz/quiz.css';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';

function ResetPassword(props) {
    const { token } = props.match.params;

    const [passwords, setPasswords] = useState({
        password: "",
        passwordConfirm: ""
    });
    const handleOnClick = () => {
        props.resetPassword(passwords, token);
        setPasswords({ password: "", passwordConfirm: "" });
    }

    return (
        <Container className="container-quiz">
            <h3 className="text-center  mb-2 pt-4 ">Reset Your Password</h3>
            <div className="title-border mb-4">
                <span></span>
            </div>
            <div className="createquizform pb-1">
                <Form>
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <Form.Group controlId="password" >
                                <Form.Label><b>Password</b></Form.Label>
                                <Form.Control className="quiz-inputFiled" name="password" type="password" placeholder="Enter new password"
                                    value={passwords.password} onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-sm-12">
                            <Form.Group controlId="passwordConfirm" >
                                <Form.Label><b>Confirm Password</b></Form.Label>
                                <Form.Control className="quiz-inputFiled" name="password" type="password" placeholder="Confirm password"
                                    value={passwords.passwordConfirm} onChange={(e) => setPasswords({ ...passwords, passwordConfirm: e.target.value })} />
                            </Form.Group>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="text-center">
                        <Button className="createquiz mb-4" onClick={handleOnClick} >Reset</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}
export default connect(null, { resetPassword })(ResetPassword);