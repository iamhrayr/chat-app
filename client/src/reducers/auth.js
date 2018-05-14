import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
    loggedIn: token ? true : false,
    user: user ? JSON.parse(user) : null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload.user
            };
        case LOGIN_FAILURE:
            return state;
        default:
            return state;
    }
}
