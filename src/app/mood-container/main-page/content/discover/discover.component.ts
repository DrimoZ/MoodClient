import { Component } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  isInputFocused: boolean = false;
  selectedFilter: string = 'all';

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }
}
