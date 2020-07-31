import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping.list-actions';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('shoppingListTrigger', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),

      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(400)
      ]),

      transition('* => void', [
        animate(400, style({
          color: 'red',
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ])

    ]), 

    trigger('shoppingListTrigger2', [
      state('in', style({ // here 'in' is just a dummy state
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // 'void' is reserved state in angular. 
      // it should be used for cases where you do have an element in an end state 
      // which was not added to the dom at the begining 
      // or as a transition to state (e.g. remove element)
      // should be used in cases od ngIf or new element being added to the dom.
      transition('void => *', [  // animate from non-existance(void) to any(*) state
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-50px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(-20px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),

      transition('* => void', [  // animate from existance/any state to non existence(void)
        // pass an array of animations to perform at the SAME time (synchronously), not one after another.
        // we can use it to group multiple animations with possibly different timings together to happen at the same time.
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',          
            opacity: 0,
          })),
        ]),
      ])
    ]),
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
  }

}
