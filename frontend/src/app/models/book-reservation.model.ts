export interface BookReservation {
  id?: number;
  bookTitle: string;
  readerName: string;
  readerAddress: string;
  numberOfCopies: number;
  ipAddress?: string;
  createdAt?: string;
}

export interface ReservationRequest {
  selectedBook: string;
  readerName: string;
  readerAddress: string;
  numCopies: number;
}
