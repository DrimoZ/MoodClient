import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {EventBusService} from "../../../Services/EventBus/event-bus.service";
import {UserService} from "../../../Services/ApiRequest/user.service";
import {ModalService} from "../../../Services/Modals/modal.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../main-page.component.css']
})
export class NavbarComponent implements OnInit{
  clickedDiv: string = this._router.url.split("home")[1].split("/")[1];
  isOptionsVisible: boolean = false
  connectedId: string = ""

  @ViewChild('buttonRef') buttonRef!: ElementRef;
  @ViewChild('divRef') divRef!: ElementRef;

  constructor(private renderer: Renderer2, private _eventBus: EventBusService,
              private _router: Router, private _userService: UserService,
              private _modalService: ModalService) {
  }

  ngAfterViewInit() {
    const buttonPosition = this.buttonRef.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.divRef.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.divRef.nativeElement, 'top', `7.3vh`);
    this.renderer.setStyle(this.divRef.nativeElement, 'right', `${window.innerWidth - buttonPosition.right}px`);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.buttonRef.nativeElement.contains(event.target)) {
      this.isOptionsVisible = !this.isOptionsVisible;
    } else if (!this.divRef.nativeElement.contains(event.target)) {
      this.isOptionsVisible = false;
    }
  }

  onDivClick(divName: string) {
    this.clickedDiv = divName
  }

  disconnectUser() {
    this.isOptionsVisible = false;

    this._eventBus.emitEvent({
      Type: 'UserLogOut',
      Payload: ''
    })
  }

  ngOnInit(): void {
    this._userService.getUserIdAndRole().subscribe({
      next: res => {
        this.connectedId = res.userId;
      },
      error: err => {
        this._router.navigate(['connectionRefused'])
      }
    })
  }

  openCreatePub() {
    this._modalService.open("create-pub");
  }
}
