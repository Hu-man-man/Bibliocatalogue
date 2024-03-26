import { Component, OnInit, inject } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from "@angular/fire/auth";
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-log",
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./log.component.html",
  styles: ``,
})


export  class  LogComponent  implements  OnInit {
  private  auth: Auth = inject(Auth);
  private  provider = new  GoogleAuthProvider();
  user$ = user(this.auth);
  constructor(
    private router: Router
  ) {}  

  ngOnInit(): void {} 

    get currentUser() {
    return this.auth.currentUser;
  }

  // Connecte l'utilisateur

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/book-list']);  // Redirection vers '/book-list' après la connexion
    }).catch((error) => {
      console.error('Error logging in:', error);
    });
  }

  // Déconnecte l'utilisateur


  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/log']); // Redirection vers '/log' après la déconnexion
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }
}

