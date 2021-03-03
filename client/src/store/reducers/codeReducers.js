import {
    GET_CODE_QUESTIONS,
    GET_CODE_QUESTION,
    ADD_CODE_QUESTION,
    DELETE_CODE_QUESTION,
    UPDATE_CODE_QUESTION,
    CODE_QUESTION_ERROR,
    FILTER_CODE_QUESTIONS,
    CLEAR_FILTER,
    CLEAR_CURRENT_CODE_QUESTION,
    RUN_CODE,
    SUBMIT_CODE,
    RESET_CODE,
    CODE_LOADING,
    CLEAR_CODE_ERRORS,
    SET_USER_CODE_NULL,
    GET_CODE_SUBMISSIONS,
    GET_CODE_SUBMISSION,
    DELETE_CODE_SUBMISSION,
    FILTER_CODE_SUBMISSIONS,
    CLEAR_FILTER_CODE_SUBMISSIONS

} from "../actions/actionTypes";

const initialState = {
    questions: null,
    current: null,
    submissions: null,
    currentSubmission: null,
    filtered: null,
    filteredSubmissions: null,
    error: null,
    loading: true,
    userCode: null,
    runSubmit: 'submit'
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
                questions: state.questions?.map((qsn) =>
                    qsn._id === action.payload._id ? action.payload : qsn
                ),
                current: action.payload,
                loading: false,
            };
        case DELETE_CODE_QUESTION:
            return {
                ...state,
                questions: state.questions?.filter(
                    (qsn) => qsn._id !== action.payload
                ),
                filtered: state.filtered ? state.filtered.filter(
                    (qsn) => qsn._id !== action.payload
                ) : null,
                loading: false,
            };
        case RUN_CODE:
            return {
                ...state,
                userCode: action.payload,
                runSubmit: 'run',
                loading: false,
            };
        case SUBMIT_CODE:
            return {
                ...state,
                userCode: action.payload.data,
                // currentSubmission: action.payload.codeSubmission,
                runSubmit: 'submit',
                loading: false,
            };
        case RESET_CODE:
            return {
                ...state,
                userCode: "",
                loading: false,
            };
        case CODE_QUESTION_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case FILTER_CODE_QUESTIONS:
            return {
                ...state,
                filtered: state.questions.filter((qsn) => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return qsn.title.match(regex);
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        case CLEAR_CURRENT_CODE_QUESTION:
            return {
                ...state,
                current: null,
            };
        case CODE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CLEAR_CODE_ERRORS:
            return {
                ...state,
                error: null,
            }
        case SET_USER_CODE_NULL:
            return {
                ...state,
                userCode: null,
            };
        case GET_CODE_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload,
                loading: false
            };
        case GET_CODE_SUBMISSION:
            return {
                ...state,
                currentSubmission: action.payload,
                loading: false
            };
        case DELETE_CODE_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.filter(ele => ele._id !== action.payload),
                loading: false
            };
        case FILTER_CODE_SUBMISSIONS:
            return {
                ...state,
                filteredSubmissions: state.submissions.filter(ele => {
                    const regex = new RegExp(`${action.payload.query}`, "gi");
                    if (action.payload.isStudent) {
                        return ele.question.title.match(regex);
                    }
                    else {
                        return ele.user.name.match(regex);
                    }
                }),
                loading: false
            };
        case CLEAR_FILTER_CODE_SUBMISSIONS:
            return {
                ...state,
                filteredSubmissions: null,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
