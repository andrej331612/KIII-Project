package mk.ukim.finki.wp.lab.service.impl;

import mk.ukim.finki.wp.lab.model.BookReservation;
import mk.ukim.finki.wp.lab.repository.BookReservationRepository;
import mk.ukim.finki.wp.lab.service.BookReservationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookReservationServiceImpl implements BookReservationService {

    private final BookReservationRepository bookReservationRepository;

    public BookReservationServiceImpl(BookReservationRepository bookReservationRepository) {
        this.bookReservationRepository = bookReservationRepository;
    }

    @Override
    public BookReservation placeReservation(String bookTitle, String readerName, String readerAddress, long numberOfCopies, String ipAddress) {
        BookReservation reservation = new BookReservation();
        reservation.setBookTitle(bookTitle);
        reservation.setReaderName(readerName);
        reservation.setReaderAddress(readerAddress);
        reservation.setNumberOfCopies(numberOfCopies);
        reservation.setIpAddress(ipAddress);
        return bookReservationRepository.save(reservation);
    }

    @Override
    public List<BookReservation> listAllReservations() {
        List<BookReservation> bookReservations = bookReservationRepository.findAll();
        return bookReservations;
    }
}
