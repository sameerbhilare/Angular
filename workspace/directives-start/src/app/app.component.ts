import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenNumbers = [2,4,6];
  oddNumbers = [1,3,5];
  onlyOdd = false;

  value = 10; // ngSwitch demo
}
