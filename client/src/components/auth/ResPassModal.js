import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { forgotPassword } from '../../store/actions/authActions';

const ResPassModal = (props) => {
    //   let { titleAndTopic, deletePracProbByTopic, ...newProps } = props;

    //   const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState('');

    const handleOnClick = () => {
        props.forgotPassword(email);
        props.onHide();
        setEmail("");
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Forgot Password
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h3>{titleAndTopic.title}</h3> */}
                {/* <p>
          To delete all the questions from <b>{titleAndTopic.topic}</b> type <b>'{titleAndTopic.topic}'</b>
        </p> */}
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

// const mapStateToProps = state => ({
//   practiceProblem: state.practiceProblem
// });

export default connect(null, { forgotPassword })(ResPassModal);
