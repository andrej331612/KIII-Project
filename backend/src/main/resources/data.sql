-- 🔥 REAL AUTHORS (famous writers)
INSERT INTO authors (name, surname, country, biography)
VALUES ('J.R.R.', 'Tolkien', 'United Kingdom', 'Creator of Middle-earth and The Lord of the Rings epic.');
INSERT INTO authors (name, surname, country, biography)
VALUES ('Isaac', 'Asimov', 'USA', 'Father of robotics and Foundation series.');
INSERT INTO authors (name, surname, country, biography)
VALUES ('Gabriel Garcia', 'Marquez', 'Colombia', 'Magical realism master: One Hundred Years of Solitude.');
INSERT INTO authors (name, surname, country, biography)
VALUES ('Jane', 'Austen', 'United Kingdom', 'Romance classic: Pride and Prejudice.');
INSERT INTO authors (name, surname, country, biography) VALUES ('Stephen', 'King', 'USA', 'King of horror: 60+ bestsellers.');

-- 🔥 REAL BOOKS (with Goodreads ratings)

INSERT INTO books (title, genre, average_rating, author_id) VALUES ('The Lord of the Rings', 'Fantasy', 4.52, 1);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('The Hobbit', 'Fantasy', 4.28, 1);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('Foundation', 'Science Fiction', 4.17, 2);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('I, Robot', 'Science Fiction', 4.13, 2);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('One Hundred Years of Solitude', 'Magical Realism', 4.09, 3);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('Love in the Time of Cholera', 'Romance', 3.93, 3);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('Pride and Prejudice', 'Romance', 4.28, 4);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('Sense and Sensibility', 'Romance', 4.09, 4);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('The Shining', 'Horror', 4.21, 5);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('It', 'Horror', 4.28, 5);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('1984', 'Dystopia', 4.19, 1);
INSERT INTO books (title, genre, average_rating, author_id) VALUES ('Pet Sematary', 'Horror', 3.90, 5);

-- 🔥 Sample Reservations
INSERT INTO book_reservations (book_title, reader_name, reader_address, number_of_copies, ip_address) VALUES('The Lord of the Rings', 'Alexander', 'Skopje, Ilinden Blvd', 2, '127.0.0.1');
INSERT INTO book_reservations (book_title, reader_name, reader_address, number_of_copies, ip_address) VALUES('Pride and Prejudice', 'Maria', 'Bitola, Partizanska St', 1, '192.168.1.10');
