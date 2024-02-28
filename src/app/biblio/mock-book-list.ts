import { Book } from "./book";

export const BOOKS: Book[] = [
  {
    id: 0,
    title: "Bible",
    author: "Apotres",
    date: new Date("01/01/0100"),
    tags: ["Religieux", "Foi", "Adultes", "Adolescents", "Enfants", "Familles"],
  },
  {
    id: 1,
    title: "Le Seigneur des anneaux - La Communauté de l'Anneau",
    author: "J. R. R. Tolkien",
    date: new Date("07/29/1954"),
    tags: ["Fantasy", "Quête", "Adultes", "Adolescents", "Jeunes adultes"],
  },
];
