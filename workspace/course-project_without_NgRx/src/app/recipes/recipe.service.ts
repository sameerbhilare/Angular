import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Chicken Lollipop', 
    //         'I love Chicken lollipops.', 
    //         'https://i0.wp.com/s3.ap-south-1.amazonaws.com/images.salonyscookbook.com/chicken-lollipop-recipe/chicken-lollipop-recipe9.jpg',
    //         [
    //             new Ingredient('Lollipops', 10),
    //             new Ingredient('Shezwan Chutney', 1),
    //             new Ingredient('Eggs', 2)
    //         ]
    //         ),

    //     new Recipe(
    //         'Chicken Tandoori',
    //         'Tandoori is one of my favorites.',
    //         'https://www.swatifood.com/wp-content/uploads/2017/12/maxresdefault.jpg',
    //         [
    //             new Ingredient('Chicken Pieces', 3),
    //             new Ingredient('Tandoori Masala', 1)
    //         ]
    //         ),
        
    //     new Recipe(
    //         'Best French Fries',
    //         "This is world's best frenh fries",
    //         'https://www.thedailymeal.com/sites/default/files/recipe/2017/shutterstock_510881971.jpg',
    //         []
    //         )
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setAllRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeAt(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {

        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}