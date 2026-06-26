package mk.ukim.finki.wp.lab.service;

import mk.ukim.finki.wp.lab.model.Author;

import java.util.List;

public interface AuthorService {
    List<Author> findAll();
    Author findById(Long id);
    void save(String name, String surname, String country, String biography);
    void update(Long id,String name, String surname, String country, String biography);
    void delete(Long id);
}
