import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Book } from './book'; // Importez le modèle Book
import { getDocs, collection, doc, query, where } from '@angular/fire/firestore';
import { Auth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    private firestore: Firestore,
    private readonly auth: Auth
  ) {}


  // Récupère toute la liste de Book dans la db

  async getBookList(): Promise<Book[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'books')); // Fetch books from Firestore
      const bookList = querySnapshot.docs.map((doc) => ({
        bookId: doc.id, // Type assertion using spread operator
        ...doc.data() as Book
      }));
      console.log('bookList: ' + bookList[0].userId);
      console.log('auth: ' + this.auth.currentUser?.uid);

      return bookList;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error; // Re-throw the error for handling in the component
    }
  }

  // Récupère la liste de book de l'user connecté

  async getBookListByUid(): Promise<Book[]> {
    try {  
      
      //Création d'une promesse pour attendre le chargement
      const uid = await new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged(user => {
          if (user) {
            resolve(user.uid);
          } else {
            reject('User not authenticated');
          }
        });
      });

      const querySnapshot = await getDocs(query(collection(this.firestore, 'books'), where('userId', '==', uid))); // Fetch books from Firestore
      const bookList = querySnapshot.docs.map((doc) => ({
        bookId: doc.id, // Type assertion using spread operator
        ...doc.data() as Book
      }));

      return bookList;

      } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Re-throw the error for handling in the component
        
    }}
      


  async getBookByTitle(title: string): Promise<Book | null> {
    try {
      const books = await this.getBookList(); // Fetch all books first
      const matchingBook = books.find(book => book.title === title);
      return matchingBook ? matchingBook : null; // Return book or null
    } catch (error) {
      console.error('Error finding book by title:', error);
      throw error; // Re-throw for component handling
    }
  }


}
