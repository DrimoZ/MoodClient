import {Component, ElementRef} from '@angular/core';
import {DtoInputOtherUser} from "../../../../Dtos/Users/Inputs/dto-input-other-user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {ImageService} from "../../../ApiRequest/image.service";
import {MessageService} from "../../../ApiRequest/message.service";
import {EventBusService} from "../../../EventBus/event-bus.service";
import {DtoOutputCreateGroup} from "../../../../Dtos/Groups/dto-output-create-group";
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";

@Component({
  selector: 'app-add-member-popup',
  templateUrl: './add-member-popup.component.html',
  styleUrls: ['./add-member-popup.component.css']
})
export class AddMemberPopupComponent extends ModalBaseComponent {
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
               private _userService:UserService, private _imageService: ImageService, private _messageService: MessageService, private eb:EventBusService) {
    super(modalService, _el)
    this.friendsForm = this.fb.group({
      name: [{value:'', disabled:this.friendToAdd.length < 2},[ Validators.minLength(3)]]
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.eb.onEvent().subscribe({
      next: event => {
        if(event.Type === "AddMemberClicked")
        {
          this._messageService.getGroup(event.Payload).subscribe({
            next: grp => {
              this.group = grp;
              this._messageService.getUserFromGroup(this.group.id).subscribe({
                next : users => {
                  this._userService.getUserFriends(this.userId).subscribe({
                    next: frds =>{
                      this.userFriends = frds.friends.filter( a => !users.map(b => b.id).includes(a.id));
                    }
                  })
                }
              })
            }
          })
        }
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
    this._userService.getUserIdAndRole().subscribe({
      next: usr=> {
        this.userId = usr.userId;
        this._messageService.getGroup(this.groupId).subscribe({
          next: grp => {
            this.group = grp;
          }
        })
        this._userService.getUserFriends(this.userId).subscribe({
          next: user => {
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

  addMembers() {
    this.close()
  }
}
