import { Component, OnInit } from "@angular/core";
import { Book } from "../book";
import { BookService } from "../book.service";
import { Auth } from "@angular/fire/auth";
import { MatDialog } from "@angular/material/dialog";
import { EditBookComponent } from "../edit-book/edit-book.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';


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
    this.bookService
      .getBookListByUid()
      .then((books) => {
        this.bookList = books;
      })
      .catch((error: any) => {
        console.error("Error fetching books:", error);
      });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    console.log("Book selected " + this.selectedBook.title);

    // Open the EditBookComponent with the selected book
    this.dialog
      .open(EditBookComponent, {
        data: book, // Pass the selected book to the component
      })
      
  }

  newBook() {
    this.dialog.open(EditBookComponent, {}) // No data needed for creating a new book
  }
}

