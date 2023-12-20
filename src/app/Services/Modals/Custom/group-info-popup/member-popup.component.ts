import {Component, ElementRef} from '@angular/core';
import {ModalService} from "../../modal.service";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../../ApiRequest/user.service";
import {ImageService} from "../../../ApiRequest/image.service";
import {MessageService} from "../../../ApiRequest/message.service";
import {EventBusService} from "../../../EventBus/event-bus.service";
import {DtoInputUserFromGroup} from "../../../../Dtos/Groups/dto-input-userfromGroup";
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {map} from "rxjs";
import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";
import {DtoOutputPatchGroup} from "../../../../Dtos/Groups/dto-output-patch-group";
import {Router} from "@angular/router";

@Component({
  selector: 'group-Info-Popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.css', '../../../../mood-container/main-page/content/message/message.component.css','../popup/popup.component.css']
})
export class MemberPopupComponent extends ModalBaseComponent{

  userFromGroup: DtoInputUserFromGroup[] = [];
  groupId: number = -1;
  userId: string = "-1";
  group:DtoInputGroup = {
    name :"",
    proprioId : "",
    isPrivate : false,
    id:-1
  };
  constructor(modalService: ModalService, _el: ElementRef,private fb: FormBuilder,
              private _userService:UserService, private _imageService: ImageService, private _messageService: MessageService,
              private eb:EventBusService, public _router : Router) {
    super(modalService, _el);
  }

  override ngOnInit() {
    super.ngOnInit();
    this._userService.getUserIdAndRole().subscribe({
      next: usr => {
        this.userId = usr.userId;
      }
    });
    this.eb.onEvent().subscribe(event =>{
      if(event.Type ==="GroupClicked"){
        this.groupId = event.Payload.id;
        this._messageService.getGroup(this.groupId).subscribe({
          next: grp => {
            this.group = grp;
          }
        })
        this.getMembers();
      }
    })
  }

  private getMembers() {
    this._messageService.getUserFromGroup(this.groupId).subscribe({
      next: usr => {
        this.userFromGroup = usr;
        this.userFromGroup.forEach(user => {
          this.getImageUrl(user.imageId == null ? 0 : user.imageId).subscribe(img => {
            user.imageUrl = img;
          })
        })
      }
    })
  }

  getImageUrl(id: number){
    return this._imageService.getImageData(id).pipe(map(url => {
      return url;
    }));
  }

  quitsGroup() {
    this._messageService.quitGroup(this.groupId).subscribe({
      next: grp => {
        this.eb.emitEvent({
          Type:"MessageGroupModified",
          Payload:""
        })
      }
    });
    this.close()
  }

  kickThisMember(member: DtoInputUserFromGroup) {
    this._messageService.kickUserFromGroup(this.groupId, member.id).subscribe(
      {
        next: member =>{
          this.getMembers();
        }
      }
    );
  }

  modifyGroupsName(div: string) {
    this.group.name = div;
    let grp : DtoOutputPatchGroup  = {
      name: div,
      proprioId: this.group.proprioId,
      id : this.group.id
    }
    this._messageService.modifyGroup(grp).subscribe({
      next: grp => {
        this.eb.emitEvent({
          Type : "MessageGroupModified",
          Payload : ""
        })
      }
    });
  }

  goToProfile(member: DtoInputUserFromGroup) {
    this.close();
    this._router.navigate(['home/' + member.id])
    this.eb.emitEvent({
      Type:"ChangeNavBar",
      Payload:"profile"
    })
  }

  addMember() {
    this.eb.emitEvent({
      Type:"AddMemberClicked",
      Payload:this.groupId
    })
    this.modalService.open("addMemberPopup")
  }
}
