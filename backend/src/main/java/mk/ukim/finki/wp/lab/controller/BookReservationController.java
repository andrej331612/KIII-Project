package mk.ukim.finki.wp.lab.controller;

import mk.ukim.finki.wp.lab.model.BookReservation;
import mk.ukim.finki.wp.lab.service.BookReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api/book-reservations")
public class BookReservationController {

    private final BookReservationService bookReservationService;

    public BookReservationController(BookReservationService bookReservationService) {
        this.bookReservationService = bookReservationService;
    }

    @PostMapping
    public ResponseEntity<?> processReservation(
            @RequestBody ReservationRequest request,
            HttpServletRequest httpRequest) {

        try {
            String ipAddress = httpRequest.getRemoteAddr();

            BookReservation reservation = bookReservationService.placeReservation(
                    request.selectedBook(),
                    request.readerName(),
                    request.readerAddress(),
                    request.numCopies(),
                    ipAddress
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(reservation);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<BookReservation> listAllReservations() {
        return bookReservationService.listAllReservations();
    }

    public record ReservationRequest(String selectedBook, String readerName, String readerAddress, Long numCopies) {}
}