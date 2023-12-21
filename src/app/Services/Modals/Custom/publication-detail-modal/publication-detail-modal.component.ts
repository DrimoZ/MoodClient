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
  activeImageIndex = 0;

  isWaitingForApi = true;
  publication: DtoInputPublicationDetail;

  connectedUserStatus: {userId: string, userRole: number};

  constructor(modalService: ModalService, _el: ElementRef, private _publicationService: PublicationService,
              private _imageService: ImageService, private _router: Router, private _userService: UserService) {
    super(modalService, _el);
  }

  override open() {
    this.isWaitingForApi = true;

    this._userService.getUserIdAndRole().subscribe(val => {
      this.connectedUserStatus = val;
    })

    this._publicationService.getDetailedPublication(this.publicationId).subscribe({
      next: (val) => {
        this.publication = val;

        this.publication.elements.forEach(e => {
          this._imageService.getImageData(e.idImage == null ? -1 : e.idImage).subscribe({
            next: (val) => {
              e.imageUrl = val;
            }
          })
        })

        this.publication.comments.forEach(c => {
          this._imageService.getImageData(c.idAuthorImage == null  ? 0 : c.idAuthorImage).subscribe({
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

  navigateToUser(idAuthor: string) {
    close()
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
            this._imageService.getImageData(c.idAuthorImage == null  ? 0 : c.idAuthorImage).subscribe({
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
      let index = this.publication.comments.findIndex(c => c.id == id);
      this.publication.comments.splice(index, 1);
      this.publication.commentCount--;
    })
  }

    deletePublication() {
      this._publicationService.deletePublication(this.publication.id).subscribe(ev => {
        this.close();
        this._router.navigate([this._router.url])
      })
    }
}
