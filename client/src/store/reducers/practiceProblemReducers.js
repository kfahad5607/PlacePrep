import * as actionTypes from '../actions/actionTypes';

const initialState = {
    questions: [],
    catAndTopic: null,
    current: null,
    filtered: null,
    error: null,
    loading: true

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_PRACTICE_PROBLEMS:
            return {
                ...state,
                questions: action.payload
            };
        case actionTypes.GET_PRACTICE_PROBLEM:
            return {
                ...state,
                current: action.payload
            };
        case actionTypes.ADD_PRACTICE_PROBLEM:
            return {
                ...state,
                questions: action.payload
            };
        case actionTypes.UPDATE_PRACTICE_PROBLEM:
            return {
                ...state,
                questions: state.questions.map(ele => ele._id === action.payload._id ? action.payload : ele),
                current: action.payload
            };
        case actionTypes.DELETE_PRACTICE_PROBLEM:
            return {
                ...state,
                questions: state.questions.filter(ele => ele._id !== action.payload)
            };
        case actionTypes.UPDATE_PRACTICE_PROBLEM_TOPIC:
            return {
                ...state
            };
        case actionTypes.PRACTICE_PROBLEM_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.GET_CAT_TOPIC:
            return {
                ...state,
                catAndTopic: action.payload
            };
        default:
            return state;
    }
};

export default reducer;