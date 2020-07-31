import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';
import * as AuthActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    collapsed = true;
    isAuthenticated = false;
    userSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}


    ngOnInit() {
        this.userSubscription = this.store
        .select('auth')
        .pipe(map(authUser => authUser.user))
        .subscribe(user => {
            this.isAuthenticated = !!user; //!user ? false : true;
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    onSaveData() {
        //this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData() {
        //this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout() {
        //this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }
}