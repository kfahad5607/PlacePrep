import {
    GET_CODE_QUESTIONS,
    GET_CODE_QUESTION,
    ADD_CODE_QUESTION,
    DELETE_CODE_QUESTION,
    UPDATE_CODE_QUESTION,
    CODE_QUESTION_ERROR,
} from "../actions/actionTypes";

const initialState = {
    questions: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
    userCode: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CODE_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false,
            };
        case GET_CODE_QUESTION:
            return {
                ...state,
                current: action.payload,
                loading: false,
            };
        case ADD_CODE_QUESTION:
            return {
                ...state,
                questions:
                    state.questions === null
                        ? [action.payload]
                        : [...state.questions, action.payload],
                loading: false,
            };
        case UPDATE_CODE_QUESTION:
            return {
                ...state,
                questions: state.questions.map((qsn) =>
                    qsn._id === action.payload._id ? action.payload : qsn
                ),
                current: action.payload,
                loading: false,
            };
        case DELETE_CODE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(
                    (qsn) => qsn._id !== action.payload
                ),
                loading: false,
            };
        case CODE_QUESTION_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
