import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({providedIn:'root'})
export class AuthService {

    //user = new BehaviorSubject<User>(null);
    tokenExpirationTimer : any;

    constructor(private store: Store<fromApp.AppState>) {}
    
    setLogoutTimer(tokenExpirationDuration: number) {
        console.log('Auto Logout after => '+tokenExpirationDuration+" milliseconds");
        this.tokenExpirationTimer = setTimeout( () => {
            this.store.dispatch(new AuthActions.Logout());
        } ,tokenExpirationDuration);
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
    
}