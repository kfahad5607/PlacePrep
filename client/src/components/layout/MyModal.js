import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { deletePracProbByTopic } from '../../store/actions/practiceProblemActions';

const MyModal = (props) => {
  let { titleAndTopic, deletePracProbByTopic, ...newProps } = props;

  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState('');

  const handleOnChange = (e) => {
    setText(e.target.value);
    setIsDisabled(true);
    if (e.target.value === titleAndTopic.topic) {
      setIsDisabled(false);
    }

  };

  const handleOnClick = () => {
    deletePracProbByTopic(titleAndTopic.title, titleAndTopic.topic);
    props.onHide();
  };

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Topic
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h3>{titleAndTopic.title}</h3> */}
        <p>
          To delete all the questions from <b>{titleAndTopic.topic}</b> type <b>'{titleAndTopic.topic}'</b>
        </p>
        <Form.Group controlId="quiztitle" >
          <Form.Control className="quiz-inputFiled" name="title" value={text} onChange={handleOnChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button variant='danger' disabled={isDisabled} onClick={handleOnClick}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

// const mapStateToProps = state => ({
//   practiceProblem: state.practiceProblem
// });

export default connect(null, { deletePracProbByTopic })(MyModal);
