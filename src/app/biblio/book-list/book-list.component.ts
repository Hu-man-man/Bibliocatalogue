
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  selectedBook: Book | null = null; // Initialize selectedBook to null

  constructor(private bookService: BookService) {} 

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
