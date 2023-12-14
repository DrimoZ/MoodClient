import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SignalRService} from "../../../../Services/signal-r.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{


  @ViewChild('userInput') userInput: ElementRef;
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('sendButton') sendButton: ElementRef;

  constructor(private _signalR: SignalRService) {
  }

  ngOnInit() {
    this._signalR.startConnection();
  }

  public sendMessage = (user: string, message: string) => {
    this._signalR.sendMessage(user, message);
    this.userInput.nativeElement.value = '';
    this.messageInput.nativeElement.value = '';
  }
}
