import { Component, OnInit, OnChanges, SimpleChanges, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Book } from "../book";
import { BookService } from "../book.service";
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
import { provideNativeDateAdapter } from "@angular/material/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-edit-book",
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
export class EditBookComponent implements OnInit {
  selectedBook: Book | undefined;
  tempBook: Book | undefined;
  editMode: boolean = false; // Start in display mode
  newBook: boolean = false; // Flag to differentiate between creating and editing
  new: Date | undefined;
  isFormValid: boolean = false;

  constructor(
    private bookService: BookService,
    private dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Book,
  ) {}

  ngOnInit(): void {
    // Check if selectedBook is provided for editing, otherwise initialize new book
    this.selectedBook = this.data as Book;
    if (this.selectedBook) {
      this.tempBook = { ...this.selectedBook };
      this.newBook = false;
    } else {
      this.tempBook = {
        bookId: "",
        title: "Nouveau livre",
        date: new Date(),
        author: "",
        tags: [],
        userId: "",
      };
      this.newBook = true;
      this.editMode = true;
    }
    console.log(this.newBook);
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

  checkFormValidity(): void {
    this.isFormValid =
      Boolean(this.tempBook?.title) && Boolean(this.tempBook?.author);
  }

  deleteBook() {
    if (this.selectedBook?.bookId) {
      this.bookService
        .deleteBook(this.selectedBook.bookId)
        .catch((error) => {
          console.error("Error updating book:", error);
        });
    }
  }

  saveModifications(): void {
    if (this.isFormValid) {
      if (this.tempBook && typeof this.tempBook.date === "string") {
        this.tempBook.date = new Date(this.tempBook.date);
      }
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
              this.dialogRef.close({ book: this.selectedBook }); // Emit update event
            })
            .catch((error) => {
              console.error("Error updating book:", error);
            });
        }
        
      }
    }
  }
}
