import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ImageService} from "../../../ApiRequest/image.service";
import {ModalService} from "../../modal.service";
import {ModalBaseComponent} from "../../modal-base/modal-base.component";

@Component({
  selector: 'profile-picture-edition-modal',
  templateUrl: 'profile-picture-edition-modal.component.html',
  styleUrls: ['profile-picture-edition-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProfilePictureEditionModalComponent extends ModalBaseComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  previewUrl: string | ArrayBuffer;

  constructor(modalService: ModalService, _el: ElementRef, private _imageService: ImageService) {
    super(modalService, _el);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  submit() {
    const file = this.fileInput.nativeElement.files[0];

    let profilePicture = new FormData();
    profilePicture.append('image', file)

    this._imageService.updateProfilePicture(profilePicture).subscribe({
      next: (res) => {
        location.reload()
        close()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
