import {Component, OnInit} from '@angular/core';
import {DtoInputPublication} from "../../../../../Dtos/Publication/Input/dto-input-publication";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {ModalBusService, ModalEventName} from "../../../../../Services/EventBus/modal-bus.service";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit{
  publications: DtoInputPublication[] = [];
  userId: string = "-1"
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;
  isPublicationsPublic: boolean = false;

  constructor(private _userService: UserService,
              private _behaviorEventBus: BehaviorEventBusService, private _imageService: ImageService,
              private _modalBus: ModalBusService) {
  }

  ngOnInit(): void {
    this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === "UserId") {
        this.userId = event.Payload

        this._userService.getUserPublications(this.userId).subscribe({
          next: apiData => {
            this.isConnectedUser = apiData.isConnectedUser;
            this.isPublicationsPublic = apiData.isPublicationsPublic;
            this.publications = apiData.publications;

            if (this.publications != null) {
              this.publications.forEach(pub => {
                pub.elements.forEach(e => {
                  this._imageService.getImageData(e.idImage == null ? -1 : e.idImage).subscribe(url => {
                    e.imageUrl = url;
                  })
                })
              })
            }

            this.isWaitingForApi = false;
          },
          error: (err) => {
            console.log(err);
            if (err.status === 404) {
              this.userId = "-1"
              this.isWaitingForApi = false;
            }
          }
        })
      }
    })
  }

  getDetailedPublication(id: number) {
    this._modalBus.emitEvent({
      Type: ModalEventName.PublicationDetailModal,
      Payload: {
        ModalId: "publicationDetails",
        AdditionalData: id
      }
    })
  }
}
