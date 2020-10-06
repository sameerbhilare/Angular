import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import {
  NgReduxModule,
  NgRedux,
  DevToolsExtension,
} from '@angular-redux/store'; // imports
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
  constructor(ngRedux: NgRedux<Map<string, any>>, devTools: DevToolsExtension) {
    // configuring the store with root app reducer and initial state (empty JS object)
    // fromJS() function gets a plain javascript object and returns an immutable object which is of type ap.

    // 3rd arg is to add middleware.
    // middleware is an extension point.
    // So if we can execute some code from the moment an action is dispatched
    // to the moment it reaches a reducer.
    // E.g. logging. we can log every action and do something about it.

    // 4th arg is an array of enhancers, this is where we can use tools extension.
    // this can cause performance issues. So make sure you use only in Devlopment mode.

    var enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE), [], enhancers);
  }
}
