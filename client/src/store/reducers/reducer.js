import { combineReducers } from 'redux';
import authReducers from './authReducers';
import codeReducers from './codeReducers';
import quizReducers from './quizReducers';
import practiceProblemReducers from './practiceProblemReducers';

export default combineReducers({
    auth: authReducers,
    code: codeReducers,
    quiz: quizReducers,
    practiceProblem: practiceProblemReducers
});