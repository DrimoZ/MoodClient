import {Component, OnInit, ViewChild} from '@angular/core';
import * as signalR from '@microsoft/signalr'
import {HubConnection} from "@microsoft/signalr";
import {SignalRService} from "../../../../Services/signal-r.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{

  isConnected: boolean = false;
  SendButton: any;
  constructor(private _signalR: SignalRService) {
  }

  ngOnInit() {
    this._signalR.startConnection();
  }

  public sendMessage = (user: string, message: string) => {
    this._signalR.sendMessage(user, message);
  }

  public receiveMessage = (user: string, message: string) => {
    console.log(user + ': ' + message);
  }

}
