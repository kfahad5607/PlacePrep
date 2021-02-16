import React from 'react';
import './styles.css';
import { Route } from 'react-router-dom';
import UserProfile from '../auth/UserProfile';
import CreateQuiz from '../quiz/CreateQuiz';
import Coding from '../coding/Coding';
import CodeQuestions from '../coding/CodeQuestions';
import CreateCodeQuestion from '../code/CreateCodeQues';
import QuizCard from '../quiz/QuizCard';
import QuizPage from '../quiz/QuizPage';
import PrivateRoute from '../routing/PrivateRoute'

const MainView = () => {
    return (
        <div className='mainview-container'>
            <PrivateRoute exact path="/me" component={UserProfile} />
            <PrivateRoute exact path="/createQuiz" component={CreateQuiz} />
            <PrivateRoute exact path="/code" component={Coding} />
            <PrivateRoute exact path="/codeQuestions" component={CodeQuestions} />
            <PrivateRoute exact path="/createCodeQuestion" component={CreateCodeQuestion} />
            <PrivateRoute exact path="/quizzes" component={QuizCard} />
            <PrivateRoute exact path="/quiz" component={QuizPage} />
        </div>
    );
};

export default MainView;
