import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {PublicationService} from "../../../ApiRequest/publication.service";
import {DtoInputPublicationDetail} from "../../../../Dtos/Publication/Input/dto-input-publication-detail";
import {ImageService} from "../../../ApiRequest/image.service";
import {Router} from "@angular/router";
import {UserService} from "../../../ApiRequest/user.service";

@Component({
  selector: 'publication-detail-modal',
  templateUrl: './publication-detail-modal.component.html',
  styleUrls: ['./publication-detail-modal.component.css']
})
export class PublicationDetailModalComponent extends ModalBaseComponent{
  @Input() publicationId: number;
  @ViewChild('commentInput') commentInput: ElementRef;
  activeImageIndex: number;

  isWaitingForApi = true;
  publication: DtoInputPublicationDetail;

  connectedUserStatus: {userId: string, userRole: number};

  constructor(modalService: ModalService, _el: ElementRef, private _publicationService: PublicationService,
              private _imageService: ImageService, private _router: Router, private _userService: UserService) {
    super(modalService, _el);
  }

  override open() {
    this.activeImageIndex = 0
    this.isWaitingForApi = true;

    this._userService.getConnectedUserStatus().subscribe(val => {
      this.connectedUserStatus = val;
    })

    this._publicationService.getDetailedPublication(this.publicationId).subscribe({
      next: (val) => {
        this.publication = val;

        this.publication.elements.forEach(e => {
          this._imageService.getImageData(e.imageId == null ? -1 : e.imageId).subscribe({
            next: (val) => {
              e.imageUrl = val;
            }
          })
        })

        this.publication.comments.forEach(c => {
          this._imageService.getImageData(c.authorImageId == null  ? 0 : c.authorImageId).subscribe({
            next: (val) => {
              c.imageUrl = val;
            }
          })
        })

        this._imageService.getImageData(this.publication.authorImageId == null ? 0: this.publication.authorImageId).subscribe({
          next: (val) => {
            this.publication.imageUrl = val;
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

  navigateToUser(idAuthor: string) {
    this.close()
    this._router.navigate(["home/" + idAuthor])
  }

  sendComment() {
    let comment = this.commentInput.nativeElement.value;

    if (comment != "") {
      this._publicationService.commentPublication(this.publicationId, comment).subscribe(res => {
        this.commentInput.nativeElement.value = "";
        this.publication.commentCount++;

        this._publicationService.getPublicationComments(this.publicationId).subscribe(comments => {
          this.publication.comments = comments;

          this.publication.comments.forEach(c => {
            this._imageService.getImageData(c.authorImageId == null  ? 0 : c.authorImageId).subscribe({
              next: (val) => {
                c.imageUrl = val;
              }
            })
          })
        })

      })
    }
  }

  toggleLiked() {
    this.publication.hasConnectedLiked = !this.publication.hasConnectedLiked;

    this._publicationService.likePublication(this.publicationId, this.publication.hasConnectedLiked).subscribe(res => {
      if (this.publication.hasConnectedLiked) this.publication.likeCount++;
      else this.publication.likeCount--;
    });
  }

  focusInput() {
    this.commentInput.nativeElement.focus();
  }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.publication.elements.length;
  }

  prevImage() {
    this.activeImageIndex = (this.activeImageIndex - 1 + this.publication.elements.length) % this.publication.elements.length;
  }

  deleteComment(id: number) {
    this._publicationService.deleteCommentInPublication(id).subscribe(res => {
      let index = this.publication.comments.findIndex(c => c.commentId == id);
      this.publication.comments.splice(index, 1);
      this.publication.commentCount--;
    })
  }

  deletePublication() {
    this._publicationService.deletePublication(this.publication.publicationId).subscribe(ev => {
      this.close();
      this._router.navigate([this._router.url])
    })
  }

  calculatedDate(givenDate: Date): string {
    const currentDate = new Date();
    givenDate = new Date(givenDate);
    let differenceInMs = currentDate.getTime() - givenDate.getTime();

    let seconds = Math.floor(differenceInMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years>1?"s":""}`;
    } else if (days > 0) {
      return `${days} day${days>1?"s":""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours>1?"s":""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes>1?"s":""}`;
    } else {
      return `${seconds} second${seconds>1?"s":""}`;
    }
  }
}
