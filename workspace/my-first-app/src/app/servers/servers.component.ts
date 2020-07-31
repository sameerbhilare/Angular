import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: '[app-servers]',
  //selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowAddServer : boolean = false;
  serverCreationStatus: string = 'No server created.'
  serverCreated: boolean = false;
  serverName: string = 'Test Server';
  servers = ['Test Server 1', 'Test Server 2'];

  constructor() { 
    setInterval(() => {
      this.allowAddServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created. Name: '+this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onServerInput(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
