import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store'; // imports

import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgReduxModule], // aded to imports
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    // configuring the store with root app reducer and initial state (empty JS object)
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
