import { Component, OnInit, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Book } from "../book";
import { BookService } from "../book.service";
import { FormsModule } from "@angular/forms";
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-edit-book",
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./edit-book.component.html",
  styles: ``,
})
export class EditBookComponent implements OnInit {
  selectedBook: Book | undefined;
  tempBook: Book | undefined;
  editMode: boolean = false;
  newBook: boolean = false;
  new: Date | undefined;
  isFormValid: boolean = false;
  stars: any[] = [];

  constructor(
    private bookService: BookService,
    private dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Book // données du livre récupérées de book-list.component
  ) {
    this.tempBook = {
      bookId: "",
      title: "Nouveau livre",
      author: "",
      date: new Date(),
      rating: 1,
      tags: [],
      userId: "",
      comments: "",
    };
  }

  ngOnInit(): void {
    this.stars = [1, 2, 3, 4, 5];

    // Vérifie si selectedBook existe, sinon crée un nouveau livre
    this.selectedBook = this.data as Book;
    if (this.selectedBook) {
      this.tempBook = { ...this.selectedBook };
      this.newBook = false;
    } else {
      this.newBook = true;
      this.editMode = true;
    }
  }

  // Bascule en mode édition

  switchToEditMode(): void {
    this.editMode = true;
  }

  // Enregistre au fur et à mesure la valeur de la date dans tempBook

  onDateChange(value: string): void {
    if (this.tempBook) {
      this.tempBook.date = new Date(value);
    }
    this.checkFormValidity()
  }

  // Assigne l'évoile sélectionnée à une note

  setRating(numberOfStars: number): void {
    if (this.tempBook && this.editMode) {
      this.tempBook.rating = numberOfStars;
    }
    this.checkFormValidity()
  }

  // à la modification vérifie de les données importantes on étées saisies

  checkFormValidity(): void {
    this.isFormValid =
      Boolean(this.tempBook?.title) &&
      Boolean(this.tempBook?.author) &&
      Boolean(this.tempBook?.rating) &&
      Boolean(this.tempBook?.date) &&
      Boolean(this.tempBook?.tags) &&
      Boolean(this.tempBook?.tags)
  }

  // fonction qui permet de supprimer un livre de la db

  deleteBook() {
    if (this.selectedBook?.bookId) {
      this.bookService.deleteBook(this.selectedBook.bookId).catch((error) => {
        console.error("Error updating book:", error);
      });
    }
  }

  // Enregistre les modifications effectuées

  saveModifications(): void {
    if (this.isFormValid) {
      this.selectedBook = this.tempBook;
      this.editMode = false;
      if (this.tempBook) {
        if (this.newBook) {
          this.bookService
            .createBook(this.tempBook)
            .then(() => {})
            .catch((error) => {
              console.error("Error creating book:", error);
            });
        } else {
          this.bookService
            .updateBook(this.tempBook)
            .then(() => {
              this.dialogRef.close({ book: this.selectedBook });
            })
            .catch((error) => {
              console.error("Error updating book:", error);
            });
        }
      }
    }
  }
}
