
import { Routes } from "@angular/router";
import {AuthGuard, redirectLoggedInTo} from  '@angular/fire/auth-guard';
import { LogComponent } from "./log/log.component";

const redirectRouteBookList = () =>  redirectLoggedInTo(['book-list']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'log',
    pathMatch: 'full'
  },
  {
    path: 'log',
    component: LogComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectRouteBookList }
  },
  {
    path: 'book-list',
    loadChildren: () => import('./biblio/book.routes').then(m => m.routes)
  },
];
