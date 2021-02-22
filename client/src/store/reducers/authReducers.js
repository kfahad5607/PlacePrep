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
    SET_USER_FROM_START_QUIZ
    // CLEAR_ERRORS,
} from "../actions/actionTypes";

const initialState = {
    token: "getFromCookies",
    isAuthenticated: null,
    user: null,
    error: null,
    loading: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case USER_LOADED_JWT:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
            };
        case SET_USER_NULL:
            return {
                ...state,
                user: null
            };
        case SET_USER_FROM_START_QUIZ:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
