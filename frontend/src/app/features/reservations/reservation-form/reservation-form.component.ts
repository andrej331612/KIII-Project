import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookReservationService } from '../../../services/book-reservation.service';
import { BookService } from '../../../services/book.service';
import { BookReservation } from '../../../models/book-reservation.model';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reservation-form.component.html'
})
export class ReservationFormComponent implements OnInit {
  private reservationService = inject(BookReservationService);
  private bookService = inject(BookService);

  books = signal<Book[]>([]);
  error = signal<string | null>(null);
  confirmation = signal<BookReservation | null>(null);

  selectedBook = signal('');
  readerName = signal('');
  readerAddress = signal('');
  numCopies = signal<number>(1);

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (data) => this.books.set(data)
    });
  }

  submit(): void {
    this.reservationService.create({
      selectedBook: this.selectedBook(),
      readerName: this.readerName(),
      readerAddress: this.readerAddress(),
      numCopies: this.numCopies()
    }).subscribe({
      next: (reservation) => this.confirmation.set(reservation),
      error: () => this.error.set('Failed to place reservation.')
    });
  }
}
