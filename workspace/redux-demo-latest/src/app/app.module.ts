import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store'; // imports
import { fromJS, Map } from 'immutable';

import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgReduxModule], // aded to imports
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngRedux: NgRedux<Map<string, any>>) {
    // configuring the store with root app reducer and initial state (empty JS object)
    // fromJS() function gets a plain javascript object and returns an immutable object which is of type ap.
    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE));
  }
}
