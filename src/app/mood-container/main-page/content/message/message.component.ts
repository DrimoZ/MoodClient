import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {Router} from "@angular/router";
import {MessageService} from "../../../../Services/message.service"
import {DtoInputMessage} from "../../../../Dtos/Groups/dto-input-message";
import {ImageService} from "../../../../Services/Image/image.service";
import {map} from "rxjs";
import {DtoOutputMessage} from "../../../../Dtos/Groups/DtoOutputMessage";
import {DatePipe} from "@angular/common";
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



  groupes: DtoInputGroup[] = [];
  messages: DtoInputMessage[] = [];
  userId: string = "-1";
  groupIndex: number = 0;
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;
    constructor(private _signalR: SignalRService, private _datePipe: DatePipe, private _userService: UserService,private _messageService:MessageService,private _imageService:ImageService, private _router: Router) {
  }

  ngOnInit(): void {
    this._userService.getUserIdAndRole().subscribe({
      next: usr=> {
        this.userId = usr.userId;
        this._userService.getUsersGroups().subscribe({
          next: grp => {
            this.groupes = grp;
            this.isWaitingForApi = false;
          },
          error: (err) => {
            console.log(err);
            if (err.status === 404) {
              this.isWaitingForApi = false;
            }
          }
        });
      },
      error: (err)=> {
        if (err.status === 404) {
          this.userId = "-1"
          this.isWaitingForApi = false;
        }
      }
    });
    this._signalR.startConnection();
  }

  public sendMessage = (user: string, message: string) => {
    this._signalR.sendMessage(user, message);
    this.userInput.nativeElement.value = '';
    this.messageInput.nativeElement.value = '';
  }
  }

  getMessageFromGroup(groupId: number)
  {
    this.messages = [];
    this._messageService.getAllMessageForAGroupe(groupId).subscribe({
      next: msg =>{
        msg.forEach(msg => {
          this.getImageUrl( msg.imageId == null ? 0:msg.imageId).subscribe(img => {
            msg.url = img;
          })
        })
        this.messages = msg;
      }
    });
  }

  getImageUrl(id: number){
    return this._imageService.getImageData(id).pipe(map(url => {
      return url;
    }));
  }

  sendMessage(message: string)
  {
    let msg:DtoOutputMessage = new class implements DtoOutputMessage{
      content: string = "";
      userGroupId: number = 0;
    }
    msg.content = message;
    msg.userGroupId = this.groupes[this.groupIndex].id;
    this._messageService.sendOutputMessage(msg).subscribe();
  }
  formatDate(dateString: string): string
  {
    const date = new Date(dateString);
    let today = new Date(Date.now());
    let formattedDate;
    if(date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear())
      formattedDate  = this._datePipe.transform(dateString, 'HH:mm');
    else
      formattedDate = this._datePipe.transform(dateString, 'dd-MM-yyyy HH:mm');
    return formattedDate || '';
  }
  protected readonly alert = alert;
  protected readonly console = console;
}
