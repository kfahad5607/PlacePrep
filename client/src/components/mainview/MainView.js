import React from 'react';
import './styles.css';
import UserProfile from '../auth/UserProfile';
import CreateQuiz from '../quiz/CreateQuiz';
import EditQuiz from '../quiz/EditQuiz';
import Coding from '../coding/Coding';
import CodeQuestions from '../coding/CodeQuestions';
import CreateCodeQuestion from '../code/CreateCodeQues';
import QuizPage from '../quiz/QuizPage';
import QuizPageSub from '../quiz/quizSubmission/QuizPageSub';
import QuizCardPage from '../quiz/QuizCardPage';
import PrivateRoute from '../routing/PrivateRoute';
import QuizSubmissions from '../quiz/quizSubmission/QuizSubmissions';
import PracticeProblem from '../practiceProblems/PracticeProblem';
import PracticeQuizPage from '../practiceProblems/PracticeQuizPage';
import AddTopics from '../practiceProblems/AddTopics';
import EditPracticeProblem from '../practiceProblems/EditPracticeProblem';

const MainView = () => {
    return (
        <div className='mainview-container'>
            {/* <Navbar /> */}
            <PrivateRoute exact path="/me" component={UserProfile} />
            <PrivateRoute exact path="/createQuiz" component={CreateQuiz} />
            <PrivateRoute exact path="/editQuiz/:slug" component={EditQuiz} />
            <PrivateRoute exact path="/code/:id" component={Coding} />
            <PrivateRoute exact path="/codeQuestions" component={CodeQuestions} />
            <PrivateRoute exact path="/createCodeQuestion" component={CreateCodeQuestion} />
            <PrivateRoute exact path="/quizzes" component={QuizCardPage} />
            <PrivateRoute exact path="/quiz/:slug" component={QuizPage} />
            <PrivateRoute exact path="/quizSubmissions" component={QuizSubmissions} />
            <PrivateRoute exact path="/quizSubmissions/:quizId" component={QuizSubmissions} />
            <PrivateRoute exact path="/quizSubmission/:id" component={QuizPageSub} />
            <PrivateRoute exact path="/practiceProblems" component={PracticeProblem} />
            <PrivateRoute exact path="/editpracticeProblem/:id" component={EditPracticeProblem} />
            <PrivateRoute exact path="/practiceProblems/:slug" component={PracticeQuizPage} />
            <PrivateRoute exact path="/addTopic" component={AddTopics} />


        </div>
    );
};

export default MainView;
