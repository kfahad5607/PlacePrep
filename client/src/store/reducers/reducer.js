import { combineReducers } from 'redux';
import authReducers from './authReducers';
import codeReducers from './codeReducers';
import quizReducers from './quizReducers';
import practiceQuizReducers from './practiceQuizReducers';

export default combineReducers({
    auth: authReducers,
    code: codeReducers,
    quiz: quizReducers,
    practiceQuiz: practiceQuizReducers
});