import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription : Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   (count) => {
    //     console.log(count);
    //   }
    // );

    
    // custom observable
    const customIntervalObservable = Observable.create(
      (observer) => {
        let count = 0;
        // in this case the setInterval() is our event source
        setInterval(
          () => {
            // observable emitting data 
            observer.next(count);

            // observable completes
            if(count === 2) {
              observer.complete();
            }

            // observable throwing an error
            if(count > 3) {
              observer.error(new Error('Count is greatet than 3 !'));
            }
            count++;
          }
        , 1000);
      }
    );

    // implementing chain of operators - filter and map
    // filter - to provide data which is greater than 0
    // map - to map number(e.g. 1) to a string e.g. 'Round: 1' 
    const customIntervalPipe = customIntervalObservable.pipe(
      
      // filter - to provide data which is greater than 0
      filter(
        (data: number) => {
          return data > 0;
        }
      ),
      // map - to map number(e.g. 1) to a string e.g. 'Round: 1'
      map(
        (data: number) => {
        return 'Round :'+(data+1);
      }
      )      
    );

    // observer- listen to the observable
    this.firstObsSubscription = customIntervalPipe.subscribe(
      // handling data
      (data) => {
        console.log(data);
      },
      // handling error
      (error) => {
        console.log(error);
        alert(error);
      },
      // handling completion
      () => {
        console.log('Completed');
      }
    );

  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
