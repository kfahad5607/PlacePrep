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
    CODE_LOADING,
    CLEAR_CODE_ERRORS,
    SET_USER_CODE_NULL,
    GET_CODE_SUBMISSIONS,
    GET_CODE_SUBMISSION,
    DELETE_CODE_SUBMISSION,
    FILTER_CODE_SUBMISSIONS,
    CLEAR_FILTER_CODE_SUBMISSIONS,
    CODE_CREATED_SUCCESS,
    CLR_CODE_CREATED_SUCCESS,
    CODE_DELETED_SUCCESS,
    CLR_CODE_DELETED_SUCCESS
} from "../actions/actionTypes";
import axios from "axios";

export const getQuestions = () => async (dispatch) => {
    try {
        dispatch({ type: CODE_LOADING });
        const res = await axios.get("/api/v1/questions");
        dispatch({
            type: GET_CODE_QUESTIONS,
            payload: res.data.data.questions
        });
    } catch (err) {
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const getQuestion = (slug, check = false) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/v1/questions/${slug}?check=${check}`);
        console.log('res', res);
        dispatch({
            type: GET_CODE_QUESTION,
            payload: res.data.data.data
        });
    } catch (err) {
        console.log('err', err?.response);
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
        const res = await axios.post(`/api/v1/questions`, question, config);

        if (res.request.status === 201 && res.request.statusText === 'Created') {
            dispatch({
                type: CODE_CREATED_SUCCESS
            });
        }

        dispatch({
            type: ADD_CODE_QUESTION,
            payload: res.data.data.data
        });
    } catch (err) {
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
        const res = await axios.patch(`/api/v1/questions/${question._id}`, question, config);
        console.log('res', res);

        if (res.request.status === 200 && res.request.statusText === 'OK') {
            dispatch({
                type: CODE_CREATED_SUCCESS
            });
        }

        dispatch({
            type: UPDATE_CODE_QUESTION,
            payload: res.data.data.data
        });

    } catch (err) {
        console.log('err', err?.response);
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/v1/questions/${id}`);
        console.log('res', res);

        if (res.request.status === 204 && res.request.statusText === 'No Content') {
            dispatch({
                type: CODE_DELETED_SUCCESS
            });
        }

        dispatch({
            type: DELETE_CODE_QUESTION,
            payload: id
        });
    } catch (err) {
        console.log('err', err);

        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const submitCode = (runObj, id) => async (dispatch) => {
    dispatch({
        type: SET_USER_CODE_NULL
    });
    try {
        const res = await axios.post(`/api/v1/onlineJudge/submitcode/${id}`, runObj);
        console.log('res sub', res);
        dispatch({
            type: SUBMIT_CODE,
            payload: res.data.data
        });
    } catch (err) {
        console.log('err', err?.response);
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const runCode = (runObj) => async (dispatch) => {
    dispatch({
        type: SET_USER_CODE_NULL
    });
    try {
        const res = await axios.post(`/api/v1/onlineJudge/runcode`, runObj);
        console.log('res run', res);
        dispatch({
            type: RUN_CODE,
            payload: res.data.data
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const resetCode = () => ({ type: RESET_CODE });

export const clearCurrent = () => ({ type: CLEAR_CURRENT_CODE_QUESTION });

export const filterQuestions = questions => async dispatch => {
    dispatch({ type: FILTER_CODE_QUESTIONS, payload: questions });
};

export const clearFilter = () => ({ type: CLEAR_FILTER });

export const clearCodeErrors = () => ({ type: CLEAR_CODE_ERRORS });

export const filterCodeSubmissions = (query, isStudent) => (dispatch) => {
    dispatch({
        type: FILTER_CODE_SUBMISSIONS,
        payload: {
            query,
            isStudent
        }
    });
};

export const clearFilterCodeSub = () => (dispatch) => {
    dispatch({
        type: CLEAR_FILTER_CODE_SUBMISSIONS
    });
};

export const getCodeSubmissions = (queryObj) => async (dispatch) => {
    try {
        let queryKey = '';
        let queryVal = '';
        if (queryObj) {
            queryKey = queryObj.user ? 'user' : 'code';
            queryVal = queryObj.user ? queryObj.user : queryObj.code;
        }
        const res = await axios.get(`/api/v1/codeSubmissions?${queryKey}=${queryVal}`);
        console.log('res', res);
        dispatch({
            type: GET_CODE_SUBMISSIONS,
            payload: res.data.data.codeSubmissions
        });

    } catch (err) {
        console.log('err', err);
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const getCodeSubmission = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/v1/codeSubmissions/${id}`);
        console.log('res', res);

        dispatch({
            type: GET_CODE_SUBMISSION,
            payload: res.data.data.data
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const deleteCodeSubmission = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/v1/codeSubmissions/${id}`);

        dispatch({
            type: DELETE_CODE_SUBMISSION,
            payload: id
        });
    } catch (err) {
        console.log('err', err.response);
        dispatch({
            type: CODE_QUESTION_ERROR,
            payload: err.response.data.message || err.response.data.error
        });
    }
};


export const clrCodeCreateSuccess = () => (dispatch) => {
    dispatch({
        type: CLR_CODE_CREATED_SUCCESS
    });
};

export const clrCodeDeleteSuccess = () => (dispatch) => {
    dispatch({
        type: CLR_CODE_DELETED_SUCCESS
    });
};

