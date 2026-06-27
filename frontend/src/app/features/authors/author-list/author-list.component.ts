import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent implements OnInit {
  private authorService = inject(AuthorService);

  authors = signal<Author[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.authorService.getAll().subscribe({
      next: (data) => {
        this.authors.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load authors.');
        this.loading.set(false);
      }
    });
  }

  deleteAuthor(id: number): void {
    if (!confirm('Delete this author? This cannot be undone.')) {
      return;
    }
    this.authorService.delete(id).subscribe({
      next: () => {
        this.authors.set(this.authors().filter(a => a.id !== id));
      },
      error: () => {
        this.error.set('Failed to delete author.');
      }
    });
  }
}
