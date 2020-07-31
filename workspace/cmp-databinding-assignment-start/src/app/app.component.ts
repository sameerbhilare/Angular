import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  eventNumber: number = 0;

  onGameCreated(serverData : {eventNumber: number}) {
    this.eventNumber = serverData.eventNumber;
  }
}
