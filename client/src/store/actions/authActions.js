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
            dispatch({
                type: USER_LOADED_JWT,
                payload: res.data.data,
            });
        } catch (err) {
            if (!startCheck) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.data.message,
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


export const clearErrors = () => ({ type: CLEAR_AUTH_ERRORS});

export const forgotPassword = (email) => async dispatch => {
    try {
        const res = await axios.post(`/api/v1/user/forgotPassword`, { email });
        console.log(res);

    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message
        });

    }
}
export const resetPassword = (passwords, token) => async dispatch => {
    try {
        const res = await axios.patch(`/api/v1/user/resetPassword/${token}`, passwords);
        console.log(res);

    } catch (err) {
        console.log(err?.response);
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message
        });

    }
}

