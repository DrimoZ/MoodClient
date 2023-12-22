import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Router} from "@angular/router";
import {EventBusService} from "../../../Services/EventBus/event-bus.service";
import {UserService} from "../../../Services/ApiRequest/user.service";
import {ModalBusService, ModalEventName} from "../../../Services/EventBus/modal-bus.service";
import {AuthenticationService} from "../../../Services/ApiRequest/authentication.service";
import {Subscription} from "rxjs";
import {DtoInputUserStatus} from "../../../Dtos/Users/Inputs/dto-input-user-status";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../main-page.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit{
  eventBusSubscription: Subscription;

  clickedDiv: string = this._router.url.split("home")[1].split("/")[1];
  isOptionsVisible: boolean = false
  connectedUserStatus: DtoInputUserStatus = <DtoInputUserStatus>{};

  @ViewChild('buttonRef') buttonRef!: ElementRef;
  @ViewChild('divRef') divRef!: ElementRef;

  constructor(private _renderer: Renderer2, private _eventBus: EventBusService,
              private _router: Router, private _userService: UserService,
              private _modalBus: ModalBusService, private _authService: AuthenticationService) {
  }

  ngAfterViewInit() {
    const buttonPosition = this.buttonRef.nativeElement.getBoundingClientRect();
    this._renderer.setStyle(this.divRef.nativeElement, 'position', 'absolute');
    this._renderer.setStyle(this.divRef.nativeElement, 'top', `7.3vh`);
    this._renderer.setStyle(this.divRef.nativeElement, 'right', `${window.innerWidth - buttonPosition.right}px`);
  }

  ngOnInit(): void {
    this._userService.getConnectedUserStatus().subscribe({
      next: res => {
        this.connectedUserStatus = res;
      },
      error: err => {
        this._router.navigate(['connectionRefused'])
      }
    })

    this.eventBusSubscription = this._eventBus.onEvent().subscribe(event => {
        if (event.Type ==="ChangeNavBar"){
          this.clickedDiv = event.Payload;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.eventBusSubscription && this.eventBusSubscription.unsubscribe();
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
    this.clickedDiv = divName;
  }

  disconnectUser() {
    this.isOptionsVisible = false;

    this._authService.logOutUser().subscribe({
      next: () => {
        this._router.navigate([''])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  openCreatePub() {
    this._modalBus.emitEvent({
      Type: ModalEventName.PublicationCreationModal,
      Payload: {
        ModalId: "createPublication",
        AdditionalData: null
      }
    })
  }
}
