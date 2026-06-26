package mk.ukim.finki.wp.lab.controller;

import mk.ukim.finki.wp.lab.model.Book;
import mk.ukim.finki.wp.lab.service.AuthorService;
import mk.ukim.finki.wp.lab.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final AuthorService authorService;

    public BookController(BookService bookService, AuthorService authorService) {
        this.bookService = bookService;
        this.authorService = authorService;
    }

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) Long authorId) {
        if (authorId != null) {
            return bookService.searchBooksByAuthorId(authorId);
        }
        return bookService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.findById(id);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @PostMapping
    public ResponseEntity<Void> saveBook(@RequestBody BookRequest request) {
        bookService.save(request.title(), request.genre(), request.averageRating(), request.authorId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editBook(@PathVariable Long id, @RequestBody BookRequest request) {
        Book existing = bookService.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        bookService.update(id, request.title(), request.genre(), request.averageRating(), request.authorId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        Book existing = bookService.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }

    public record BookRequest(String title, String genre, Double averageRating, Long authorId) {}
}