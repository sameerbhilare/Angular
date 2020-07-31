import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800))
    ]),

    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)  scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)  scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [ // chain of transitions/phases // * means any state
        style({
          'background-color': 'orange'
        }),
        animate(300, style({
          borderRadius: '50px'
        })),
        animate(500)
      ]
      )
    ]),

    trigger('list1', [
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
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),

      transition('* => void', [  // animate from existance/any state to non existence(void)
        animate(300, style({
          transform: 'translateX(100px)',          
          opacity: 0,
        })),
      ])
    ]),

    trigger('list2', [
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
export class AppComponent {

  state = 'normal';
  wildState = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }

    onAnimate() {
      this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
      this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
      this.wildState = 'shrunken';
    }

    onDelete(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }

    onAnimationCompleted(event) {
      console.log(event);
    }

    onAnimationStart(event) {
      console.log(event);
    }
}
