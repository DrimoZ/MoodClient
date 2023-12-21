import {Component, ElementRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalService} from "../modal.service";

@Component({
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.css']
})
export class ModalBaseComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  protected readonly element: any;

  constructor(public modalService: ModalService, private _el: ElementRef) {
    this.element = _el.nativeElement;
  }

  ngOnInit() {
    this.modalService.add(this);

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
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    this.isOpen = false;
  }
}
