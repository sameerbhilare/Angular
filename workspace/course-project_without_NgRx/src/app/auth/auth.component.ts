import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

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

  authObservable: Observable<AuthResponseData>;

  constructor(private authService: AuthService, 
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
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

    this.isLoading = true;

    if(this.isLoginMode) {
      // Login mode
      this.authObservable = this.authService.login(email, password);
    } else {
      // Signup mode         
      this.authObservable = this.authService.signUp(email, password);
    }

    this.authObservable.subscribe( 
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
        
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        //this.showErrorAlert(errorMessage); // Approach 3: NOT RECOMMENDED : Dynamic Component handling using Component Loader. Refer auth.component.html
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  onHandleAlert() {
    this.error = null;
  }

  ngOnDestroy() {
    // in case our AuthComponent somehow destroyed before Approach 3 Alert Compnent.
    if(this.closeAlertSubscription) {
      this.closeAlertSubscription.unsubscribe();
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
