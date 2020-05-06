package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Ticket;
import com.biotrio.nocristina.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TicketController {

    @Autowired
    TicketRepository ticketRepo;

    /**
     * Get list of tickets for particular booking
     * @param bookingId - (int) id of the booking
     * @return JSON array of Ticket objects
     */
    @GetMapping("/api/tickets/{bookingId}")
    @ResponseBody
    public List<Ticket> ticketsForBooking(@PathVariable int bookingId) {
        return ticketRepo.findTicketsByBookingId(bookingId);
    }

}
