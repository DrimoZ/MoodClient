import {Component, ElementRef, Input} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {PublicationService} from "../../../ApiRequest/publication.service";

@Component({
  selector: 'publication-detail-modal',
  templateUrl: './publication-detail-modal.component.html',
  styleUrls: ['./publication-detail-modal.component.css']
})
export class PublicationDetailModalComponent extends ModalBaseComponent{
  @Input() publicationId: string;

  constructor(modalService: ModalService, _el: ElementRef, private _publicationService: PublicationService) {
    super(modalService, _el);
  }

  override ngOnInit() {
    super.ngOnInit();

    this._publicationService;
  }
}
