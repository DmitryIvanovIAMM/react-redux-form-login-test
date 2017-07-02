import { actions } from 'react-redux-form';
import { defaultLoginState } from '../store.jsx';

export const loginIfAny = (login, id_token, dispatch) => new Promise((formLoginSuccess, userNotExistsOrAlreadyLoggedInFunction) => {

    const showLoginIfAny = (isNeedLoginForUser) => {
        if( isNeedLoginForUser === true ) {
            showLogin();
        } else {
            userNotExistsOrAlreadyLoggedInFunction();
        }
    };

    const checkIsUserLoggedIn = (credentials) => {
        if (credentials.isLoggedIn === true) {
            dispatch(actions.change("login.isUserLoggedIn", true));
            userNotExistsOrAlreadyLoggedInFunction();
        } else {
            dispatch(actions.change("login.isUserLoggedIn", false));
            checkIsActiveUserExists(credentials.login).then(showLoginIfAny, userNotExistsOrAlreadyLoggedInFunction)
        }
    };

    const showLogin = () => {
        const loginMessage = 'The email account is already registered in the system.<br> Please login to complete your registration \nor click on the Forgot Password link to reset your password.';
        const loginForm = createLoginForm(loginMessage, login, true, formLoginSuccess);
        dispatch(actions.change("login", loginForm));
    };

    checkIsLoggedInByLogin(login, id_token).then(checkIsUserLoggedIn, userNotExistsOrAlreadyLoggedInFunction);
});

const checkIsLoggedInByLogin = (login, id_token) => new Promise((resolves, rejects) => {
    const api = jsRoutes.api.ApiUserController.isLoggedInByLogin(login).url;
    const request = new XMLHttpRequest();
    request.open('GET', api);
    request.setRequestHeader('Authorization', id_token);
    request.onload = () => {
        if( request.status === 200) {
            resolves({
                'login': login,
                'isLoggedIn': true
            });
        } else {
            resolves({
                'login': login,
                'isLoggedIn': false
            });
        }
    };
    request.onerror = (error) => rejects(error);
    request.send();
});

export const createLoginForm = (message, loginForm, isModalOpen, successFunction) => {
    const defaultLogin = Object.assign({}, defaultLoginState, {message: message}, {loginForm: loginForm}, {modalIsOpen: isModalOpen}, {afterPostSubmitFunction: successFunction});
    return defaultLogin;
};

export const createDefaultLoginForm = () => {
    return defaultLoginState;
};

export const checkIsLoggedIn = (id_token) => new Promise((resolves, rejects) => {
    const api = jsRoutes.api.ApiUserController.isLoggedIn().url;
    const request = new XMLHttpRequest();
    request.open('GET', api);
    request.setRequestHeader('Authorization', id_token);
    request.onload = () => {
        if( request.status === 200) {
            resolves({
                'login': request.responseText,
                'isLoggedIn': true
            });
        } else {
            resolves({
                'login': '',
                'isLoggedIn': false
            });
        }
    };
    request.onerror = (error) => rejects(error);
    request.send();
});

export const checkIsActiveUserExists = (login) => new Promise((resolves, rejects) => {
    const api = jsRoutes.controllers.UserController.isActiveUserExists(login).url;
    const request = new XMLHttpRequest();
    request.open('GET', api);
    request.onload = () => {
        if( request.status === 200 ) {
            resolves(true); // say we need login as active user exists
        } else {
            resolves(false);
        }
    };
    request.onerror = (error) => rejects(error);
    request.send();
});

export const loginActionPost = (loginCredentials) => new Promise((resolves, rejects) => {
    let api = jsRoutes.api.ApiUserController.loginForSchoolExceptAdmins(schoolId).url;
    const request = new XMLHttpRequest();
    request.open('POST', api);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = () => {
        if (request.status === 200 ) {
            resolves(request.getResponseHeader('Authorization'));
        } else if( request.status === 403 ) {
            rejects('Your account is not allowed to login for registration');
        } else {
            rejects('Enter correct Login and Password');
        }
    };
    request.onerror = (error) => rejects('Server error. Try again later.');
    request.send(JSON.stringify(loginCredentials));
});
