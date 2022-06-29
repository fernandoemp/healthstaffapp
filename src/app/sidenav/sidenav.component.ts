import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/classes/user.class';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor(private router: Router, private localStorageService: LocalStorageService) { }
  ngOnInit() {
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout(){
    this.onSidenavClose();
    this.localStorageService.setItem("currentUser", new User());
    this.router.navigate(['login']);
  }
}
