import * as actionTypes from '../actions/actionTypes';

const initialState = {
    questions: null,
    catAndTopic: null,
    current: null,
    filtered: null,
    error: null,
    isCreated: null,
    isDeleted: null,
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

        case actionTypes.PRAC_PROB_CREATED_SUCCESS:
            return {
                ...state,
                isCreated: true,
                loading: false
            };
        case actionTypes.CLR_PRAC_PROB_CREATED_SUCCESS:
            return {
                ...state,
                isCreated: null,
                loading: false
            };

        case actionTypes.PRAC_PROB_DELETED_SUCCESS:
            return {
                ...state,
                isDeleted: true,
                loading: false
            };
        case actionTypes.CLR_PRAC_PROB_DELETED_SUCCESS:
            return {
                ...state,
                isDeleted: null,
                loading: false
            };
        case actionTypes.UPDATE_PRACTICE_PROBLEM:
            return {
                ...state,
                questions: state.questions?.map(ele => ele._id === action.payload._id ? action.payload : ele),
                current: action.payload
            };
        case actionTypes.DELETE_PRACTICE_PROBLEM:
            return {
                ...state,
                questions: state.questions?.filter(ele => ele._id !== action.payload)
            };
        case actionTypes.DELETE_PRAC_PROB_BY_TOPIC:
            const index = state.catAndTopic.distinctCategory.indexOf(action.payload.category);
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

        case actionTypes.FILTER_PRACTICE_PROBLEMS:
            const idx = state.catAndTopic.distinctCategory.indexOf(action.payload.category);
            const regex = new RegExp(`${action.payload.query}`, "gi");
            return {
                ...state,
                filtered: state.catAndTopic?.distinctTopicByCat.map((ele, eleIdx) => eleIdx === idx ?
                    (ele?.filter(subEle => subEle.match(regex)))
                    : ((state.filtered && state.filtered[eleIdx]) ? state.filtered[eleIdx] : ele)

                )
            };
        case actionTypes.CLEAR_FILTER_PRACTICE_PROBLEMS:
            const catIdx = state.catAndTopic.distinctCategory.indexOf(action.payload);
            return {
                ...state,
                filtered: state.filtered ?
                    state.filtered.map((ele, eleIdx) => eleIdx === catIdx ? null : ele)
                    : null
            };
        default:
            return state;
    }
};

export default reducer;