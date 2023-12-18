import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../../../../Services/ApiRequest/publication.service";
import {DtoInputPublicationDetail} from "../../../../Dtos/Publication/Input/dto-input-publication-detail";
import {Router} from "@angular/router";
import {ImageService} from "../../../../Services/ApiRequest/image.service";
import {UserService} from "../../../../Services/ApiRequest/user.service";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  isWaitingForApi: boolean = true;

  publications: DtoInputPublicationDetail[];
  pubCount: number = 30;
  connectedUserId: string;

  constructor(private _publicationService: PublicationService, private _router: Router,
              private _imageService: ImageService, private _userService: UserService) {

  }

  ngOnInit(): void {
    this._userService.getUserIdAndRole().subscribe(val => {
      this.connectedUserId = val.userId;
    })

    this._publicationService.getFriendsPublications(this.pubCount).subscribe({
      next: (val) => {
        console.log(val);
        this.publications = val;

        this.publications.forEach(p => {
          this._imageService.getImageData(p.idAuthorImage == null  ? 0 : p.idAuthorImage).subscribe({
            next: (val) => {
              p.urlImage = val;
            }
          })

          p.elements.forEach(e => {
            this._imageService.getImageData(e.idImage == null ? -1 : e.idImage).subscribe({
              next: (val) => {
                e.imageUrl = val;
              }
            })
          })

          p.comments.forEach(c => {
            this._imageService.getImageData(c.idAuthorImage == null ? 0 : c.idAuthorImage).subscribe({
              next: (val) => {
                c.imageUrl = val;
              }
            })
          })
        })

        this.isWaitingForApi = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  navigateToUser(idAuthor: string) {
    this._router.navigate(["home/" + idAuthor])
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

  toggleLiked(pubId: number) {
    let index = this.getPubIndex(pubId);

    this.publications[index].hasConnectedLiked = !this.publications[index].hasConnectedLiked;

    this._publicationService.likePublication(this.publications[index].id.toString(), this.publications[index].hasConnectedLiked).subscribe(res => {
      if (this.publications[index].hasConnectedLiked) this.publications[index].likeCount++;
      else this.publications[index].likeCount--;
    });
  }

  getPubIndex(id: number) {
    return this.publications.findIndex(p => p.id == id);
  }

  deleteComment(pubId: number, comId: number) {
    this._publicationService.deleteCommentInPublication(comId).subscribe(res => {
      let index = this.publications[this.getPubIndex(pubId)].comments.findIndex(c => c.id == comId);
      this.publications[this.getPubIndex(pubId)].comments.splice(index, 1);
      this.publications[this.getPubIndex(pubId)].commentCount--;
    })
  }

  sendComment(pubId: number, input: HTMLInputElement) {
    if (input.value != "") {
      this._publicationService.commentPublication(pubId.toString(), input.value).subscribe(res => {
        this.publications[this.getPubIndex(pubId)].commentCount++;
        input.value = "";

        this._publicationService.getPublicationComments(pubId.toString()).subscribe(comments => {
          this.publications[this.getPubIndex(pubId)].comments = comments;

          this.publications[this.getPubIndex(pubId)].comments.forEach(c => {
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
}
