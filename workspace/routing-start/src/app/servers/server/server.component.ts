import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.server = this.route.snapshot.data['serverRetrieved']; // 'serverRetrieved' is configured in AppRoutingModule
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['serverRetrieved'];
      }
    );

    /*
    const id =  +this.route.snapshot.params['id']; // params['?'] returns string always. Added '+' to convert it in to number 
    this.server = this.serversService.getServer(id);

    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']); // params['?'] returns string always. Added '+' to convert it in to number 
       }
    );
    */
  }

  onEditServer() {
    //this.router.navigate(['/servers',this.server.id,'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}); // simply append 'edit' at the end of current url
  }

}
