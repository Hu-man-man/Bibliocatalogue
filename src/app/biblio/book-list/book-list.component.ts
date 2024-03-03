import { Component, OnInit } from "@angular/core";
import { Book } from "../book";
import { BookService } from "../book.service";
import { Auth } from "@angular/fire/auth";
import { MatDialog } from "@angular/material/dialog";
import { EditBookComponent } from "../edit-book/edit-book.component";
import { DataBookService } from "../data-book.service";

@Component({
  selector: "app-book-list",
  standalone: true,
  imports: [EditBookComponent],
  templateUrl: "./book-list.component.html",
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  selectedBook: Book | null = null; // Initialize selectedBook to null

  constructor(
    private bookService: BookService,
    private readonly auth: Auth,
    private dialog: MatDialog,
    private dataBookService: DataBookService
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

    // Stocker la donnée à l'aide du service car MAT_DIALOG_DATA de angular marterials ne marche pas.
    this.dataBookService.setData(book);

    this.dialog.open(EditBookComponent, {});
    // modal.afterClosed
  }
}
