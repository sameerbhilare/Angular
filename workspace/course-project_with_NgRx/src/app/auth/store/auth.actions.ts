import { Action } from '@ngrx/store';

// These constants must be unique across application, 
// because Any Action you dispatch, always reaches to ALL reducers.
// so if different reducers have similar constants, then unintended reducer code will execute 
// which will have side effetcs on overall application
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const CLEAR_ERROR = "[Auth] Clear Error";
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const SIGNUP_START = '[Auth] Signup Start';

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload: {
        email: string, 
        localId: string, 
        idToken: string, 
        expirationDate: Date,
        redirect: boolean
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}


export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string, password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

// union type
export type AuthActions = 
        AuthenticateSuccess |
        Logout | 
        LoginStart | 
        AuthenticateFail | 
        SignupStart | 
        ClearError |
        AutoLogin ;