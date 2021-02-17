import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './quiz.css';
import { connect } from 'react-redux';
import {
    updateQuiz,
    deleteQuiz,
    startQuiz
} from '../../store/actions/quizActions';

const QuizCard = (props) => {
    const { quizObj,
        updateQuiz,
        deleteQuiz,
        startQuiz } = props;
    return (
        <Card className='quiz_card'>
            <Card.Header className='quiz_card_header text-center'>
                <h3>{quizObj.title}</h3>
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
                            <td>{quizObj.category}</td>
                            <td>{quizObj.topic}</td>
                            <td>{quizObj.questions.length}</td>
                            <td>{quizObj.duration} Minutes</td>
                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </Table>

                <div className='text-center' >
                    <Link to={`/quiz/${quizObj.slug}`} onClick={()=> startQuiz(quizObj._id)} className="btn btn-primary start_quiz_btn mr-2" >Start Quiz</Link>
                    <Link to={`/editQuiz/${quizObj.slug}`} className="btn btn-primary start_quiz_btn mr-2" >Edit</Link>
                    <button onClick={() => deleteQuiz(quizObj._id)} className="btn btn-primary start_quiz_btn mr-2" >Delete</button>
                    <button onClick={() => updateQuiz({ _id: quizObj._id, active: !quizObj.active })} className="btn btn-primary start_quiz_btn mr-2" >{quizObj.active ? 'Deactivate' : 'Activate'}</button>
                </div>
            </Card.Body>
            <Card.Footer className='quiz_card_footer' style={{ backgroundColor: 'white' }}>
                <label htmlFor="name">Uploader: {quizObj.author ? quizObj.author : 'Fahad Khan'}</label>
                <label htmlFor="name" style={{ float: 'right' }}>Last updated on {new Date(quizObj.createdAt).toLocaleString('en-us', { day: '2-digit', month: 'long', year: 'numeric' })}</label>
            </Card.Footer>
        </Card>
    );
};

const mapStateToProps = state => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, {
    updateQuiz,
    deleteQuiz,
    startQuiz
})(QuizCard);