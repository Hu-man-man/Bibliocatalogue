import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard = () => {
  // const router: Router = inject(Router);
  // const auth: Auth = inject(Auth);
  
  // if (auth.currentUser) {
  //   console.log('connectéééé')
  //   return true;
  // }
  // router.navigate(['/', 'login']);
  // console.log('utilisateur déconnectéééééééééé'+ auth)
  // return false;

  return true
}

