import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { forgotPassword, clearForPassMailSent } from '../../store/actions/authActions';
import { setAlert } from '../../store/actions/alertActions';

const ResPassModal = (props) => {
    let { auth: { mailSent },
        setAlert,
        clearForPassMailSent,
        forgotPassword,
        ...newProps } = props;

    //   const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (mailSent) {
            clearForPassMailSent();
            setEmail("");
            setAlert('Mail has been sent. Please check your inbox.', 'success');
            props.onHide();
        }

        //eslint-disable-next-line
    }, [mailSent]);

    const handleOnClick = () => {
        forgotPassword(email);
    };


    return (
        <Modal
            {...newProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="resmodal"

        >
            <Modal.Header closeButton style={{ background: "#3b74d8" }}>
                <Modal.Title id="contained-modal-title-vcenter" className="text-white" >
                    Forgot Password
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="quiztitle" >
                    <Form.Control className="quiz-inputFiled" name="title" placeholder="Enter Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button variant='success' onClick={handleOnClick}>Get Mail</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    forgotPassword,
    setAlert,
    clearForPassMailSent
})(ResPassModal);
