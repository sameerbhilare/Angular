import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changsSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }
    
  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    //this.route.fragment.subscribe();
    
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changsSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    
    if(!this.allowEdit){
      return true;
    }
    if( (this.serverName !== this.server.name || this.serverStatus !== this.server.status)
        && !this.changsSaved) {
        
          return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
