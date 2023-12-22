import {Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputOtherUser} from "../../../../Dtos/Users/Inputs/dto-input-other-user";
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {ImageService} from "../../../ApiRequest/image.service";
import {DtoOutputCreateGroup} from "../../../../Dtos/Groups/dto-output-create-group";
import {MessageService} from "../../../ApiRequest/message.service";
import {EventBusService} from "../../../EventBus/event-bus.service";

@Component({
  selector: 'group-creation-modal',
  templateUrl: './group-creation-modal.component.html',
  styleUrls: ['./group-creation-modal.component.css']
})
export class GroupCreationModalComponent extends ModalBaseComponent{
  userFriends: DtoInputOtherUser[] = [];
  friendToAdd: DtoInputOtherUser[] = [];
  friendsForm: FormGroup;
  userId: string;

  constructor( modalService: ModalService, _el: ElementRef,private fb: FormBuilder,
               private _userService:UserService, private _imageService: ImageService, private _messageService: MessageService, private eb:EventBusService) {
    super(modalService, _el)
    this.friendsForm = this.fb.group({
      name: [{value:'', disabled:this.friendToAdd.length < 2},[ Validators.minLength(3)]]
    });
  }
  addGroup(groupName: string) {
    let grp:DtoOutputCreateGroup;
    let userIds: string[] = [];
    for(let frd of this.friendToAdd){
      userIds.push(frd.userId);
    }
    grp = new class implements DtoOutputCreateGroup {
      name: string = groupName;
      userIds: string[] = userIds;
    }
    if(groupName == ''){
      grp.name = null;
    }
    super.close();
    this._messageService.createGroup(grp).subscribe({
      next:grp =>{
        this.eb.emitEvent({
          Type:"MessageGroupModified",
          Payload:""
        })
      }
    });
    this.friendToAdd = [];
    this.userFriends = [];
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
    if(this.friendToAdd.length > 1 ){
      this.friendsForm.controls['name'].enable();
    }
    else
    {
      this.friendsForm.controls['name'].disable();
      this.friendsForm.controls['name'].setValue('')
    }
  }

  override open() {
    super.open();
    this._userService.getConnectedUserStatus().subscribe({
      next: usr=> {
        this.userId = usr.userId;
        this._userService.getUserFriends(this.userId).subscribe({
          next: user => {
            console.log(user)
            this.userFriends = user.friends;
            this.userFriends.forEach(friend =>{
              this._imageService.getImageData(friend.imageId == null ? 0:friend.imageId).subscribe(url => friend.imageUrl = url)
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
