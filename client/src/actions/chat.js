import {
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    FETCH_CONVERSATION_REQUEST,
    FETCH_CONVERSATION_SUCCESS,
    FETCH_CONVERSATION_FAILURE
} from './actionTypes';
import axios from 'axios';

export function fetchConversations() {
    return dispatch => {
        dispatch(request());
        axios
            .get('api/chat/conversations')
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            });
    };

    function request() {
        return {
            type: FETCH_CONVERSATIONS_REQUEST
        };
    }

    function success(res) {
        return {
            type: FETCH_CONVERSATIONS_SUCCESS,
            payload: res
        };
    }
    function failure(err) {
        return {
            type: FETCH_CONVERSATIONS_FAILURE,
            payload: err
        };
    }
}

export function fetchConversation(id) {
    return dispatch => {
        dispatch(request());

        axios
            .get(`/api/chat/conversation/${id}`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            });
    };

    function request() {
        return {
            type: FETCH_CONVERSATION_REQUEST
        };
    }
    function success(res) {
        return {
            type: FETCH_CONVERSATION_SUCCESS,
            payload: res
        };
    }
    function failure(err) {
        return {
            type: FETCH_CONVERSATION_FAILURE,
            payload: err
        };
    }
}
