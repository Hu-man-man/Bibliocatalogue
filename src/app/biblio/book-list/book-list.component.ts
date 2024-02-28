import { Component } from '@angular/core';
import { BOOKS } from '../mock-book-list';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styles: ``
})
export class BookListComponent {
  bookList: Book[] = BOOKS;

  ngOnInit() {
    // console.table(this.bookList);
  }

  selectBook(book: Book) {
    console.log(`Vous avec sélectionné ${book.title}`);
  }

}
