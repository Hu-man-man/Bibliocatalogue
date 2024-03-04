import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Book } from "../book";
import { DataBookService } from "../data-book.service";
import { BookService } from "../book.service";
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-new-book",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: "./edit-book.component.html",
  styles: ``,
})
export class NewBookComponent implements OnInit {
  selectedBook: Book | undefined;
  tempBook: Book | undefined;
  editMode = true;
  new: Date | undefined;
  isFormValid: boolean = false;

  constructor(private bookService: BookService) {
    this.tempBook = new Book();
  }

  ngOnInit(): void {
    this.tempBook = {
      bookId: "",
      title: "Nouveau livre",
      date: new Date(),
      author: "",
      tags: [],
      userId: "",
    };
  }

  switchToEditMode(): void {
    this.editMode = true; // Basculer entre le mode édition et le mode affichage
    this.tempBook = this.selectedBook ? { ...this.selectedBook } : new Book();
  }

  onDateChange(value: string): void {
    if (this.tempBook) {
      this.tempBook.date = new Date(value);
    }
  }

  // Vérifie si toutes les entrées importantes du formulaire sont remplies
  checkFormValidity(): void {
    this.isFormValid =
      Boolean(this.tempBook?.title) && Boolean(this.tempBook?.author);
  }

  // Supprime le livre
  deleteBook() {
    if (this.selectedBook?.bookId) {
      this.bookService
        .deleteBook(this.selectedBook.bookId)
        .catch((error) => {
          console.error("Error updating book:", error);
        });
    }
  }

  //Enregistre les modification du livre
  saveModifications(): void {
    if (this.isFormValid) {
      if (this.tempBook && typeof this.tempBook.date === "string") {
        // Convertir la date en chaîne de caractères en un objet Date
        this.tempBook.date = new Date(this.tempBook.date);
      }
      this.editMode = false;
      if (this.tempBook) {
        this.bookService
          .createBook(this.tempBook)
          .then(() => {})
          .catch((error) => {
            console.error("Error creating book:", error);
          });
      }
    }
  }
}
