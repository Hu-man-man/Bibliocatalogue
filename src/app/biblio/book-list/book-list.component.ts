import { Component, OnInit } from "@angular/core";
import { Book } from "../book";
import { BookService } from "../book.service";
import { Auth } from "@angular/fire/auth";
import { MatDialog } from "@angular/material/dialog";
import { EditBookComponent } from "../edit-book/edit-book.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: "app-book-list",
  standalone: true,
  imports: [ MatButtonModule, MatDividerModule, MatIconModule, MatListModule],
  templateUrl: "./book-list.component.html",
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  selectedBook: Book | null = null; // Initialize selectedBook to null

  constructor(
    private bookService: BookService,
    private readonly auth: Auth,
    private dialog: MatDialog,
  ) {}

  get currentUser() {
    return this.auth.currentUser;
  }

  ngOnInit() {
    this.refreshBookList();
  }
  
  // foncion qui récupère les livre de la personne connectée, et est utilisée pour actualiser l'affichage

  refreshBookList() {
    this.bookService
      .getBookListByUid()
      .then((books) => {
        this.bookList = books;
      })
      .catch((error: any) => {
        console.error("Error fetching books:", error);
      });
  }

  // Ouvre EditBookComponent en traanméttant les infos du livre sélectionné

  selectBook(book: Book) {
    this.selectedBook = book;
    const dialogRef = this.dialog.open(EditBookComponent, { data: book, })
    dialogRef.afterClosed().subscribe(() => {
      this.refreshBookList();
      });
        
  }

  // Ouvre EditBookComponent sans paramètres

  newBook() {
    const dialogRef = this.dialog.open(EditBookComponent, {}) // No data needed for creating a new book
    dialogRef.afterClosed().subscribe(() => {
    this.refreshBookList();
    });
  }
}

