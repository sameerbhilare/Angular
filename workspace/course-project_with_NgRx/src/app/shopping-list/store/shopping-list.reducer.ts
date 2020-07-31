import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from "./shopping.list-actions";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients, 
                    (<ShoppingListActions.AddIngredient>action).payload
                ]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            // always update the data immutably
            return {
                ...state, // copy state
                ingredients: [
                    ...state.ingredients, 
                    ...(<ShoppingListActions.AddIngredients>action).payload
                ]
                // ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            // always update the data immutably
            const ingredient = state.ingredients[state.editedIngredientIndex];

            const updatedIngredient = {
                ...ingredient,
                ...(<ShoppingListActions.UpdateIngredient>action).payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients:  updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
            
        case ShoppingListActions.DELETE_INGREDIENT:
            // always update the data immutably
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: (<ShoppingListActions.StartEdit>action).payload,
                editedIngredient: state.ingredients[(<ShoppingListActions.StartEdit>action).payload]
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };

        default: 
           return state; 
    }

}