// import { inject } from "@angular/core";
// import { Router } from "@angular/router";
// import { getAuth } from "firebase/auth";

// export const AuthGuard = () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const router = inject(Router);
//   if (!user) {
//     router.navigate(["/login"]);
//     return false;
  
//   }
//   return true;
// };



// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = () => {
//   const router: Router = inject(Router);
//   const user = JSON.parse(localStorage.getItem('user')!);
//   if (!user) {
//     return router.createUrlTree(['/', 'login']);
//   }
//   return true;
// };



// import { inject } from '@angular/core';
// import { Router } from '@angular/router';

// export const authGuard = () => {
//   const router: Router = inject(Router);
//   const user = JSON.parse(localStorage.getItem('user')!);
//   if (user) {
//     return true;
//   }
//   router.navigate(['/', 'login']);
//   return false;
// }

// import { CanActivateFn } from "@angular/router";
// import { inject } from "@angular/core";
// import { AngularFireAuth } from "@angular/fire/compat/auth";

// export const authGuard: CanActivateFn = async (route, state) => {
//   const angularFireAuth = inject(AngularFireAuth);
//   const user = await angularFireAuth.currentUser;
//   // coerce to boolean
//   const isLoggedIn = !!user;
//   return isLoggedIn;
// };

import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export function authGuard(): boolean | Promise<boolean> | Observable<boolean> {
  const isLoggedIn = !!firebase.auth().currentUser;
  if (!isLoggedIn) {
    // Rediriger vers la page de connexion
    window.location.href = '/login';
    return false;
  }
  return true;
}