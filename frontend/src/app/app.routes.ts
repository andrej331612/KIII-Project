import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'authors',
    loadChildren: () => import('./features/authors/authors.routes').then(m => m.AUTHORS_ROUTES)
  },
  {
    path: 'books',
    loadChildren: () => import('./features/books/books.routes').then(m => m.BOOKS_ROUTES)
  },
  {
    path: 'reservations',
    loadChildren: () => import('./features/reservations/reservations.routes').then(m => m.RESERVATIONS_ROUTES)
  }
];
