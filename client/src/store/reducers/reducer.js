import { combineReducers } from 'redux';
import authReducers from './authReducers';
import alertReducers from './alertReducers';
import codeReducers from './codeReducers';
import quizReducers from './quizReducers';
import practiceProblemReducers from './practiceProblemReducers';

export default combineReducers({
    alert : alertReducers,
    auth: authReducers,
    code: codeReducers,
    quiz: quizReducers,
    practiceProblem: practiceProblemReducers
});