
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Auth } from '@angular/fire/auth';
import { EditBookComponent } from '../edit-book/edit-book.component';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [EditBookComponent],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  selectedBook: Book | null = null; // Initialize selectedBook to null

  constructor(
    private bookService: BookService,
    private readonly auth: Auth
  ) {} 

  get currentUser() {
    return this.auth.currentUser;
  }

  ngOnInit() {
    this.bookService.getBookList().then((books) => {
      this.bookList = books;
      })
      .catch((error: any) => {
        console.error('Error fetching books:', error);
      });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    console.log('Book selected '+ this.selectedBook.title);
  }
}
