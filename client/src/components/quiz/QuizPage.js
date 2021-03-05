import React, { useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuizQues from './QuizQues';
import QuizTimer from './QuizTimer';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getQuiz, submitQuiz } from '../../store/actions/quizActions';

const QuizPage = (props) => {
    const quizQuesRef = useRef(null);

    const {
        quiz: { current },
        auth: { user },
        getQuiz,
        match
    } = props;
    const slug = match.params.slug;

    useEffect(() => {
        getQuiz(slug);
        // loadUser(false, true);

        // eslint-disable-next-line
    }, []);


    return (
        current ?
            (<Container className='mt-3'>
                <Card.Header className='quiz_header'>
                    <Row >
                        <Col lg={9} md={8} sm={7} xs={8} className='quiz_title_col' >
                            <div  >{current.title}</div>
                        </Col>
                        <Col lg={3} md={4} sm={5} xs={4} className='quiz_timer_col' >
                            {user && <QuizTimer endAt={user.testWillEndAt} triggerSubmit={() => quizQuesRef.current.click()} />}
                        </Col>
                    </Row>
                </Card.Header>
                <QuizQues key={current._id} questions={current.questions} refProp={quizQuesRef} quizId={current._id} />
            </Container>)
            :
            <Spinner />
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    auth: state.auth
});

export default connect(mapStateToProps, { getQuiz, submitQuiz })(QuizPage);
