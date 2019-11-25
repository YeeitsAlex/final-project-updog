import { Component } from '@angular/core';
import { UserService } from './user.service'
import { Router, RouterLink } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayName: boolean = false;
  

  constructor(private User: UserService, private router: Router) { this.displayName = false; }

  hide() { this.displayName = false; }

  show() { this.displayName = true; }

  LogOut() {
    this.User.id = ""
    this.User.firstname = ""
    this.User.lastname = ""
    this.User.validLog = false;

    this.router.navigateByUrl("/")
  }

  toggle() { this.displayName = !this.displayName; }
  title = 'my-app';
}
