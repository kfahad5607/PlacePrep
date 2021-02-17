import React, { useEffect, useState, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuizQues from './QuizQues';
import PracticeQuizQues from './PracticeQuizQues';
import { connect } from 'react-redux';
import { getQuiz, submitQuiz } from '../../store/actions/quizActions';

const QuizPage = (props) => {
    const { quiz: { current }, getQuiz, submitQuiz, match } = props;
    const slug = match.params.slug;

    useEffect(() => {
        getQuiz(slug);
    }, []);

    let durInSec = Math.round((new Date('2021-02-17T12:40:00.463+00:00').getTime() - new Date().getTime()) / 1000);
    let durMin = Math.floor(durInSec / 60);
    let durSec = durInSec % 60;

    const [timer, setTimer] = useState({
        minutes: durMin,
        seconds: durSec
    });

    useEffect(() => {
        // console.log('durInsec', durInSec, 'durMin', durMin, 'durSec', durSec)
        setTimeout(() => {
            if (timer.seconds - 1 < 0) {
                if (timer.minutes - 1 < 0) {
                    setTimer({
                        minutes: 0,
                        seconds: 0
                    });
                }
                else {
                    setTimer({
                        minutes: timer.minutes - 1,
                        seconds: 59
                    });
                }

            }
            else {
                setTimer({
                    minutes: timer.minutes,
                    seconds: timer.seconds - 1
                });
            }

        }, 1000);
    }, [timer]);


    return (
        current ?
            (<Container className='mt-3'>
                <Card.Header className='quiz_header'>
                    <Row >
                        <Col lg={9} md={8} sm={7} xs={8} className='quiz_title_col' >
                            <div  >{current.title}</div>
                        </Col>
                        <Col lg={3} md={4} sm={5} xs={4} className='quiz_timer_col' >
                            {/* <span className='time_sec float-right mt-1 pr-1' >{current.duration}</span> */}
                            <span className='time_sec float-right mt-1 pr-1' >{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</span>
                        </Col>
                    </Row>
                </Card.Header>
                <QuizQues key={current._id} questions={current.questions} quizId={current._id} />
                {/* <div className="text-center" style={{ width: '200px', margin: 'auto' }}>
                    <Button className="createquiz mb-4" type="submit"  >Submit Quiz</Button>
                </div> */}
            </Container>)
            :
            <h3>Quiz Not Found</h3>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { getQuiz, submitQuiz })(QuizPage);
