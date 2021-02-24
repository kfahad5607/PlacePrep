import {
    GET_CODE_QUESTIONS,
    GET_CODE_QUESTION,
    ADD_CODE_QUESTION,
    DELETE_CODE_QUESTION,
    UPDATE_CODE_QUESTION,
    CODE_QUESTION_ERROR,
    FILTER_CODE_QUESTIONS,
    CLEAR_FILTER,
    CLEAR_CURRENT_CODE_QUESTION,
    RUN_CODE,
    SUBMIT_CODE,
    RESET_CODE,
    CODE_LOADING
} from "../actions/actionTypes";
import axios from "axios";

export const getQuestions = () => async (dispatch) => {
    try {
        dispatch({ type: CODE_LOADING })
        const res = await axios.get("/api/v1/questions");
        dispatch({
            type: GET_CODE_QUESTIONS,
            payload : res.data.data.questions
        });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const getQuestion = (slug) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/v1/questions/${slug}`);
        dispatch({
            type: GET_CODE_QUESTION,
            payload : res.data.data.data
        });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const addQuestion = (question) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post(`/api/v1/questions`,question, config);
        console.log(res.data)
        dispatch({
            type: ADD_CODE_QUESTION,
            payload : res.data.data.data
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const updateQuestion = (question) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.patch(`/api/v1/questions/${question._id}`,question, config);
        dispatch({
            type: UPDATE_CODE_QUESTION,
            payload : res.data.data.data
        });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/v1/questions/${id}`);
        dispatch({
            type: DELETE_CODE_QUESTION,
            payload : id
        });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const runCode = (code) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        // const res = await axios.patch(`/api/v1/questions/`,code, config);
        // dispatch({
        //     type: RUN_CODE,
        //     payload : res.data.data.data
        // });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};
export const submitCode = (code) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        // const res = await axios.patch(`/api/v1/questions/`,code, config);
        // dispatch({
        //     type: SUBMIT_CODE,
        //     payload : res.data.data.data
        // });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const resetCode = () => ({ type: RESET_CODE })

export const clearCurrent = () => ({ type: CLEAR_CURRENT_CODE_QUESTION })

export const filterQuestions = questions => async dispatch => {
    dispatch({ type: FILTER_CODE_QUESTIONS, payload: questions });
};

export const clearFilter = () => ({ type: CLEAR_FILTER })