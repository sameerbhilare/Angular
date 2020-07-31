import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions'
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : boolean
}


const handleAuthentication = (email: string, localId: string, idToken: string, expiresIn: number) => {
    // create new observable as switchMap needs to return an observable.

    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, localId, idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email: email, 
        localId: localId, 
        idToken: idToken, 
        expirationDate: expirationDate,
        redirect: true
    });
}

const handleError = (errorResponse: any) => {
    // ... err handling code
    let errorMessage = 'An unknown error occurred!';
    if(!errorResponse.error || !errorResponse.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email is already registered.';
            break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid Email or Password.';
            break;    
    }
    
    // create new observable as switchMap needs to return an observable.
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

// Effects should not change any State
// effect by default should dispatch new action at the end when it's done, bcz effect doesn't change the Application state
@Injectable()
export class AuthEffects {

    // Actions is one big observable which gives access to all dispatched actions 
    // so that you can react to them.
    // actions$ is stream of dispatched actions
    constructor(private actions$ : Actions,
                private http: HttpClient,
                private router: Router,
                private authService: AuthService) {}

    // action handler, register effect 
    // actions$ is an observable, but don't call subscribe() bcz ngrx will subscribe for us.
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START), // filtering

        // creates new observable by taking another observable's data
        // an observable completes whenever an error is thrown.
        // An Effect (which is an observable) must not die.
        switchMap( (authData: AuthActions.LoginStart) => {
            return this.http
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' 
            + environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
            ).pipe( 
                    tap( (authData) => {
                        this.authService.setLogoutTimer(+authData.expiresIn * 1000);
                    }),
                    map(responseData => {
                    return handleAuthentication(
                        responseData.email, 
                        responseData.localId,
                        responseData.idToken,
                        +responseData.expiresIn
                    );
                }), catchError(errorResponse => {
                    return handleError(errorResponse);
                })
            )
        }),

    );

    // effect by default should dispatch new action at the end when it's done, 
    // bcz effect doesn't change the Application state
    // if we don't want to dispatch a new action, we need to set dispatch=false
    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap( (authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if(authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap( () => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map( () => {
            const userData : {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
    
            if(!userData) {
                return { type: 'DUMMY' }; // creating Action on the fly
            }
    
            const loadedUser = new User (
                userData.email, 
                userData.id, 
                userData._token, 
                new Date(userData._tokenExpirationDate)
            );
            
            if(loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({
                    email: userData.email, 
                    localId: userData.id, 
                    idToken: userData._token, 
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false // should not redirect in case of autologin otherwise resolver won't work
                });
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
            }

            return { type: 'DUMMY' }; // creating Action on the fly
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap( (authData: AuthActions.SignupStart) => {
            return this.http
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true

            }).pipe( 
                tap( (authData) => {
                    this.authService.setLogoutTimer(+authData.expiresIn * 1000);
                }),
                map(responseData => {
                // create new observable as switchMap needs to return an observable.
                return handleAuthentication(
                    responseData.email, 
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                );
            }), catchError(errorResponse => {
                console.log('signup error handling');
                // ... err handling code
                return handleError(errorResponse);
            })
            )
        })
    );
    
}