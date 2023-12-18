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

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.css', '../../../../mood-container/main-page/content/message/message.component.css','../popup/popup.component.css']
})
export class MemberPopupComponent extends ModalBaseComponent{

  userFromGroup: DtoInputUserFromGroup[] = [];
  private groupId: number = -1;
  constructor(modalService: ModalService, _el: ElementRef,private fb: FormBuilder,
              private _userService:UserService, private _imageService: ImageService, private _messageService: MessageService, private eb:EventBusService) {
    super(modalService, _el);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.eb.onEvent().subscribe(event =>{
      if(event.Type ==="groupClicked"){
        this.groupId = event.Payload.id;
        this._messageService.getUserFromGroup(this.groupId).subscribe({
          next: usr =>{
            this.userFromGroup = usr;
            this.userFromGroup.forEach(user => {
              this.getImageUrl( user.imageId == null ? 0:user.imageId).subscribe(img => {
                user.imageUrl = img;
              })
            })
          }
        })
      }
    })
  }
  getImageUrl(id: number){
    return this._imageService.getImageData(id).pipe(map(url => {
      return url;
    }));
  }
}
