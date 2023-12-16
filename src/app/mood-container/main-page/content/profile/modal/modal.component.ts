import {Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ModalService} from "../../../../../Services/modal.service";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  @ViewChild('fileInput') fileInput: ElementRef;
  previewUrl: string | ArrayBuffer;

  constructor(public modalService: ModalService, private el: ElementRef, private _imageService: ImageService) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.modalService.add(this);

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    this.modalService.remove(this);
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isOpen = false;
    this.previewUrl = "";
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
    console.log(file);
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
