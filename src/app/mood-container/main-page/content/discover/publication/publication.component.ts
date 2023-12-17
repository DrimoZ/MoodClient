import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {Router} from "@angular/router";
import {DtoInputPublication} from "../../../../../Dtos/Publication/Input/dto-input-publication";
import {map, Subscription} from "rxjs";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {ModalService} from "../../../../../Services/Modals/modal.service";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, OnDestroy{
  searchBarValue: string = "";
  publications: DtoInputPublication[] = [];
  showCount: number = 30;
  isWaitingForApi: boolean = true;
  searchSubscription: Subscription | null = null;

  constructor(private _dataService: UserService, private _behaviorEventBus: BehaviorEventBusService,
              private _imageService: ImageService, private _modalService: ModalService) {
  }

  ngOnInit(): void {
    this.searchSubscription = this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === 'DiscoverSearch') {
        this.searchBarValue = event.Payload;

        this.getPublicationsFromService();
      }
    })
  }

  ngOnDestroy() {
    this.searchSubscription && this.searchSubscription.unsubscribe()
  }

  loadMorePublications() {
    this.showCount += 30;
    this.getPublicationsFromService();
  }

  getDetailedPublication(id: number) {
    this._modalService.open("modal-pub_" + id);
  }


  private getPublicationsFromService() {
    this.isWaitingForApi = true;

    this._dataService.getDiscoverPublications(this.showCount, this.searchBarValue).subscribe(
      data => {
        this.publications = data;

        this.publications.forEach(pub => {
          pub.elements.forEach(e => {
            this._imageService.getImageData(e.idImage == null ? -1 : e.idImage).subscribe(url => {e.imageUrl = url;})
          })
        })

        this.isWaitingForApi = false;
      }
    )
  }
}
