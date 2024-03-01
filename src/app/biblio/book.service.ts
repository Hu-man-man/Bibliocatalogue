import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Book } from './book'; // Importez le modèle Book
import { getDocs, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private firestore: Firestore) {} // Inject Firestore service

  async getBookList(): Promise<Book[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'books')); // Fetch books from Firestore
      const bookList = querySnapshot.docs.map((doc) => ({
        bookId: doc.id, // Type assertion using spread operator
        ...doc.data() as Book
      }));
      return bookList;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error; // Re-throw the error for handling in the component
    }
  }

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
