import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    USER_LOADED_JWT,
    AUTH_ERROR,
    SET_USER_NULL,
    UPDATE_ME,
    UPDATE_ERROR,
    CLEAR_AUTH_ERRORS,
    GET_DETAILS,
    GET_ALL_USERS,
    SET_TEST_DETAILS,
    CLEAR_TEST_DETAILS,
    USER_LOADED_FAILED,
    FILTER_ALL_USERS,
    CLEAR_FILTER_ALL_USERS,
    DELETE_USER,
    UPDATE_USER,
    FOR_PASS_MAIL_SENT,
    CLR_FOR_PASS_MAIL_SENT,
    PASSWORD_RESET,
    CLR_PASSWORD_RESET
} from "../actions/actionTypes";
import axios from "axios";

// Load user
export const loadUser = (verified = false, startCheck = false) => async (dispatch) => {
    if (verified) {
        dispatch({ type: USER_LOADED });
    } else {
        try {
            const res = await axios({
                method: "GET",
                url: "/api/v1/user/me?check=true",
            });
            console.log('useres', res);
            dispatch({
                type: USER_LOADED_JWT,
                payload: res.data.data,
            });
        } catch (err) {
            console.log(err.response);
            if (!startCheck) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.data.message,
                });
            }
            else {
                dispatch({
                    type: USER_LOADED_FAILED
                });
            }
        }
    }
};

export const login = (formdata) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post("/api/v1/user/login", formdata, config);
        console.log('resss', res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data,
        });
        loadUser(true);
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message,
        });
    }
};

export const register = formdata => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post("/api/v1/user/signup", formdata, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.data
        });
        loadUser(true);
    } catch (err) {
        console.log('errhere', err);
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.message
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/user/logout");
        dispatch({
            type: LOGOUT,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const setUserNull = () => (dispatch) => {
    dispatch({
        type: SET_USER_NULL
    });
};

export const updateMe = (data, type) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const url = type === 'password' ? '/api/v1/user/updateMyPassword' : '/api/v1/user/updateMe';
        const res = await axios.patch(url, data, config);
        dispatch({
            type: UPDATE_ME,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: err.response.data.message
        });
    }
};

export const clearErrors = () => ({ type: CLEAR_AUTH_ERRORS });

export const forgotPassword = (email) => async dispatch => {
    try {
        const res = await axios.post(`/api/v1/user/forgotPassword`, { email });
        console.log('respass', res);

        if (res.request.status === 200 && res.request.statusText === 'OK') {
            dispatch({
                type: FOR_PASS_MAIL_SENT
            });
        }

    } catch (err) {
        console.log(err?.response);
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message
        });

    }
};

export const resetPassword = (passwords, token) => async dispatch => {
    try {
        const res = await axios.patch(`/api/v1/user/resetPassword/${token}`, passwords);
        console.log(res);

        if (res.request.status === 200 && res.request.statusText === 'OK') {
            dispatch({
                type: PASSWORD_RESET
            });
        }

    } catch (err) {
        console.log(err?.response);
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message
        });

    }
};

export const getDetails = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/v1/user/getDetails');
        dispatch({
            type: GET_DETAILS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err?.response);
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message
        });
    }
};

export const getAllUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/user/users');
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data.data.users
        });
    } catch (err) {
        console.log(err?.response);
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message
        });
    }
};

export const setTestDetails = (details) => (dispatch) => {
    dispatch({
        type: SET_TEST_DETAILS,
        payload: details
    });
};

export const clearTestDetails = () => (dispatch) => {
    dispatch({
        type: CLEAR_TEST_DETAILS
    });
};

export const updateUser = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.patch(`/api/v1/user/${data.id}`, data, config);
        dispatch({
            type: UPDATE_USER,
            payload: res.data.data.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/v1/user/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const filterUsers = user => async dispatch => {
    dispatch({ type: FILTER_ALL_USERS, payload: user });
};

export const clearUserFilter = () => ({ type: CLEAR_FILTER_ALL_USERS });

export const clearForPassMailSent = () => (dispatch) => {
    dispatch({
        type: CLR_FOR_PASS_MAIL_SENT
    });
};

export const clearPassReset = () => (dispatch) => {
    dispatch({
        type: CLR_PASSWORD_RESET
    });
};
