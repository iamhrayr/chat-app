import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import axios from 'axios';
import history from '../helpers/history';
import setAuthHeader from '../helpers/setAuthHeader';

export function login(data) {
    return dispatch => {
        console.log('data', data);
        dispatch(request());
        axios
            .post('api/auth/login', data)
            .then(res => {
                console.log('res', res);
                dispatch(success(res));
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setAuthHeader();
                history.push('/');
            })
            .catch(err => {
                console.log('err', err);
                dispatch(failure(err));
            });
    };

    function request() {
        return {
            type: LOGIN_REQUEST
        };
    }
    function success(res) {
        return {
            type: LOGIN_SUCCESS,
            payload: res
        };
    }
    function failure(err) {
        return {
            type: LOGIN_FAILURE,
            payload: err.response.data
        };
    }
}
