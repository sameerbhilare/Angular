import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
        .pipe(
            // take only one value from the observable(authService.user) and thereafer automatically unsubscribe. 
            // Get on demand latest user (only one) when fetchRecipes is called. 
            // Hence no need to have 'ongoing' subscription.
            take(1), 

            map(authUser => authUser.user),

            // exhaustMap waits for first observable to complete(which will happen when we take latest 1 user)
            // gets the data from previous observable (in this case 'user' data)
            // now return new observable in there which will then replace the previous observable(user observable) in the entire observable chain
            // with new observable(http observable).
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            })
        );
    }

}