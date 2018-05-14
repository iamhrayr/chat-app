import {
    FETCH_CONVERSATION_REQUEST,
    FETCH_CONVERSATION_SUCCESS,
    FETCH_CONVERSATION_FAILURE
} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    isFetched: false,
    data: []
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONVERSATION_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_CONVERSATION_SUCCESS:
            return {
                isFetching: true,
                isFetched: true,
                data: action.payload
            };
        case FETCH_CONVERSATION_FAILURE:
            return {
                isFetching: false,
                isFetched: false,
                data: []
            };
        default:
            return state;
    }
}
