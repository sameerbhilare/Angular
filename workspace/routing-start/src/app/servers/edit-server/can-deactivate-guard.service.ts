import { Observable } from "rxjs";
import { CanDeactivate } from "@angular/router";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component: CanComponentDeactivate, 
                  currentRoute: import("@angular/router").ActivatedRouteSnapshot, 
                  currentState: import("@angular/router").RouterStateSnapshot, 
                  nextState?: import("@angular/router").RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        return component.canDeactivate();
    }

    
}