import * as actionTypes from '../actions/actionTypes';

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({ type: actionTypes.AUTH_ERROR })
    }
}