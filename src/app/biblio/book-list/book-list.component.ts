// import { Component, OnInit } from "@angular/core";
// import {
//   animate,
//   state,
//   style,
//   transition,
//   trigger,
// } from "@angular/animations";
// import { CommonModule } from "@angular/common";
// import { Book } from "../book";
// import { BookService } from "../book.service";
// import { LogComponent } from "../../log/log.component";
// import { Auth } from "@angular/fire/auth";
// import { MatDialog } from "@angular/material/dialog";
// import { EditBookComponent } from "../edit-book/edit-book.component";
// import { MatIconModule } from "@angular/material/icon";
// import { MatDividerModule } from "@angular/material/divider";
// import { MatButtonModule } from "@angular/material/button";
// import { MatListModule } from "@angular/material/list";
// import { MatTableModule } from "@angular/material/table";

// @Component({
//   selector: "app-book-list",
//   standalone: true,
//   imports: [
//     LogComponent,
//     MatButtonModule,
//     MatDividerModule,
//     MatIconModule,
//     MatListModule,
//     MatTableModule,
//     CommonModule,
//   ],
//   templateUrl: "./book-list.component.html",
//   animations: [
//     trigger('detailExpand', [
//       state('collapsed,void', style({height: '0px', minHeight: '0'})),
//       state('expanded', style({height: '*'})),
//       transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
//     ]),
//   ],
//   styles: [
//     `
//       tr.example-detail-row {
//         height: 0;
//       }
//       tr.example-element-row:not(.example-expanded-row):hover {
//         background: whitesmoke;
//       }

//       tr.example-element-row:not(.example-expanded-row):active {
//         background: #efefef;
//       }

//       .example-element-row td {
//         border-bottom-width: 0;
//       }
//     `,
//   ],
// })
// export class BookListComponent implements OnInit {
//   bookList: Book[] = [];
//   stars: any[] = [];
//   selectedBook: Book | null = null; // Initialize selectedBook to null
//   columnsToDisplay: string[] = ["title", "date", "rating"];
//   columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
//   expandedElement: any = null ;

//   constructor(
//     private bookService: BookService,
//     private readonly auth: Auth,
//     private dialog: MatDialog
//   ) {}

//   get currentUser() {
//     return this.auth.currentUser;
//   }

//   ngOnInit() {
//     this.refreshBookList();
//     this.stars = [1, 2, 3, 4, 5];
//   }

//   // foncion qui récupère les livre de la personne connectée, et est utilisée pour actualiser l'affichage

//   refreshBookList() {
//     this.bookService
//       .getBookListByUid()
//       .then((books) => {
//         this.bookList = books;
//       })
//       .catch((error: any) => {
//         console.error("Error fetching books:", error);
//       });
//   }

//   // Ouvre EditBookComponent en transméttant les infos du livre sélectionné

//   selectBook(book: Book) {
//     this.selectedBook = book;
//     const dialogRef = this.dialog.open(EditBookComponent, { data: book });
//     dialogRef.afterClosed().subscribe(() => {
//       this.refreshBookList();
//     });
//   }

//   // Ouvre EditBookComponent sans paramètres

//   newBook() {
//     const dialogRef = this.dialog.open(EditBookComponent, {}); // No data needed for creating a new book
//     dialogRef.afterClosed().subscribe(() => {
//       this.refreshBookList();
//     });
//   }
// }
import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Book } from "../book";
import { BookService } from "../book.service";
import { LogComponent } from "../../log/log.component";
import { Auth } from "@angular/fire/auth";
import { EditBookComponent } from "../edit-book/edit-book.component";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-book-list",
  standalone: true,
  imports: [
    LogComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: "./book-list.component.html",
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styles: [
    `
      tr.example-detail-row {
        height: 0;
      }
      tr.example-element-row:not(.example-expanded-row):hover {
        background: whitesmoke;
      }

      tr.example-element-row:not(.example-expanded-row):active {
        background: #efefef;
      }

      .example-element-row td {
        border-bottom-width: 0;
      }
    `,
  ],
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  stars: any[] = [];
  selectedBook: Book | null = null; // Initialize selectedBook to null
  columnsToDisplay: string[] = ["title", "date", "rating"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  expandedElement: any = null ;
  private bookListSubscription?: Subscription;

  constructor(
    private bookService: BookService,
    private readonly auth: Auth,
    private dialog: MatDialog
  ) {}

  get currentUser() {
    return this.auth.currentUser;
  }

  ngOnInit() {
    this.refreshBookList();
    this.stars = [1, 2, 3, 4, 5];
  }

  // foncion qui récupère les livre de la personne connectée, et est utilisée pour actualiser l'affichage

  refreshBookList() {
    this.bookListSubscription = this.bookService.bookList$.subscribe((bookList) => {
      this.bookList = bookList;
    });
    this.bookService.getBookListByUid().catch((error: any) => {
      console.error("Error fetching books:", error);
    });
  }

  // Ouvre EditBookComponent en transméttant les infos du livre sélectionné

  selectBook(book: Book) {
    this.selectedBook = book;
    const dialogRef = this.dialog.open(EditBookComponent, { data: book });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshBookList();
    });
  }

  // Ouvre EditBookComponent sans paramètres

  newBook() {
    const dialogRef = this.dialog.open(EditBookComponent, {}); // No data needed for creating a new book
    dialogRef.afterClosed().subscribe(() => {
      this.refreshBookList();
    });
  }

  // Désabonne bookList$ lorsque le composant est détruit

  ngOnDestroy() {
    if (this.bookListSubscription) {
      this.bookListSubscription.unsubscribe();
    }
  }
}


