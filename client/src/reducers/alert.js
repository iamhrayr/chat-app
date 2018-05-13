import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from '../actions/actionTypes';

const defaultState = '';

export default function(state = defaultStat, action) {
    switch (action.type) {
        case ALERT_SUCCESS:
            return {
                type: 'alert-success',
                message: action.payload
            };
        case ALERT_ERROR:
            return {
                type: 'alert-error',
                message: action.payload
            };
        case ALERT_CLEAR:
            return {};
        default:
            return state;
    }
}
