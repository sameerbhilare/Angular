import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "../store/shopping.list-actions";
import * as fromApp from '../../store/app.reducer';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f', {static: false}) shoppingEditForm: NgForm;
  startedEditingSubscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.startedEditingSubscription = this.store.select('shoppingList').subscribe(
      (stateData) => {
        if(stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.shoppingEditForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });

        } else {
          this.editMode = false;
        }
      }
    );

  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
    
    // to avoid strange behaviors in case - you are in editing mode and you navigated to other compopent and this component is destroyed.
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {

    const ingredient = new Ingredient(form.value.name, form.value.amount);
    
    if(this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));

    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.shoppingEditForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
