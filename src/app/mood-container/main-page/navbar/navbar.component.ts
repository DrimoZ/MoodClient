import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../main-page.component.css']
})
export class NavbarComponent {
  public isOptionsVisible: boolean = false
  @ViewChild('buttonRef') buttonRef!: ElementRef;
  @ViewChild('divRef') divRef!: ElementRef;

  constructor(private renderer: Renderer2) { }


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

  disconnectUser() {
    this.isOptionsVisible = false;


  }
}
