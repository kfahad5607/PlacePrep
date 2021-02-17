import * as actionTypes from '../actions/actionTypes';

const initialState = {
    quizzes: [],
    current: null,
    filtered: null,
    error: null,
    score: null,
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload
            };

        case actionTypes.GET_QUIZ:
            return {
                ...state,
                current: action.payload
            };

        case actionTypes.ADD_QUIZ:
            return {
                ...state,
                quizzes: [action.payload, ...state.quizzes]
            };

        case actionTypes.UPDATE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.map((ele) => ele._id === action.payload._id ? action.payload : ele),
                current: action.payload
            };

        case actionTypes.DELETE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.filter(ele => ele._id !== action.payload)
            };

        case actionTypes.DELETE_QUIZ_QUESTION:
            return {
                ...state,
                current: {
                    ...state.current, questions: state
                        .current
                        .questions.filter(ele => ele._id !== action.payload)
                }
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
                error: action.payload
            };

        case actionTypes.START_QUIZ:
            return {
                ...state,
                current: action.payload
            }
        default:
            return state;
    }
};

export default reducer;