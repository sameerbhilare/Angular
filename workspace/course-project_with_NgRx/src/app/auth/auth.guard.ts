import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : boolean 
        | import("@angular/router").UrlTree 
        | import("rxjs").Observable<boolean 
        | import("@angular/router").UrlTree> 
        | Promise<boolean 
        | import("@angular/router").UrlTree> {

            // approach 1: since we can return either Obervable with boolean or UrlTree
            return this.store.select('auth').pipe(
                take(1),
                map(authUser => {
                    return authUser.user;
                }),
                map(user => {
                    const isAuth = !!user;
                    if(isAuth) {
                        return true;
                    }
                    return this.router.createUrlTree(['/auth']);
                })
            ); 

            // approach 2: (old) when we had to return only boolean.
            /*
            return this.authService.user.pipe(
              take(1),
              map(user => {
                  return !!user;
              }),
              tap(isAuth => {
                  if(!isAuth) {
                      this.router.navigate(['/auth']);
                  }
              })
            ); */
    }

}