import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  // to know whether in Login mode or Sign Up mode
  isLoginMode = true;

  // to show loading spinner
  isLoading = false;

  // error mesage
  error = null;

  // Approach 3: NOT RECOMMENDED : Dynamic Component handling using Component Loader. Refer auth.component.html
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  closeAlertSubscription : Subscription;

  storeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    console.log('onInit');
    this.storeSub = this.store.select('auth').subscribe( (authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    
    if(!authForm.value){
      return;
    }

    this.error = null; // to reset the error
    const email = authForm.value.email;
    const password = authForm.value.password;

    //this.isLoading = true;

    if(this.isLoginMode) {
      // Login mode
      // this.authObservable = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      // Signup mode         
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }

    authForm.reset();
  }

  onHandleAlert() {
    //this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    // in case our AuthComponent somehow destroyed before Approach 3 Alert Compnent.
    if(this.closeAlertSubscription) {
      this.closeAlertSubscription.unsubscribe();
    }    
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  // Approach 3: NOT RECOMMENDED : Dynamic Component handling using Component Loader. Refer auth.component.html
  showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const alertComponentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    alertComponentRef.instance.message = message;
    this.closeAlertSubscription = alertComponentRef.instance.close.subscribe(() => {
      this.closeAlertSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

}
