import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getPracticeProblems = (categorySlug, topicSlug) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/v1/aptiquestions?categorySlug=${categorySlug}&topicSlug=${topicSlug}`);
        console.log('res', res);

        dispatch({
            type: actionTypes.GET_PRACTICE_PROBLEMS,
            payload: res.data.data.data
        });

    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const getPracticeProblem = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/v1/aptiquestions/${id}`);
        console.log('res', res);

        dispatch({
            type: actionTypes.GET_PRACTICE_PROBLEM,
            payload: res.data.data.data
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

// Adds practice quizzes
export const addTopic = (apti) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const res = await axios.post('/api/v1/aptiquestions', apti, config);
        console.log('res', res);
        dispatch({
            type: actionTypes.ADD_PRACTICE_PROBLEM,
            payload: res.data.data.data
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const updatePracticeProblem = (pracProb) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const res = await axios.patch(`/api/v1/aptiquestions/${pracProb._id}`, pracProb, config);

        console.log('res', res);
        dispatch({
            type: actionTypes.UPDATE_PRACTICE_PROBLEM,
            payload: res.data.data.data
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const deletePracticeProblem = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/v1/aptiquestions/${id}`);

        dispatch({
            type: actionTypes.DELETE_PRACTICE_PROBLEM,
            payload: id
        });
    } catch (err) {
        console.log('err', err);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const deletePracProbByTopic = (category, topic) => async (dispatch) => {
    try {
        await axios.delete(`/api/v1/aptiquestions/deletemany?category=${category}&topic=${topic}`);
        console.log('catopic', category, topic);
        dispatch({
            type: actionTypes.DELETE_PRAC_PROB_BY_TOPIC,
            payload: {
                category,
                topic
            }
        });
    } catch (err) {
        console.log('err', err);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const getCategoryAndTopic = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/v1/aptiquestions/getdistinctval');

        dispatch({
            type: actionTypes.GET_CAT_TOPIC,
            payload: res.data.data
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const updatePracProbTopic = (topicObj) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        await axios.patch(`/api/v1/aptiquestions/updatetopic`, topicObj, config);

        dispatch({
            type: actionTypes.UPDATE_PRACTICE_PROBLEM_TOPIC
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: actionTypes.PRACTICE_PROBLEM_ERROR,
            payload: err.response.data.message
        });
    }
};

export const clearPracticeProblemErrors = () => ({ type: actionTypes.CLEAR_PRACTICE_PROBLEM_ERROR});