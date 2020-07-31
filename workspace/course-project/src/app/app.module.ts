import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from './app-routing.module';

// unused improts should be removed otherwise they will be part of package bundle which we don't want
// import { RecipesModule } from './recipes/recipes.module'; 
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecipesEffects } from './recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),

    // dev tool for logging Actions and all
    StoreDevtoolsModule.instrument({logOnly: environment.production}),

    // helps with reacting to routing actions
    // basically it dispatches some actions automatically based on Angular router, 
    // that will allow you to write some code in reducer or effects 
    // that runs when such routing actions occur
    StoreRouterConnectingModule.forRoot(), 

    // AuthModule, // should be removed in case of lazy loading
    // RecipesModule, // should be removed in case of lazy loading
    // ShoppingListModule, // should be removed in case of lazy loading
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
