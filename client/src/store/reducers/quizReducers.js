import * as actionTypes from '../actions/actionTypes';

const initialState = {
    quizzes: null,
    submissions: null,
    currentSubmission: null,
    current: null,
    filtered: null,
    error: null,
    score: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING_QUIZ:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload,
                loading: false
            };

        case actionTypes.GET_QUIZ:
            return {
                ...state,
                current: action.payload,
                loading: false
            };

        case actionTypes.ADD_QUIZ:
            return {
                ...state,
                quizzes: [action.payload, ...state.quizzes],
                loading: false
            };

        case actionTypes.UPDATE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.map((ele) => ele._id === action.payload._id ? action.payload : ele),
                current: action.payload,
                loading: false
            };

        case actionTypes.DELETE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.filter(ele => ele._id !== action.payload),
                loading: false
            };

        case actionTypes.DELETE_QUIZ_QUESTION:
            return {
                ...state,
                current: {
                    ...state.current, questions: state
                        .current
                        .questions.filter(ele => ele._id !== action.payload)
                },
                loading: false
            };
        case actionTypes.SET_CURRENT_QUIZ:
            return {
                ...state,
                current: action.payload,
                loading: false
            };

        case actionTypes.QUIZ_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case actionTypes.START_QUIZ:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case actionTypes.SUBMIT_QUIZ:
            return {
                ...state,
                currentSubmission: action.payload,
                loading: false
            };
        case actionTypes.GET_QUIZ_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload,
                loading: false
            };
        case actionTypes.GET_QUIZ_SUBMISSION:
            return {
                ...state,
                currentSubmission: action.payload,
                loading: false
            };
        case actionTypes.DELETE_QUIZ_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.filter(ele => ele._id !== action.payload),
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;