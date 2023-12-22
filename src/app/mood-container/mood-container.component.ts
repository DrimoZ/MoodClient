import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../Services/ApiRequest/authentication.service";

@Component({
  selector: 'app-mood-container',
  templateUrl: './mood-container.component.html',
  styleUrls: ['./mood-container.component.css']
})
export class MoodContainerComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthenticationService) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

  }

  ngOnInit() {
    this._authService.isUserConnected().subscribe({
      error: err => {
        if (err.status === 401) {
          this._router.navigate(["./login"])
        }
      }
    })
  }
}
