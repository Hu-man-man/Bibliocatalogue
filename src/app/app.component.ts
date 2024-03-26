import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from  '@angular/fire/auth';
import { LogComponent } from './log/log.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogComponent],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private auth: Auth) {}

  get currentUser() {
    return this.auth.currentUser;
  }
}
