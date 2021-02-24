import React, { useEffect } from 'react';
import QuizCard from './QuizCard';
import Spinner from '../layout/Spinner';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuizzes } from '../../store/actions/quizActions';

const QuizCardPage = (props) => {
    const {
        auth: { user },
        quiz: { quizzes, loading: quizLoading }, getQuizzes } = props;

    useEffect(() => {
        if (user?.role === 'faculty' || user?.role === 'admin') {
            // getQuizzes(user._id);
            getQuizzes();

        }
        else if (user?.role === 'student') {
            getQuizzes();
        }
        return () => {

        };
    }, []);
    // }, [user]);

    if (quizzes !== null && quizzes.length === 0) {
        return <h4>Currently There are No Quizzes Available</h4>;
    }

    return (
        <>
            {quizzes ? quizzes.map((ele) => <QuizCard key={ele._id} quizObj={ele} />)
                : <Spinner />
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    auth: state.auth
});

export default connect(mapStateToProps, { getQuizzes })(QuizCardPage);
