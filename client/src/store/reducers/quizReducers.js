import * as actionTypes from '../actions/actionTypes';

const initialState = {
    quizzes: null,
    submissions: null,
    currentSubmission: null,
    current: null,
    filtered: null,
    filteredSubmissions: null,
    error: null,
    isCreated: null,
    isDeleted: null,
    editable: null,
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
            let temp = action.payload.subCount === 0 ? true : null;
            return {
                ...state,
                current: action.payload.currentQuiz,
                editable: temp,
                loading: false
            };

        case actionTypes.ADD_QUIZ:
            return {
                ...state,
                quizzes: [action.payload, ...(state.quizzes ? state.quizzes : [])],
                loading: false
            };
        case actionTypes.QUIZ_CREATED_SUCCESS:
            return {
                ...state,
                isCreated: true,
                loading: false
            };
        case actionTypes.CLR_QUIZ_CREATED_SUCCESS:
            return {
                ...state,
                isCreated: null,
                loading: false
            };

        case actionTypes.QUIZ_DELETED_SUCCESS:
            return {
                ...state,
                isDeleted: true,
                loading: false
            };
        case actionTypes.CLR_QUIZ_DELETED_SUCCESS:
            return {
                ...state,
                isDeleted: null,
                loading: false
            };
        case actionTypes.UPDATE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes?.map((ele) => ele._id === action.payload._id ? action.payload : ele),
                filtered: state.filtered?.map((ele) => ele._id === action.payload._id ? action.payload : ele),
                current: action.payload,
                loading: false
            };

        case actionTypes.DELETE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.filter(ele => ele._id !== action.payload),
                filtered: state.filtered?.filter(ele => ele._id !== action.payload),
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
                filteredSubmissions: state.filteredSubmissions ?
                    state.filteredSubmissions.filter(ele => ele._id !== action.payload)
                    : null,
                loading: false
            };
        case actionTypes.CLEAR_QUIZ_ERRORS:
            return {
                ...state,
                error: null,
            };
        case actionTypes.FILTER_QUIZ_SUBMISSIONS:
            return {
                ...state,
                filteredSubmissions: state.submissions.filter(ele => {
                    const regex = new RegExp(`${action.payload.query}`, "gi");
                    if (action.payload.isStudent) {
                        return ele.quiz.title.match(regex);
                    }
                    else {
                        return ele.user.name.match(regex);
                    }
                }),
                loading: false
            };
        case actionTypes.CLEAR_FILTER_QUIZ_SUBMISSIONS:
            return {
                ...state,
                filteredSubmissions: null,
                loading: false
            };
        case actionTypes.FILTER_QUIZZES:
            const rgx = new RegExp(`${action.payload}`, "gi");
            return {
                ...state,
                filtered: state.quizzes.filter(ele => ele.title.match(rgx) || ele.topic.match(rgx) || ele.category.match(rgx)
                )
            };
        case actionTypes.CLEAR_FILTER_QUIZZES:
            return {
                ...state,
                filtered: null
            };
        default:
            return state;
    }
};

export default reducer;