import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  intervalRef : any;

  @Output('gameStarted')
  gameStarted = new EventEmitter<{eventNumber: number}>();

  counter: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame() {
    this.intervalRef = setInterval( () => {
      this.counter++;
      console.log(this.counter);
      this.gameStarted.emit({eventNumber: this.counter});
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.intervalRef);
    this.counter = 0;
    console.log('Interval cleared.');
  }
}
