import {Component, ElementRef, Input} from '@angular/core';
import {DtoInputOtherUser} from "../../../../Dtos/Users/Inputs/dto-input-other-user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {ImageService} from "../../../ApiRequest/image.service";
import {MessageService} from "../../../ApiRequest/message.service";
import {EventBusService} from "../../../EventBus/event-bus.service";
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";
import {map} from "rxjs";
import {DtoOutputUserGroup} from "../../../../Dtos/Groups/dto-output-userGroup";
import {ModalBusService, ModalEventName} from "../../../EventBus/modal-bus.service";

@Component({
  selector: 'group-member-addition-modal',
  templateUrl: './group-member-addition-modal.component.html',
  styleUrls: ['./group-member-addition-modal.component.css','../group-creation-modal/group-creation-modal.component.css',
    '../../../../mood-container/main-page/content/message/message.component.css']
})
export class GroupMemberAdditionModalComponent extends ModalBaseComponent {
  @Input() groupId: number;

  userFriends: DtoInputOtherUser[] = [];
  friendToAdd: DtoInputOtherUser[] = [];
  friendsForm: FormGroup;
  userId: string;
  group:DtoInputGroup = {
    name :"",
    proprioId : "",
    isPrivate : false,
    id:-1
  };

  constructor( modalService: ModalService, _el: ElementRef,private fb: FormBuilder,
               private _userService:UserService, private _imageService: ImageService, private _messageService: MessageService, private _eb:EventBusService, private _modalBus: ModalBusService) {
    super(modalService, _el)
    this.friendsForm = this.fb.group({
      name: [{value:'', disabled:this.friendToAdd.length < 2},[ Validators.minLength(3)]]
    });
  }

  override ngOnInit() {
    super.ngOnInit();

    this._userService.getUserIdAndRole().subscribe({
      next : usr => {
        this.userId = usr.userId
      }
    })
    this._messageService.getGroup(this.groupId).subscribe({
      next: grp => {
        this.group = grp;
        this._messageService.getUserFromGroup(this.group.id).subscribe({
          next : users => {
            this._userService.getUserFriends(this.userId).subscribe({
              next: frds =>{
                this.userFriends = frds.friends.filter( a => !users.map(b => b.id).includes(a.id));
                this.userFriends.forEach(user => {
                  this.getImageUrl(user.idImage== null ? 0 : user.idImage).subscribe(img => {
                    user.imageUrl = img;
                  })
                })
              }
            })
          }
        })
      }
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
  }

  addMembers() {
    let usergroups : DtoOutputUserGroup[] = []
    this.friendToAdd.forEach(frd => usergroups.push({
      userId :frd.id,
      groupId : this.group.id
    }))
    console.log(usergroups);
    this._messageService.addMembers(usergroups).subscribe({
      next: grp => {
        this._eb.emitEvent({
          Type:"GroupClicked",
          Payload:this.group
        })
      }
    });
    this.userFriends = [];
    this.friendToAdd = [];
    this.close()
  }

  getImageUrl(id: number){
    return this._imageService.getImageData(id).pipe(map(url => {
      return url;
    }));
  }

  override close() {
    super.close();
    this._modalBus.emitEvent({
      Type:ModalEventName.GroupMembersInfoModal,
      Payload: {ModalId:"GroupInfo", AdditionalData:this.groupId}
    })
  }
}
