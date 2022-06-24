import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor(public userService: UserService, private _router: Router) { 

  }
  ngOnInit(): void {
    // this.userService.getUserLoggedIn();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}