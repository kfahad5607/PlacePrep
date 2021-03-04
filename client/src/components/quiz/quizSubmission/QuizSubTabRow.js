import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../store/actions/alertActions';
import { deleteQuizSubmission, clrQuizDeleteSuccess } from '../../../store/actions/quizActions';

const QuizSubTabRow = (props) => {
    const { auth: { user },
        quiz: { isDeleted },
        eleObj,
        idx,
        name,
        deleteQuizSubmission,
        clrQuizDeleteSuccess,
        setAlert } = props;

    useEffect(() => {
        if (isDeleted) {
            console.log('delel', isDeleted);
            setAlert('Quiz Submission Deleted', 'success');
            clrQuizDeleteSuccess();
        }
    }, [isDeleted]);

    return (
        <tr>
            <th scope="row" >{idx + 1}</th>
            {(user.role === 'faculty' || user.role === 'admin') ?
                <td ><Link className="questTitle" to={`/quizSubmission/${eleObj._id}`}>{name}</Link></td>
                :
                <td ><Link className="questTitle" to={`/quizSubmission/${eleObj._id}`}>{eleObj.quiz.title}</Link></td>
            }
            <td ><span>{new Date(eleObj.createdAt).toLocaleString('en-us', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span></td>
            <td ><span className="diffMod badge badge-success">{eleObj.timeTaken.minutes < 10 ? `0${eleObj.timeTaken.minutes}` : eleObj.timeTaken.minutes}:{eleObj.timeTaken.seconds < 10 ? `0${eleObj.timeTaken.seconds}` : eleObj.timeTaken.seconds}</span></td>
            <td>{eleObj.score}</td>
            {(user.role === 'faculty' || user.role === 'admin') && <td >
                <span className='pl-4' style={{ cursor: 'pointer' }} onClick={() => deleteQuizSubmission(eleObj._id)} >
                    <i className="fa fa-trash operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                </span></td>}
        </tr>
    );
};

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        quiz: state.quiz
    });
};

export default connect(mapStateToProps, {
    deleteQuizSubmission,
    clrQuizDeleteSuccess,
    setAlert
})(QuizSubTabRow);
