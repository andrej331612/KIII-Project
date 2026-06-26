package mk.ukim.finki.wp.lab.service.impl;

import mk.ukim.finki.wp.lab.model.Author;
import mk.ukim.finki.wp.lab.model.Book;
import mk.ukim.finki.wp.lab.repository.AuthorRepository;
import mk.ukim.finki.wp.lab.repository.BookRepository;
import mk.ukim.finki.wp.lab.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Book> listAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public List<Book> searchBooksByAuthorId(Long authorId) {
        return bookRepository.findAllByAuthor_Id(authorId);
    }


    @Override
    public void save(String title, String genre, Double averageRating, Long authorId) {
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException("Author not found: " + authorId));;

        Book book = new Book();
        book.setTitle(title);
        book.setGenre(genre);
        book.setAverageRating(averageRating);
        book.setAuthor(author);

        bookRepository.save(book);
    }

    @Override
    public void update(Long id, String title, String genre, Double averageRating, Long authorId) {

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));

        Book existingBook = findById(id);
        if (existingBook == null) {
            throw new IllegalArgumentException("Book not found: " + id);
        }
        existingBook.setTitle(title);
        existingBook.setGenre(genre);
        existingBook.setAverageRating(averageRating);
        existingBook.setAuthor(author);

        bookRepository.save(existingBook);
    }

    @Override
    public void delete(Long id) {
        bookRepository.deleteById(id);
    }
}
