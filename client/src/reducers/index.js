import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import conversationsReducer from './conversations';
import conversationReducer from './conversation';

export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    conversations: conversationsReducer,
    conversation: conversationReducer
});
