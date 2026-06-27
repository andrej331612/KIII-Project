import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { Book } from '../../../models/book.model';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private route = inject(ActivatedRoute);

  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  selectedAuthor = signal<Author | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const authorIdParam = this.route.snapshot.queryParamMap.get('authorId');
    const authorId = authorIdParam ? Number(authorIdParam) : undefined;

    this.authorService.getAll().subscribe({
      next: (data) => this.authors.set(data)
    });

    this.bookService.getAll(authorId).subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load books.');
        this.loading.set(false);
      }
    });

    if (authorId != null) {
      this.authorService.getById(authorId).subscribe({
        next: (author) => this.selectedAuthor.set(author)
      });
    }
  }

  deleteBook(id: number): void {
    if (!confirm('Delete this book? This cannot be undone.')) {
      return;
    }
    this.bookService.delete(id).subscribe({
      next: () => {
        this.books.set(this.books().filter(b => b.id !== id));
      },
      error: () => {
        this.error.set('Failed to delete book.');
      }
    });
  }
}
