import React from 'react';
import './styles.css';
import { Route } from 'react-router-dom';
import UserProfile from '../auth/UserProfile';
import CreateQuiz from '../quiz/CreateQuiz';
import Coding from '../coding/Coding';
import CodeQuestions from '../code/CodeQuestions';
import CreateCodeQuestion from '../code/CreateCodeQues';
import QuizCard from '../quiz/QuizCard';
import QuizPage from '../quiz/QuizPage';
import PrivateRoute from '../routing/PrivateRoute'

const MainView = () => {
    return (
        <div className='mainview-container'>
            <Route exact path="/me" component={UserProfile} />
            <Route exact path="/createQuiz" component={CreateQuiz} />
            <Route exact path="/code/:id" component={Coding} />
            <Route exact path="/codeQuestions" component={CodeQuestions} />
            <Route exact path="/createCodeQuestion" component={CreateCodeQuestion} />
            <Route exact path="/quizzes" component={QuizCard} />
            <Route exact path="/quiz" component={QuizPage} />
        </div>
    );
};

export default MainView;
