import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookReservation, ReservationRequest } from '../models/book-reservation.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookReservationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/book-reservations`;

  getAll(): Observable<BookReservation[]> {
    return this.http.get<BookReservation[]>(this.baseUrl);
  }

  create(reservation: ReservationRequest): Observable<BookReservation> {
    return this.http.post<BookReservation>(this.baseUrl, reservation);
  }
}
