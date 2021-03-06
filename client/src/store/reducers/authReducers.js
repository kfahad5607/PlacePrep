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
    USER_LOADED_FAILED,
    FILTER_ALL_USERS,
    CLEAR_FILTER_ALL_USERS,
    UPDATE_USER,
    DELETE_USER
} from "../actions/actionTypes";

const initialState = {
    isAuthenticated: null,
    user: null,
    allUsers: null,
    filteredUsers: null,
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
        case FILTER_ALL_USERS:
            return {
                ...state,
                filteredUsers: state.allUsers.filter((user) => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return user.name.match(regex) || user.email.match(regex);
                }),
            };
        case CLEAR_FILTER_ALL_USERS:
            return {
                ...state,
                filteredUsers: null,
            };
        case UPDATE_USER:
            return {
                ...state,
                allUsers: state.allUsers?.map((User) =>
                    User._id === action.payload._id ? action.payload : User
                ),
                filteredUsers: state.filteredUsers?.map((User) =>
                    User._id === action.payload._id ? action.payload : User
                ),
                loading: false,
            };
        case DELETE_USER:
            return {
                ...state,
                allUsers: state.allUsers?.filter(
                    (user) => user._id !== action.payload
                ),
                filteredUsers: state.filteredUsers ? state.filteredUsers.filter(
                    (user) => user._id !== action.payload
                ) : null,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
