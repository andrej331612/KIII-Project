import { Author } from './author.model';

export interface Book {
  id?: number;
  title: string;
  genre: string;
  averageRating: number;
  author: Author;
}

export interface BookRequest {
  title: string;
  genre: string;
  averageRating: number;
  authorId: number;
}
