import React, { useEffect } from 'react';
import QuizCard from './QuizCard';
import { connect } from 'react-redux';
import { getQuizzes } from '../../store/actions/quizActions';

const QuizCardPage = (props) => {
    const {
        auth: { user },
        quiz: { quizzes }, getQuizzes } = props;

    useEffect(() => {
        if (user?.role === 'faculty') {
            getQuizzes(user._id);
        }
        else if (user?.role === 'student') {
            getQuizzes();
        }
    }, [user]);

    return (
        <>
            {quizzes.length === 0 ?
                <h3>No quizzes available</h3> :
                quizzes.map((ele) => <QuizCard key={ele._id} quizObj={ele} />)}
        </>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    auth: state.auth
});

export default connect(mapStateToProps, { getQuizzes })(QuizCardPage);
