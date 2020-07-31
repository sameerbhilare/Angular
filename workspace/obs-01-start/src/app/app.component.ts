import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated = false;

  activatedEmitterSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedEmitterSubscription = this.userService.activatedEmitter.subscribe(
      (isActivated) => {
        this.userActivated = isActivated;
      }
    );
  }
  ngOnDestroy(){
    this.activatedEmitterSubscription.unsubscribe();
  }

}
