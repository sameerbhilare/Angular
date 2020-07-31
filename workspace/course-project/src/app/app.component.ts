import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'course-project';
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId) {} // PLATFORM_ID tells Angualr on which platform you ae running currently.

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      // this code will run only on browser because of isPlatformBrowser() function.
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    console.log('platformId='+this.platformId);
    console.log('Hello from AppComponent ngOnInit()');
  }
}
