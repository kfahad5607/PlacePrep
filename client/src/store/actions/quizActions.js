import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

// Load user
export const getQuizzes = () => async (dispatch) => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log('res', res);
        console.log('disp', dispatch)
        dispatch({
            type: actionTypes.GET_QUIZZES,
            payload: res.data
        });
    } catch (err) {
        console.log('err', err);
    }
};