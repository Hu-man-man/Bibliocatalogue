import { Injectable } from "@angular/core";
import { Firestore, addDoc, deleteDoc, updateDoc } from "@angular/fire/firestore";
import { Timestamp } from "@firebase/firestore";
import { Book } from "./book";
import {
  getDocs,
  collection,
  doc,
  query,
  where,
} from "@angular/fire/firestore";
import { BehaviorSubject } from 'rxjs';
import { Auth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class BookService {

  private bookListSubject = new BehaviorSubject<Book[]>([]); // BehaviorSubject Observable et un Observateur, emet la dernière valeur à ses observateurs lorsqu’ils s’abonnent.
  bookList$ = this.bookListSubject.asObservable();

  constructor(private firestore: Firestore, private readonly auth: Auth) {}

  async getBookListByUid(): Promise<void> {
    try {
      const uid = await new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            resolve(user.uid);
          } else {
            reject("User not authenticated");
          }
        });
      });

      const querySnapshot = await getDocs(
        query(collection(this.firestore, "books"), where("userId", "==", uid))
      );
      const bookList = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Book;
        if (data.date instanceof Timestamp) {
          data.date = data.date.toDate();
        }
        data.bookId = doc.id;
        return {
          ...data,
        };
      });

      this.bookListSubject.next(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }


  // Modifier les informations d'un livre

  async updateBook(book: Book): Promise<void> {
    console.log();
    try {
      if (!book.bookId) {
        throw new Error("Book ID is undefined");
      }

      const bookId = String(book.bookId);
      const bookRef = doc(this.firestore, "books", bookId);

      await 
      updateDoc(bookRef, JSON.parse(JSON.stringify(book)));
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  }

  // Créer un nouveau livre dans la db

  async createBook(book: Book): Promise<void> {
    try {
      const uid = this.auth.currentUser?.uid;
      if (!uid) {
        throw new Error("User not authenticated");
      }

      // Ajoute l'id de user au livre
      book.userId = uid;

      const booksCollection = collection(this.firestore, "books");
      await addDoc(booksCollection, book);
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }

  // Supprimer un livre de la db

  async deleteBook(bookId: string): Promise<void> {
    try {
      if (!bookId) {
        throw new Error('Book ID is undefined');
      }
  
      const bookRef = doc(this.firestore, 'books', bookId);
      await deleteDoc(bookRef);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
  
}
