import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { BookRequest } from '../../../models/book.model';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = signal(false);
  bookId = signal<number | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  authors = signal<Author[]>([]);

  title = signal('');
  genre = signal('');
  averageRating = signal<number>(0);
  authorId = signal<number | null>(null);

  ngOnInit(): void {
    this.authorService.getAll().subscribe({
      next: (data) => this.authors.set(data)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.isEditMode.set(true);
      this.bookId.set(id);
      this.loading.set(true);

      this.bookService.getById(id).subscribe({
        next: (book) => {
          this.title.set(book.title);
          this.genre.set(book.genre);
          this.averageRating.set(book.averageRating);
          this.authorId.set(book.author.id ?? null);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load book.');
          this.loading.set(false);
        }
      });
    }
  }

  submit(): void {
    const authorId = this.authorId();
    if (authorId == null) {
      this.error.set('Please select an author.');
      return;
    }

    const book: BookRequest = {
      title: this.title(),
      genre: this.genre(),
      averageRating: this.averageRating(),
      authorId
    };

    const id = this.bookId();
    const request = this.isEditMode() && id != null
      ? this.bookService.update(id, book)
      : this.bookService.create(book);

    request.subscribe({
      next: () => this.router.navigate(['/books']),
      error: () => this.error.set('Failed to save book.')
    });
  }
}
