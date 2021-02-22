import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PracticeQuizQues from './PracticeQuizQues';
import QuizTimer from '../quiz/QuizTimer';
import { connect } from 'react-redux';
import { getPracticeProblems } from '../../store/actions/practiceProblemActions';
import { loadUser } from '../../store/actions/authActions';

const QuizPage = (props) => {
    const {
        practiceProblem: { questions },
        auth: { user },
        loadUser,
        getPracticeProblems,
        match
    } = props;
    const slug = match.params.slug;

    useEffect(() => {
        getPracticeProblems(slug);
        // loadUser(false, true);
    }, []);


    return (
        questions ?
            (<Container className='mt-3'>
                <Card.Header className='quiz_header'>
                    <Row >
                        <Col lg={9} md={8} sm={7} xs={8} className='quiz_title_col' >
                            <div  >{questions[0]?.topic}</div>
                        </Col>
                        {/* <Col lg={3} md={4} sm={5} xs={4} className='quiz_timer_col' >
                           {user && <QuizTimer endAt={user.testWillEndAt} />}
                        </Col> */}
                    </Row>
                </Card.Header>
                <PracticeQuizQues key={0} questions={questions} />
                {/* <div className="text-center" style={{ width: '200px', margin: 'auto' }}>
                    <Button className="createquiz mb-4" type="submit"  >Submit Quiz</Button>
                </div> */}
            </Container>)
            :
            <h3>Loading...</h3>
    );
};

const mapStateToProps = (state) => ({
    practiceProblem: state.practiceProblem,
    auth: state.auth
});

export default connect(mapStateToProps, { getPracticeProblems, loadUser })(QuizPage);
