import {
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    isFetched: false,
    data: []
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONVERSATIONS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_CONVERSATIONS_SUCCESS:
            return {
                isFetching: true,
                isFetched: true,
                data: action.payload
            };
        case FETCH_CONVERSATIONS_FAILURE:
            return {
                isFetching: false,
                isFetched: false,
                data: []
            };
        default:
            return state;
    }
}
