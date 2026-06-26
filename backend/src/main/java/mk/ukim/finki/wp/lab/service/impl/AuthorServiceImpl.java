package mk.ukim.finki.wp.lab.service.impl;

import mk.ukim.finki.wp.lab.model.Author;
import mk.ukim.finki.wp.lab.repository.AuthorRepository;
import mk.ukim.finki.wp.lab.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    @Override
    public Author findById(Long id) {
        return authorRepository.findById(id).orElse(null);
    }

    @Override
    public void save(String name, String surname, String country, String biography) {
        Author author = new Author();
        author.setName(name);
        author.setSurname(surname);
        author.setCountry(country);
        author.setBiography(biography);
        authorRepository.save(author);
    }

    @Override
    public void update(Long id, String name, String surname, String country, String biography) {
        Author existingAuthor = findById(id);
        if(existingAuthor == null){
            throw new IllegalArgumentException("Author not found: " + id);
        }
        existingAuthor.setName(name);
        existingAuthor.setSurname(surname);
        existingAuthor.setCountry(country);
        existingAuthor.setBiography(biography);
        authorRepository.save(existingAuthor);
    }

    @Override
    public void delete(Long id) {
        authorRepository.deleteById(id);
    }
}
