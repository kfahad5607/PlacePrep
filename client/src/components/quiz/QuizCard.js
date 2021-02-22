import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import './quiz.css';
import { connect } from 'react-redux';
import {
    updateQuiz,
    deleteQuiz,
    startQuiz
} from '../../store/actions/quizActions';
import { loadUser, setUserNull } from '../../store/actions/authActions';

const QuizCard = (props) => {
    const {
        auth: { user },
        quizObj,
        updateQuiz,
        loadUser,
        setUserNull,
        deleteQuiz,
        startQuiz } = props;

    const handleOnClick = () => {
        setUserNull();
        startQuiz(quizObj._id);
        // loadUser(false, true);
    };

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

                {user.role === 'student' &&
                    <div className='text-center' >
                        <Link to={`/quiz/${quizObj.slug}`} onClick={handleOnClick} className="btn btn-primary start_quiz_btn mr-2" >Start Quiz</Link>
                    </div>}

                {(user.role === 'faculty' || user.role === 'admin') &&

                    <div className='text-center' >
                        <Link to={`/editQuiz/${quizObj.slug}`} className="btn btn-primary start_quiz_btn mr-2" >Edit</Link>
                        <button onClick={() => deleteQuiz(quizObj._id)} className="btn btn-primary start_quiz_btn mr-2" >Delete</button>
                        <button onClick={() => updateQuiz({ _id: quizObj._id, active: !quizObj.active })} className="btn btn-primary start_quiz_btn mr-2" >{quizObj.active ? 'Deactivate' : 'Activate'}</button>
                    </div>
                }
            </Card.Body>
            <Card.Footer className='quiz_card_footer' style={{ backgroundColor: 'white' }}>
                {user.role === 'student' &&
                    <label htmlFor="name">Uploader: {quizObj.author ? quizObj.author.name : 'Fahad Khan'}</label>}
                {(user.role === 'faculty' || user.role === 'admin') &&
                    <Link to={`/quizSubmissions/${quizObj._id}`} className='alert-link' style={{ color: '#775ecf' }} >Submissions</Link>}
                <label htmlFor="name" style={{ float: 'right' }}>Last updated on {new Date(quizObj.createdAt).toLocaleString('en-us', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</label>
            </Card.Footer>
        </Card>
    );
};

const mapStateToProps = state => ({
    quiz: state.quiz,
    auth: state.auth
});

export default connect(mapStateToProps, {
    updateQuiz,
    deleteQuiz,
    startQuiz,
    loadUser,
    setUserNull
})(QuizCard);