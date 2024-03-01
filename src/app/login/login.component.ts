import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from  '@angular/fire/auth';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';


@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [MatSlideToggleModule,],
  templateUrl: './Login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private auth: Auth, private router: Router) {}
  // private auth: Auth = inject(Auth);

  get currentUser() {
    return this.auth.currentUser;
  }
  
  async login() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      // Traiter les informations de l'utilisateur connecté
      console.log(result.user);
      // const router: Router = inject(Router);
      this.router.createUrlTree(['/', 'book-list']);

    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      // Actions à réaliser après la déconnexion
      console.log('Utilisateur déconnecté');

    } catch (error) {
      console.error(error);
    }
  }

}
