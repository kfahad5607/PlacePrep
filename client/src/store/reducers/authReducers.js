import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    USER_LOADED_JWT,
    AUTH_ERROR,
    UPDATE_ME,
    UPDATE_ERROR,
    AUTH_LOADING
    // CLEAR_ERRORS,
} from "../actions/actionTypes";

const initialState = {
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
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case UPDATE_ERROR:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
};

export default reducer;
