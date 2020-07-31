import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsUpdated = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients() {
        /**
         * If slice() is not used, then we don't need event emitter. 
         * However since it's an array which means call by reference, 
         * anyone who has access to this array reference outside this service class and modify this array and 
         * it will reflect in other places where same service instance is used. 
         */
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // for(let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients); // spread operator '...' converts an array of elements to list of elements
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    updateIngredient(index: number, updateIngredient: Ingredient) {
        this.ingredients[index] = updateIngredient;
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }
}