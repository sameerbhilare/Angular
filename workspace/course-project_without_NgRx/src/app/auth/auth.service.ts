import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

export interface AuthResponseData {
    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : boolean
}

@Injectable({providedIn:'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer : any;

    constructor(private http: HttpClient,
                private router: Router) {}

    signUp(email: string, password: string){
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(responseData => this.handleAuthenticationResponse(
                responseData.email, 
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            ))
        );
    }

    autoLogin(){
        const userData : {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User (
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );
        
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    login(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(responseData => this.handleAuthenticationResponse(
                responseData.email, 
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            ))
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(tokenExpirationDuration: number) {
        console.log('Auto Logout after => '+tokenExpirationDuration+" milliseconds");
        this.tokenExpirationTimer = setTimeout( () => {
            this.logout();
        } ,tokenExpirationDuration);
    }

    private handleAuthenticationResponse(email: string, localId: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);

        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);
        // set auto logout
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {

        console.log(errorResponse);
        let errorMessage = 'An unknown error occurred!';
        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
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
        return throwError(errorMessage);
    }
}