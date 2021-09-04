import { Author } from "./author";

export interface Book {
    bookId?: string;
    author: Author;
    title: string;
    publisher: string;
    year: number;
}