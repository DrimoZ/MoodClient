import {Component, ElementRef, ViewChild} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {PublicationService} from "../../../ApiRequest/publication.service";
import {Router} from "@angular/router";
import {UserService} from "../../../ApiRequest/user.service";

@Component({
  selector: 'create-publication-modal',
  templateUrl: './publication-creation-modal.component.html',
  styleUrls: ['./publication-creation-modal.component.css', '../../../../../assets/css/custom/customcarousel.css']
})
export class PublicationCreationModalComponent extends ModalBaseComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  previewUrls: string[] = [];
  pictures: File[];
  currentImageIndex = 0;
  descValue = "";

  constructor(modalService: ModalService, _el: ElementRef, private _publicationService: PublicationService,
              private _router: Router, private _userService: UserService) {
    super(modalService, _el);
  }

  override open() {
    this.pictures = [];
    this.previewUrls = [];

    super.open();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        event.target.value = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
        this.pictures.push(file);
      };

      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.previewUrls.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.previewUrls.length) % this.previewUrls.length;
  }

  postPublication() {
    let formData = new FormData();

    formData.append("description", this.descValue)

    this.pictures.forEach(pic => {
      formData.append(`images`, pic);
    })

    this._publicationService.createPublication(formData).subscribe({
      next: (res) => {
        this._userService.getConnectedUserStatus().subscribe(res => {
          this.descValue = "";
          super.close();
          this._router.navigate(['home/' + res.userId])
        })
      }
    });
  }

  removeCurrentImage() {
    this.previewUrls.splice(this.currentImageIndex, 1);
    this.pictures.splice(this.currentImageIndex, 1);

    this.previewUrls.length == 0 ? this.currentImageIndex = 0 : this.prevImage();
  }
}
