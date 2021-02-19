import {
    GET_CODE_QUESTIONS,
    GET_CODE_QUESTION,
    ADD_CODE_QUESTION,
    DELETE_CODE_QUESTION,
    UPDATE_CODE_QUESTION,
    CODE_QUESTION_ERROR
} from "../actions/actionTypes";
import axios from "axios";

export const getQuestions = () => async (dispatch) => {
    try {
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

export const getQuestion = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/v1/questions/${id}`);
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