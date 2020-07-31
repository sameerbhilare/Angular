import { Component } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'basics-assignment3-start';
  toggleDisplay: boolean = true;
  log = [];

  onToggleDisplay(){

    this.toggleDisplay = !this.toggleDisplay;
    //this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }

}
