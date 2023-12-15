import {Component, OnInit} from '@angular/core';
import {DtoInputPublication} from "../../../../../Dtos/Publication/Input/dto-input-publication";
import {Router} from "@angular/router";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {map} from "rxjs";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {DtoInputPubElement} from "../../../../../Dtos/Publication/Input/dto-input-pub-element";

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

  constructor(private _userService: UserService, private _router: Router, private _behaviorEventBus: BehaviorEventBusService, private _imageService: ImageService) {
  }

  ngOnInit(): void {
    this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === "UserId") {
        this.userId = event.Payload

        this._userService.getUserPublications(this.userId).subscribe({
          next: user => {
            this.publications = user.publications;

            this.isConnectedUser = user.isConnectedUser;
            this.isPublicationsPublic = user.isPublicationsPublic;

            this.publications.forEach(pub => {
              pub.elements.forEach(e => {
                this._imageService.getImageData(e.idImage == null ? -1 : e.idImage).subscribe(url => {
                  e.imageUrl = url;
                })
              })
            })

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

    //this.userId = this._router.url.split("home")[1].split("/")[1];


  }

  prev(id: number): void {
    const carousel = document.querySelector(`#pub_${id}`)!;
    const activeItem = carousel.querySelector('.carousel-item.active')!;
    const prevItem = activeItem.previousElementSibling || carousel.querySelector('.carousel-item:last-child')!;
    activeItem.classList.remove('active');
    prevItem.classList.add('active');
  }

  next(id: number): void {
    const carousel = document.querySelector(`#pub_${id}`)!;
    const activeItem = carousel.querySelector('.carousel-item.active')!;
    const nextItem = activeItem.nextElementSibling || carousel.querySelector('.carousel-item:first-child')!;
    activeItem.classList.remove('active');
    nextItem.classList.add('active');
  }

  getDetailedPublication(id: number) {

  }

  protected readonly console = console;
}
