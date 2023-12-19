import {Component, ElementRef, ViewChild} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {PublicationService} from "../../../ApiRequest/publication.service";

@Component({
  selector: 'create-publication-modal',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent extends ModalBaseComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  previewUrls: string[] = [];
  pictures: File[];

  constructor(modalService: ModalService, _el: ElementRef, private _publicationService: PublicationService) {
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
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
        this.pictures.push(file);
      };

      reader.readAsDataURL(file);
    }

    event.target.value = '';
    event.target.click();
  }

  prev(): void {
    const carousel = document.querySelector(`#postCreationCarousel`)!;
    const activeItem = carousel.querySelector('.carousel-item.active')!;
    const prevItem = activeItem.previousElementSibling || carousel.querySelector('.carousel-item:last-child')!;
    activeItem.classList.remove('active');
    prevItem.classList.add('active');
  }

  next(): void {
    const carousel = document.querySelector(`#postCreationCarousel`)!;
    const activeItem = carousel.querySelector('.carousel-item.active')!;
    const nextItem = activeItem.nextElementSibling || carousel.querySelector('.carousel-item:first-child')!;
    activeItem.classList.remove('active');
    nextItem.classList.add('active');
  }

  postPublication(text: HTMLInputElement) {
    let formData = new FormData();

    formData.append("description", text.value)

    this.pictures.forEach((pic,i) => {
      formData.append(`images`, pic);
    })

    this._publicationService.createPublication(formData).subscribe({
      next: (res) => {
        text.value = "";
        super.close();
      }
    });
  }

  removeImage(index: number) {
    this.prev()
    this.previewUrls.splice(index, 1);
    this.pictures.splice(index, 1);
  }
}
