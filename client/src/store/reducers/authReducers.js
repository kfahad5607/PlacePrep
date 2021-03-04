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
    SET_USER_FROM_START_QUIZ,
    UPDATE_ME,
    UPDATE_ERROR,
    CLEAR_AUTH_ERRORS,
    GET_DETAILS,
    GET_ALL_USERS,
    SET_TEST_DETAILS,
    CLEAR_TEST_DETAILS,
    USER_LOADED_FAILED
} from "../actions/actionTypes";

const initialState = {
    isAuthenticated: null,
    user: null,
    allUsers: null,
    details: null,
    testDetails: null,
    error: null,
    loading: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case USER_LOADED_JWT:
        case UPDATE_ME:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                loading: false,
                error: null,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case SET_USER_NULL:
            return {
                ...state,
                user: null,
            };
        case SET_USER_FROM_START_QUIZ:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case UPDATE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                error: null,
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload,
                loading: false
            };
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
                loading: false
            };
        case SET_TEST_DETAILS:
            return {
                ...state,
                testDetails: action.payload
            };
        case CLEAR_TEST_DETAILS:
            return {
                ...state,
                testDetails: null
            };
        case USER_LOADED_FAILED:
            return {
                ...state,
                user: {}
            };
        default:
            return state;
    }
};

export default reducer;
