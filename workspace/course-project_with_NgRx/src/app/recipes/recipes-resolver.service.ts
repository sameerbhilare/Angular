import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {

        // return this.dataStorageService.fetchRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }), 
            switchMap(recipes => {
                if(recipes.length === 0) {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    // resolver resolves it and waits for recipes to set
                    return this.actions$.pipe(
                        ofType(RecipesActions.SET_RECIPES), 
                        take(1));
                } else {
                    return of(recipes);
                }
            })
        );
           
    }
}