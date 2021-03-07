import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PracticeQuizQues from './PracticeQuizQues';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import {
    getPracticeProblems,
    clrPracProbDeleteSuccess,
    filterPracProbs,
    clearFilterPracProbs
} from '../../store/actions/practiceProblemActions';
import { setAlert } from '../../store/actions/alertActions';

const QuizPage = (props) => {
    const {
        practiceProblem: { questions, isDeleted, filteredQuestions },
        getPracticeProblems,
        clrPracProbDeleteSuccess,
        setAlert,
        filterPracProbs,
        clearFilterPracProbs,
        match
    } = props;
    const { categorySlug, topicSlug } = match.params;
    const [query, setQuery] = useState('');

    useEffect(() => {
        getPracticeProblems(categorySlug, topicSlug);
        // loadUser(false, true);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isDeleted) {
            setAlert('Problem Deleted', 'success');
            clrPracProbDeleteSuccess();
        }
        
        //eslint-disable-next-line
    }, [isDeleted]);

    useEffect(() => {
        if (filteredQuestions === null) {
            setQuery('');
            clearFilterPracProbs();
        }

        //eslint-disable-next-line
    }, [filteredQuestions]);

    const handleOnChange = (e) => {
        setQuery(e.target.value);

        if (e.target.value !== "") {
            filterPracProbs(e.target.value);
        }
        else {
            clearFilterPracProbs();
        }
    };

    const filtered = filteredQuestions ? filteredQuestions : questions;

    return (
        <>
            { questions ?
                (<Container className='mt-3'>
                    <Card.Header className='quiz_header'>
                        <Row >
                            <Col lg={9} md={8} sm={7} xs={8} className='quiz_title_col' >
                                <div  >{questions[0]?.topic}</div>
                            </Col>
                        </Row>
                    </Card.Header>
                    <div className="row mt-3">
                        <div className="col-12 ">
                            <Form>
                                <Form.Group controlId='question' >
                                    <Form.Control
                                        className="searchField"
                                        onChange={handleOnChange}
                                        value={query}
                                        type="text"
                                        placeholder="Search Questions"
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <PracticeQuizQues key={0} questions={filtered} />
                </Container>)
                :
                <Spinner />
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    practiceProblem: state.practiceProblem,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getPracticeProblems,
    clrPracProbDeleteSuccess,
    setAlert,
    filterPracProbs,
    clearFilterPracProbs
})(QuizPage);
