import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {PublicationService} from "../../../ApiRequest/publication.service";
import {DtoInputPublicationDetail} from "../../../../Dtos/Publication/Input/dto-input-publication-detail";
import {ImageService} from "../../../ApiRequest/image.service";
import {Router} from "@angular/router";
import {EventBusService} from "../../../EventBus/event-bus.service";

@Component({
  selector: 'publication-detail-modal',
  templateUrl: './publication-detail-modal.component.html',
  styleUrls: ['./publication-detail-modal.component.css']
})
export class PublicationDetailModalComponent extends ModalBaseComponent{
  @Input() publicationId: string;
  @ViewChild('commentInput') commentInput: ElementRef;
  activeImageIndex = 0;

  isWaitingForApi = true;
  publication: DtoInputPublicationDetail;

  constructor(modalService: ModalService, _el: ElementRef, private _publicationService: PublicationService,
              private _imageService: ImageService, private _router: Router, private eb: EventBusService) {
    super(modalService, _el);
  }

  override open() {
    this.isWaitingForApi = true;

    this._publicationService.getDetailedPublication(this.publicationId).subscribe({
      next: (val) => {
        this.publication = val;
        console.log(val);

        this.publication.elements.forEach(e => {
          this._imageService.getImageData(e.idImage == null ? -1 : e.idImage).subscribe({
            next: (val) => {
              e.imageUrl = val;
            }
          })
        })

        this.publication.comments.forEach(c => {
          this._imageService.getImageData(c.idUserImage == null  ? 0 : c.idUserImage).subscribe({
            next: (val) => {
              c.imageUrl = val;
            }
          })
        })

        this._imageService.getImageData(this.publication.idAuthorImage == null ? 0: this.publication.idAuthorImage).subscribe({
          next: (val) => {
            this.publication.urlImage = val;
            this.isWaitingForApi = false;
          }
        })
      },
      error: (err) => {
        console.log(err);
      }

    })

    super.open();
  }

  navigateToUser(idAuthor: number) {
    this._router.navigate(["home/" + idAuthor])
  }

  sendComment() {

  }

  toggleLiked() {
    this.publication.hasConnectedLiked = !this.publication.hasConnectedLiked;

    if (this.publication.hasConnectedLiked) this.publication.likeCount++;
    else this.publication.likeCount--;
  }

  focusInput() {
    this.commentInput.nativeElement.focus();
  }

  prev(id: number): void {
    const carousel = document.querySelector(`#pub_${id}`)!;
    const activeItem = carousel.querySelector('.carousel-item.active')!;
    const prevItem = activeItem.previousElementSibling || carousel.querySelector('.carousel-item:last-child')!;
    activeItem.classList.remove('active');
    prevItem.classList.add('active');

    this.activeImageIndex--;
  }

  next(id: number): void {
    const carousel = document.querySelector(`#pub_${id}`)!;
    const activeItem = carousel.querySelector('.carousel-item.active')!;
    const nextItem = activeItem.nextElementSibling || carousel.querySelector('.carousel-item:first-child')!;
    activeItem.classList.remove('active');
    nextItem.classList.add('active');

    this.activeImageIndex++;

  }
}
