import { Component, OnInit } from '@angular/core';
import  { Book } from '../book';
import { DataBookService } from '../data-book.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [],
  templateUrl: './edit-book.component.html',
  styles: ``
})
export class EditBookComponent implements OnInit {
selectedBook: Book | undefined; 

  constructor(
    private dataBookService: DataBookService
  ) {}

  ngOnInit() {
    // Récupérer la donnée stockée
    this.selectedBook = this.dataBookService.getData();
  }

}
