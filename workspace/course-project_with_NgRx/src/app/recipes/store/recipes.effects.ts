import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipes.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipesEffects {

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromApp.AppState>) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-f2477.firebaseio.com/recipes.json')
        }),
        map( recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });    
        }),
        map( recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch:false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        // withLatestFrom - allows us to merge value from another observable to this observable
        withLatestFrom(this.store.select('recipes')),
        // actionData is received from ofType, recipesState is received from withLatestFrom
        switchMap(([actionData, recipesState]) => { // array destructuring syntax

            return this.http.
            put('https://ng-course-recipe-book-f2477.firebaseio.com/recipes.json', 
            recipesState.recipes);
        })
    );
}