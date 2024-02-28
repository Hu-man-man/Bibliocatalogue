import { Routes } from '@angular/router';
import { BookListComponent } from './biblio/book-list/book-list.component';
import { EditBookComponent } from './biblio/edit-book/edit-book.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'book-list', component: BookListComponent},
    { path: 'edit-book', component: EditBookComponent},
    { path: 'edit-book/:id', component: EditBookComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'AppComponent', pathMatch: 'full'}
];
