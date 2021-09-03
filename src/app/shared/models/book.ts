import { Author } from "./author";

export interface Book {
    id?: string;
    author: Author;
    title: string;
    publisher: string;
    year: number;
}