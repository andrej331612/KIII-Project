package mk.ukim.finki.wp.lab.controller;

import mk.ukim.finki.wp.lab.model.Author;
import mk.ukim.finki.wp.lab.model.Book;
import mk.ukim.finki.wp.lab.service.AuthorService;
import mk.ukim.finki.wp.lab.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorService authorService;
    private final BookService bookService;

    public AuthorController(AuthorService authorService, BookService bookService) {
        this.authorService = authorService;
        this.bookService = bookService;
    }

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Author author = authorService.findById(id);
        if (author == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(author);
    }

    @GetMapping("/{authorId}/books")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable Long authorId) {
        Author author = authorService.findById(authorId);
        if (author == null) {
            return ResponseEntity.notFound().build();
        }
        List<Book> books = bookService.searchBooksByAuthorId(authorId);
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Void> saveAuthor(@RequestBody Author author) {
        authorService.save(author.getName(), author.getSurname(), author.getCountry(), author.getBiography());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editAuthor(@PathVariable Long id, @RequestBody Author author) {
        Author existing = authorService.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        authorService.update(id, author.getName(), author.getSurname(), author.getCountry(), author.getBiography());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id) {
        Author existing = authorService.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}