import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './actionTypes';

export function alertSuccess(message) {
    return {
        type: ALERT_SUCCESS,
        payload: message
    };
}

export function alertError(message) {
    return {
        type: ALERT_ERROR,
        payload: message
    };
}

export function alertClear() {
    return {
        type: ALERT_CLEAR
    };
}
