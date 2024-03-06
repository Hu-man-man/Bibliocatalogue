import { Routes } from "@angular/router";
import { BookListComponent } from "./biblio/book-list/book-list.component";
import { LoginComponent } from "./login/login.component";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "book-list", /*canActivate: [authGuard],*/ component: BookListComponent },
];
