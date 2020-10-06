import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';
import { INCREMENT } from './actions';
import { Observable } from 'rxjs';
import { Map } from 'immutable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'redux-demo-latest';

  /*
  Be convention, This select decorator gets the name of this field
  and looks up for a field with the exact same name in the store.
  If we use different variable in the component, we have to pass exact state variable in the select decorator.
  E.g. @select('counter') count: Observable<IAppState>;
  */
  @select((s) => s.get('counter')) counter;

  constructor(private ngRedux: NgRedux<Map<string, any>>) {
    // Approach 1: tedious
    /*
    this.ngRedux.subscribe(() => {
      let state = ngRedux.getState(); // get entire Application State
      this.counter = state.counter; // access required data/slice from the state
    }); */
  }

  increment() {
    // without Redux
    // this.counter++;

    // with Redux
    // dispatching an action (type - increment)
    this.ngRedux.dispatch({ type: INCREMENT });
  }
}
