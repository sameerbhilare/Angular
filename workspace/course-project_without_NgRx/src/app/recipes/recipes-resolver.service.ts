import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {

        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}