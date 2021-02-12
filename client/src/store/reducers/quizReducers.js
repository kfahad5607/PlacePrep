import * as actionTypes from '../actions/actionTypes';

const initialState = {
    quizzes: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload
            };

        default:
            return state;
    }
};

export default reducer