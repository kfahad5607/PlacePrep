import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import './quiz.css';

const QuizCard = () => {

    return (
        <Card className='quiz_card'>
            <Card.Header className='quiz_card_header text-center'>
                <h3>Quantitative Analysis Aptitude</h3>

            </Card.Header>
            <Card.Body>
                <Table className='quiz_card_table text-center' >
                    <thead>
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Topics</th>
                            <th scope="col">Questions</th>
                            <th scope="col">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Quantitative Analysis</td>
                            <td>Train problems, Time and work, Speed distance time, Probability, Average, Ages</td>
                            <td>25</td>
                            <td>1 Hour</td>
                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </Table>

                <div className='text-center' >
                    <a href="#" className="btn btn-primary start_quiz_btn" >Start Quiz</a>
                </div>
            </Card.Body>
            <Card.Footer className='quiz_card_footer' style={{ backgroundColor: 'white' }}>
                <label htmlFor="name">Uploader: Fahad khan</label>
                <label htmlFor="name" style={{ float: 'right' }}>Last updated on Jan 31, 2020</label>
            </Card.Footer>
        </Card>
    );
};

export default QuizCard;