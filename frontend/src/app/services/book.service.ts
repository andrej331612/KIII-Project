import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookRequest } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/books`;

  getAll(authorId?: number): Observable<Book[]> {
    let url = this.baseUrl;
    if (authorId != null) {
      url += `?authorId=${authorId}`;
    }
    return this.http.get<Book[]>(url);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  create(book: BookRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, book);
  }

  update(id: number, book: BookRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
