import { Component } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "@angular/fire/auth";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./login.component.html",
  styles: ``,
})
export class LoginComponent {
  constructor(private auth: Auth, private router: Router) {}

  get currentUser() {
    return this.auth.currentUser;
  }


  
  async login() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      // Traiter les informations de l'utilisateur connecté
      console.log(result.user);
      this.router.navigateByUrl('/book-list');
    } catch (error) {
      console.error(error);
    }
  }


  // Déconnecte l'utilisateur

  async logout() {
    try {
      await signOut(this.auth);
      console.log("Utilisateur déconnecté");
    } catch (error) {
      console.error(error);
    }
  }

}
