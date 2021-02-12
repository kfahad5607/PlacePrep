import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuizQues from './QuizQues';

const QuizPage = () => {
    return (
        <Container className='mt-3'>
            <Card.Header className='quiz_header'>
                <Row >
                    <Col lg={9} md={8} sm={7} xs={8} className='quiz_title_col' >
                        <div  >Quiz for aptitude training</div>
                    </Col>
                    <Col lg={3} md={4} sm={5} xs={4} className='quiz_timer_col' >
                        {/* <div className='timer float-right' > */}
                        {/* <span className='time_left_txt' >Time Left</span> */}
                        <span className='time_sec float-right mt-1 pr-1' >01:20:35</span>
                        {/* </div> */}
                    </Col>
                </Row>
            </Card.Header>
            <QuizQues />
        </Container>
    );
};

export default QuizPage;
