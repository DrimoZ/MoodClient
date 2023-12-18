import {Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputOtherUser} from "../../../../Dtos/Users/Inputs/dto-input-other-user";
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {ImageService} from "../../../ApiRequest/image.service";
import {DtoOutputGroup} from "../../../../Dtos/Groups/dto-output-group";
import {MessageService} from "../../../ApiRequest/message.service";
import {EventBusService} from "../../../EventBus/event-bus.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css', '../../../../mood-container/main-page/content/message/message.component.css']
})
export class PopupComponent extends ModalBaseComponent{

  userFriends: DtoInputOtherUser[] = [];
  friendToAdd: DtoInputOtherUser[] = [];
  friendsForm: FormGroup;
    private userId: string;

  constructor( modalService: ModalService, _el: ElementRef,private fb: FormBuilder,
               private _userService:UserService, private _imageService: ImageService, private _messageService: MessageService, private eb:EventBusService) {
    super(modalService, _el)
    this.friendsForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]]
    });
  }

  formReset() {
    this.friendsForm.reset()
  }

  addGroup(groupName: string) {
    let grp:DtoOutputGroup;
    let userIds: string[] = [];
    for(let frd of this.friendToAdd){
      userIds.push(frd.id);
    }
    grp = new class implements DtoOutputGroup {
      name: string = groupName;
      userIds: string[] = userIds;
    }
    if(groupName == ''){
      grp.name = null;
    }
    super.close();
    this._messageService.createGroup(grp).subscribe();
    this.friendToAdd = [];
    this.userFriends = [];
    this.eb.emitEvent({
      Type:"MessageGroupCreated",
      Payload:""
    })
  }

  addFriend(friend: HTMLDivElement, frd: DtoInputOtherUser) {
    if(friend.classList.contains('btnColor')) {
      friend.classList.remove('btnColor')
      friend.classList.add('btnColorToggled');
      this.friendToAdd.push(frd);
    }
    else{
      friend.classList.remove('btnColorToggled');
      friend.classList.add('btnColor');
      const indexToRemove = this.friendToAdd.findIndex(item => item ==frd);
      if (indexToRemove !== -1) {
        this.friendToAdd.splice(indexToRemove, 1);
      }
    }
  }

  override open() {
    super.open();
    this._userService.getUserIdAndRole().subscribe({
      next: usr=> {
        this.userId = usr.userId;
        console.log(this.userId)
        this._userService.getUserFriends(this.userId).subscribe({
          next: (user) => {
            this.userFriends = user.friends;
            this.userFriends.forEach(friend =>{
              this._imageService.getImageData(friend.idImage == null ? 0:friend.idImage).subscribe(url => friend.imageUrl = url)
            })
          },
          error: (err) => {
            if (err.status === 404) {
            }
          }
        })
      },
      error: (err)=> {
        if (err.status === 404) {
          this.userId = "-1"
        }
      }
    });


  }
}
