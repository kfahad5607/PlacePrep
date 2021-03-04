import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./practiceProblem.css";
import slugify from 'slugify';
import MyModal from '../layout/MyModal';
import { Container, Button, Form, Accordion, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    clrPracProbDeleteSuccess,
    filterPracProbTopics,
    clearFilterPracProbTopics,
    clearPracticeProblemErrors
} from '../../store/actions/practiceProblemActions';
import { setAlert } from '../../store/actions/alertActions';

const AptiTopicsTemplate = (props) => {
    // deletePracProbByTopic(title, ele)

    const [modalShow, setModalShow] = useState(false);
    const {
        auth: { user },
        practiceProblem: { isDeleted, filtered },
        topics,
        title,
        setAlert,
        clrPracProbDeleteSuccess,
        filterPracProbTopics,
        clearFilterPracProbTopics
    } = props;

    const text = useRef("");

    useEffect(() => {
        if (isDeleted) {
            setAlert('Topic Deleted', 'success');
            clrPracProbDeleteSuccess();
        }
    }, [isDeleted]);

    useEffect(() => {
        if (filtered === null) {
            text.current = "";
            clearFilterPracProbTopics();
        }
        //eslint-disable-next-line
    }, [filtered]);


    const [titleTopic, setTitleTopic] = useState({
        title: '',
        topic: ''
    });

    const hanndleOnChange = (e) => {
        if (text.current.value !== "") {
            filterPracProbTopics(e.target.value, title);
        } else {
            clearFilterPracProbTopics();
        }
    };

    const handleOnClick = (title, topic) => {
        setTitleTopic({
            title,
            topic
        });
        setModalShow(true);
    };

    const filteredTopics = filtered !== null ? filtered : topics;

    return (
        <Container className="container-problems">
            {/* modal starts here */}
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                titleAndTopic={titleTopic}
            />
            {/* Modal ends here */}
            <Accordion>
                <Accordion.Toggle
                    as={Alert.Link}
                    eventKey="0"
                    style={{ color: "#775ecf" }}
                >
                    <h3 className="text-center mb-3 pt-4 text-capitalize">{title}</h3>
                </Accordion.Toggle>

                <div className="title-border mb-4">
                    <span></span>
                </div>
                <Accordion.Collapse
                    eventKey="0">
                    <>
                        <div className="row mr-2 ml-2">
                            <div className="col-12 ">
                                <Form>
                                    <Form.Group controlId={title} >
                                        <Form.Control className="searchField" onChange={hanndleOnChange} ref={text} type="text" placeholder="Search Topics" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                        <hr className="hr-1 pb-2"></hr>

                        <div className="Topics pb-4">

                            {/* Topics component starts here */}
                            {filteredTopics.map((ele, index) =>
                                <div key={index} className="row topic mb-3 pb-2 pt-2">
                                    <div className="col-sm-6 topic-left">
                                        <h5 className="topic-name">{ele}</h5>
                                    </div>
                                    <div className="col-sm-6 ">
                                        <div className="topic-right">
                                            {(user.role === 'faculty' || user.role === 'admin') &&
                                                <span onClick={() => handleOnClick(title, ele)} style={{ cursor: 'pointer' }} >
                                                    <i className="fa fa-trash operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                                                </span>}
                                            <Link to={`/practiceproblems/${slugify(title, { lower: true })}/${slugify(ele, { lower: true })}`} >
                                                <span>
                                                    <i className="fa fa-chevron-circle-right operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Topics component ends here */}

                            {/* {(user.role === 'faculty' || user.role === 'admin') && <div className="text-center">
                                <Link to="/addtopic"><Button className="Addmore-btn mt-2" >Add More Topics</Button></Link>
                            </div>} */}
                        </div>
                    </>
                </Accordion.Collapse>
            </Accordion>
        </Container >
    );
};

const mapStateToProps = state => ({
    practiceProblem: state.practiceProblem,
    auth: state.auth
});

export default connect(mapStateToProps, {
    setAlert,
    clrPracProbDeleteSuccess,
    filterPracProbTopics,
    clearFilterPracProbTopics
})(AptiTopicsTemplate);