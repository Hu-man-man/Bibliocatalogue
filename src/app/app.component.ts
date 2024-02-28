import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BOOKS } from './biblio/mock-book-list';
import { Book } from './biblio/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {

}
