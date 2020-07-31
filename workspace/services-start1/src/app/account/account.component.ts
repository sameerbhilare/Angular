import { Component, Input } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  
  constructor(private loggingService: LoggingService,
              private acountsService: AccountsService) {}

  onSetTo(status: string) {
    this.acountsService.updateAccount(this.id, status);
    //this.loggingService.logStatus(status);

    this.acountsService.statusChangedEvent.emit(status);
  }
}
