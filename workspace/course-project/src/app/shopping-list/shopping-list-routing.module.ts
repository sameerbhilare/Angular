import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
    // {path: 'shopping-list', component: ShoppingListComponent},
    {path: '', component: ShoppingListComponent},  // when using lazy loading, moving the path to app-routing.module
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ], 
    exports: [
        RouterModule
    ]
})
export class ShoppingListRoutingModule {

}