import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from "./app/app.component";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { provideAuth } from '@angular/fire/auth';
import { getFirestore } from "firebase/firestore";
import { provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from "@angular/fire/storage";
import { environment } from "./environments/environment.development";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app/app.routes';


const providers = [
  [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom ([ 
      provideFirebaseApp (() => initializeApp (environment.firebaseConfig)),
      provideAuth (() => getAuth ()) , 
      provideFirestore (() => getFirestore ()), 
      provideStorage (() => getStorage ()) 
    ]), 
  ]
];

bootstrapApplication(AppComponent, { providers: [providers] })
  .catch((err: any) => console.error(err));








