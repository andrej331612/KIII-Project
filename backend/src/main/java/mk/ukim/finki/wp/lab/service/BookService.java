package mk.ukim.finki.wp.lab.service;

import mk.ukim.finki.wp.lab.model.Book;

import java.util.List;

public interface BookService {
    List<Book> listAll();
    Book findById(Long id);
    List<Book> searchBooksByAuthorId(Long authorId);
    void save(String title, String genre, Double averageRating, Long authorId);
    void update(Long id, String title, String genre, Double averageRating, Long authorId);
    void delete(Long id);
}
