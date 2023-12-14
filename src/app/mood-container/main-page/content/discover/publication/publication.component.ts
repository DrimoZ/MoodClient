import { Component } from '@angular/core';
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {Router} from "@angular/router";
import {DtoInputPublication} from "../../../../../Dtos/Publication/Input/dto-input-publication";
import {map} from "rxjs";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  searchBarValue: string = "";
  publications: DtoInputPublication[] = [];
  showCount: number = 30;
  isWaitingForApi: boolean = true;

  constructor(private _dataService: UserService, private _behaviorEventBus: BehaviorEventBusService,
              private _imageService: ImageService) {
  }

  ngOnInit(): void {
    this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === 'DiscoverSearch') {
        this.searchBarValue = event.Payload;

        this.getPublicationsFromService();
      }
    })
  }

  loadMorePublications() {
    this.showCount += 30;
    this.getPublicationsFromService();
  }

  getDetailedPublication(id: number) {

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
