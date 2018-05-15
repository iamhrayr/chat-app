import {
    FETCH_CONVERSATION_REQUEST,
    FETCH_CONVERSATION_SUCCESS,
    FETCH_CONVERSATION_FAILURE,
    SEND_MESSAGE_SUCCESS
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
        // case SEND_MESSAGE_SUCCESS:
        //     return {
        //         ...state,
        //         data: [...state.data, action.msg]
        //     };
        default:
            return state;
    }
}
