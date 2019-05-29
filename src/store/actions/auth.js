import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
});

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTimeout => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTimeout * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAFGfmN2r_GHGFH5MWeYZxgA3XQUp-7pKY';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAFGfmN2r_GHGFH5MWeYZxgA3XQUp-7pKY';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    };
}