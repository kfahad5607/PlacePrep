import React from 'react';
import './styles.css';
import { Route } from 'react-router-dom';
import UserProfile from '../auth/UserProfile';
import CreateQuiz from '../quiz/CreateQuiz';
import EditQuiz from '../quiz/EditQuiz';
import Coding from '../coding/Coding';
import CodeQuestions from '../coding/CodeQuestions';
import CreateCodeQuestion from '../code/CreateCodeQues';
import QuizPage from '../quiz/QuizPage';
import QuizCardPage from '../quiz/QuizCardPage';
import Navbar from '../layout/Navbar';


const MainView = () => {
    return (
        <div className='mainview-container'>
            <Navbar />
            <Route exact path="/me" component={UserProfile} />
            <Route exact path="/createQuiz" component={CreateQuiz} />
            <Route exact path="/editQuiz/:slug" component={EditQuiz} />
            <Route exact path="/code" component={Coding} />
            <Route exact path="/codeQuestions" component={CodeQuestions} />
            <Route exact path="/createCodeQuestion" component={CreateCodeQuestion} />
            <Route exact path="/quizzes" component={QuizCardPage} />
            <Route exact path="/quiz/:slug" component={QuizPage} />
        </div>
    );
};

export default MainView;
