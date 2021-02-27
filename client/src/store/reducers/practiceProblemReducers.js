import * as actionTypes from '../actions/actionTypes';

const initialState = {
    questions: null,
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
        case actionTypes.DELETE_PRAC_PROB_BY_TOPIC:
            let index = state.catAndTopic.distinctCategory.indexOf(action.payload.category);
            console.log('inx', index);
            return {
                ...state,
                catAndTopic: {
                    ...state.catAndTopic,
                    distinctTopicByCat: state
                        .catAndTopic
                        .distinctTopicByCat
                        .map((ele, idx) => idx === index ? (state.catAndTopic.distinctTopicByCat[index].filter(ele => ele !== action.payload.topic)) : ele)
                }
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
        case actionTypes.CLEAR_PRACTICE_PROBLEM_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default reducer;