import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f', {static: false}) shoppingEditForm: NgForm;
  startedEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;

        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {

    const ingredient = new Ingredient(form.value.name, form.value.amount);
    
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.editMode = false;
    this.shoppingEditForm.reset();

    // this.ingredientAdded.emit({
    //   name: this.nameInputRef.nativeElement.value, 
    //   amount: this.amountInputRef.nativeElement.value
    // });
  }

  onClear() {
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
