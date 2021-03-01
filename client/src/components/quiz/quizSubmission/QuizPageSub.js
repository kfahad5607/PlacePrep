import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuizQuesSub from './QuizQuesSub';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getQuizSubmission } from '../../../store/actions/quizActions';

const QuizPageSub = (props) => {
    const {
        quiz: { currentSubmission },
        getQuizSubmission,
        match
    } = props;
    const quizSubId = match.params.id;

    useEffect(() => {
        getQuizSubmission(quizSubId);
    }, []);


    return (
        (currentSubmission && currentSubmission.quiz.questions) ?
            (<Container className='mt-3'>
                <Card.Header className='quiz_header'>
                    <Row >
                        <Col lg={9} md={8} sm={7} xs={8} className='quiz_title_col' >
                            <div  >{currentSubmission.quiz.title}</div>
                        </Col>
                        <Col lg={3} md={4} sm={5} xs={4} className='quiz_timer_col' >
                            <span className='time_sec float-right mt-1 pr-1' >{currentSubmission.timeTaken.minutes < 10 ? `0${currentSubmission.timeTaken.minutes}` : currentSubmission.timeTaken.minutes}:{currentSubmission.timeTaken.seconds < 10 ? `0${currentSubmission.timeTaken.seconds}` : currentSubmission.timeTaken.seconds}</span>

                        </Col>
                    </Row>
                </Card.Header>
                <QuizQuesSub key={currentSubmission._id} userAns={currentSubmission.userAnswers} questions={currentSubmission.quiz.questions} quizId={currentSubmission.quiz._id} />
            </Container>)
            :
            <Spinner />
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { getQuizSubmission })(QuizPageSub);
