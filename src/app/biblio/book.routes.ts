import { Routes } from "@angular/router";
import { BookListComponent } from "./book-list/book-list.component";
import {AuthGuard, redirectUnauthorizedTo} from  '@angular/fire/auth-guard'

const  redirectUnauthorizedToLogin = () =>  redirectUnauthorizedTo(['log']);


export const routes: Routes = [
    {
      path: '',
      component: BookListComponent,
      canActivate: [AuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }
    }
  ];