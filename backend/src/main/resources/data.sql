-- 🔥 REAL AUTHORS (famous writers)
INSERT INTO authors (name, surname, country, biography)
SELECT 'J.R.R.', 'Tolkien', 'United Kingdom', 'Creator of Middle-earth and The Lord of the Rings epic.'
    WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'J.R.R.' AND surname = 'Tolkien');

INSERT INTO authors (name, surname, country, biography)
SELECT 'Isaac', 'Asimov', 'USA', 'Father of robotics and Foundation series.'
    WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Isaac' AND surname = 'Asimov');

INSERT INTO authors (name, surname, country, biography)
SELECT 'Gabriel Garcia', 'Marquez', 'Colombia', 'Magical realism master: One Hundred Years of Solitude.'
    WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Gabriel Garcia' AND surname = 'Marquez');

INSERT INTO authors (name, surname, country, biography)
SELECT 'Jane', 'Austen', 'United Kingdom', 'Romance classic: Pride and Prejudice.'
    WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Jane' AND surname = 'Austen');

INSERT INTO authors (name, surname, country, biography)
SELECT 'Stephen', 'King', 'USA', 'King of horror: 60+ bestsellers.'
    WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Stephen' AND surname = 'King');

-- 🔥 REAL BOOKS (with Goodreads ratings)
INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'The Lord of the Rings', 'Fantasy', 4.52, (SELECT id FROM authors WHERE name = 'J.R.R.' AND surname = 'Tolkien')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Lord of the Rings');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'The Hobbit', 'Fantasy', 4.28, (SELECT id FROM authors WHERE name = 'J.R.R.' AND surname = 'Tolkien')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Hobbit');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'Foundation', 'Science Fiction', 4.17, (SELECT id FROM authors WHERE name = 'Isaac' AND surname = 'Asimov')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Foundation');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'I, Robot', 'Science Fiction', 4.13, (SELECT id FROM authors WHERE name = 'Isaac' AND surname = 'Asimov')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'I, Robot');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'One Hundred Years of Solitude', 'Magical Realism', 4.09, (SELECT id FROM authors WHERE name = 'Gabriel Garcia' AND surname = 'Marquez')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'One Hundred Years of Solitude');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'Love in the Time of Cholera', 'Romance', 3.93, (SELECT id FROM authors WHERE name = 'Gabriel Garcia' AND surname = 'Marquez')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Love in the Time of Cholera');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'Pride and Prejudice', 'Romance', 4.28, (SELECT id FROM authors WHERE name = 'Jane' AND surname = 'Austen')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Pride and Prejudice');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'Sense and Sensibility', 'Romance', 4.09, (SELECT id FROM authors WHERE name = 'Jane' AND surname = 'Austen')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Sense and Sensibility');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'The Shining', 'Horror', 4.21, (SELECT id FROM authors WHERE name = 'Stephen' AND surname = 'King')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Shining');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'It', 'Horror', 4.28, (SELECT id FROM authors WHERE name = 'Stephen' AND surname = 'King')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'It');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT '1984', 'Dystopia', 4.19, (SELECT id FROM authors WHERE name = 'J.R.R.' AND surname = 'Tolkien')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = '1984');

INSERT INTO books (title, genre, average_rating, author_id)
SELECT 'Pet Sematary', 'Horror', 3.90, (SELECT id FROM authors WHERE name = 'Stephen' AND surname = 'King')
    WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'Pet Sematary');

-- 🔥 Sample Reservations (not guarded - transactional demo records, harmless if repeated)
INSERT INTO book_reservations (book_title, reader_name, reader_address, number_of_copies, ip_address, created_at)
SELECT 'The Lord of the Rings', 'Alexander', 'Skopje, Ilinden Blvd', 2, '127.0.0.1', CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM book_reservations WHERE reader_name = 'Alexander' AND book_title = 'The Lord of the Rings');

INSERT INTO book_reservations (book_title, reader_name, reader_address, number_of_copies, ip_address, created_at)
SELECT 'Pride and Prejudice', 'Maria', 'Bitola, Partizanska St', 1, '192.168.1.10', CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM book_reservations WHERE reader_name = 'Maria' AND book_title = 'Pride and Prejudice');