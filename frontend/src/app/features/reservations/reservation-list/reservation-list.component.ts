import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookReservationService } from '../../../services/book-reservation.service';
import { BookReservation } from '../../../models/book-reservation.model';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  private reservationService = inject(BookReservationService);

  reservations = signal<BookReservation[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.reservationService.getAll().subscribe({
      next: (data) => {
        this.reservations.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load reservations.');
        this.loading.set(false);
      }
    });
  }
}
