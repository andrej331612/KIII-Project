import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './author-form.component.html'
})
export class AuthorFormComponent implements OnInit {
  private authorService = inject(AuthorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = signal(false);
  authorId = signal<number | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  name = signal('');
  surname = signal('');
  country = signal('');
  biography = signal('');

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.isEditMode.set(true);
      this.authorId.set(id);
      this.loading.set(true);

      this.authorService.getById(id).subscribe({
        next: (author) => {
          this.name.set(author.name);
          this.surname.set(author.surname);
          this.country.set(author.country);
          this.biography.set(author.biography);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load author.');
          this.loading.set(false);
        }
      });
    }
  }

  submit(): void {
    const author: Author = {
      name: this.name(),
      surname: this.surname(),
      country: this.country(),
      biography: this.biography()
    };

    const id = this.authorId();
    const request = this.isEditMode() && id != null
      ? this.authorService.update(id, author)
      : this.authorService.create(author);

    request.subscribe({
      next: () => this.router.navigate(['/authors']),
      error: () => this.error.set('Failed to save author.')
    });
  }
}
