import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {

    activeToInactiveCount = 0;
    inactiveToActiveCount = 0;

    increamentActiveToInactiveCount() {
        this.activeToInactiveCount++;
        console.log('Active -> Inactive : '+this.activeToInactiveCount);
    }

    increamentInactiveToActiveCount() {
        this.inactiveToActiveCount++;
        console.log('Inactive -> Active : '+this.inactiveToActiveCount);
    }
}