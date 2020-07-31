import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-f2477.firebaseio.com/recipes.json', recipes)
        .subscribe( responseBody => {
            console.log(responseBody);
        });
    }

    fetchRecipes() {

        return this.http
        .get<Recipe[]>('https://ng-course-recipe-book-f2477.firebaseio.com/recipes.json')
        .pipe(
            map( recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });    
            }),
            tap(recipes => {
                this.recipeService.setAllRecipes(recipes);
            })
        );

        /*
        return this.authService.user
        .pipe(
            // take only one value from the observable(authService.user) and thereafer automatically unsubscribe. 
            // Get on demand latest user (only one) when fetchRecipes is called. 
            // Hence no need to have 'ongoing' subscription.
            take(1), 

            // exhaustMap waits for first observable to complete(which will happen when we take latest 1 user)
            // gets the data from previous observable (in this case 'user' data)
            // now return new observable in there which will then replace the previous observable(user observable) in the entire observable chain
            // with new observable(http observable).
            exhaustMap(user => {
                return this.http
                .get<Recipe[]>('https://ng-course-recipe-book-f2477.firebaseio.com/recipes.json',
                {
                    params: new HttpParams().set('auth', user.token)
                }
                )
            }),
            map( recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });    
            }),
            tap(recipes => {
                this.recipeService.setAllRecipes(recipes);
            }) 
        ); */
    }
}