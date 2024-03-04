import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from  '@angular/fire/auth';


import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private auth: Auth) {}

  get currentUser() {
    return this.auth.currentUser;
  }
}
