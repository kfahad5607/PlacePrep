import * as actionTypes from '../actions/actionTypes';

const initialState = {
    questions: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
    
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return [...state];

        default:
            return state;
    }
};

export default reducer