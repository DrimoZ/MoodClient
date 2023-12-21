import {Component, ElementRef, Input} from '@angular/core';
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
import {ModalBusService, ModalEventName} from "../../../EventBus/modal-bus.service";
import {SignalRService} from "../../../signal-r.service";

@Component({
  selector: 'group-members-info-modal',
  templateUrl: './group-members-info-modal.component.html',
  styleUrls: ['./group-members-info-modal.component.css',
    '../../../../mood-container/main-page/content/message/message.component.css',
    '../group-creation-modal/group-creation-modal.component.css']
})
export class GroupMembersInfoModalComponent extends ModalBaseComponent{
  @Input() groupId: number;

  userFromGroup: DtoInputUserFromGroup[] = [];
  userId: string = "-1";
  group:DtoInputGroup = {
    name :"",
    proprioId : "",
    isPrivate : false,
    id:-1
  };
  constructor(modalService: ModalService, _el: ElementRef,private fb: FormBuilder,
              private _userService:UserService, private _imageService: ImageService,
              private _messageService: MessageService, private _sr: SignalRService,
              private _eb:EventBusService, public _router : Router, private _modalBus: ModalBusService) {
    super(modalService, _el);
  }

  override ngOnInit() {
    super.ngOnInit();
    this._eb.onEvent().subscribe(event =>{
      if(event.Type === "UserHasLeft"){
        if(this.group.id == event.Payload.id){
          this.getMembers();
        }
      }
      if(event.Type === "UserHasJoin"){
        if(this.group.id == event.Payload.id){
          this.getMembers();
        }
      }
    })
  }

  override open() {
    this._userService.getUserIdAndRole().subscribe({
      next: usr => {
        this.userId = usr.userId;
      }
    });
    this._messageService.getGroup(this.groupId).subscribe({
      next: grp => {
        this.group = grp;
        this.getMembers();
      }
    })
    super.open();
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
        this.close()
        this._sr.removeFromGroup(this.group)
        this._sr.removeFromNotifGroup(this.group.id.toString())
      }
    });

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
        this._eb.emitEvent({
          Type : "MessageGroupModified",
          Payload : ""
        })
      }
    });
  }

  goToProfile(member: DtoInputUserFromGroup) {
    this.close();
    this._router.navigate(['home/' + member.id])
    this._eb.emitEvent({
      Type:"ChangeNavBar",
      Payload:"profile"
    })
  }

  addMember() {
    this._eb.emitEvent({
      Type:"AddMemberClicked",
      Payload: this.groupId
    })

    this._modalBus.emitEvent({
      Type: ModalEventName.GroupMemberAdditionModal,
      Payload: {
        ModalId: "addMemberModal",
        AdditionalData: this.groupId
      }
    })
  }
}
