package com.biotrio.nocristina.services;

import com.biotrio.nocristina.models.Cinema;
import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.models.Theater;
import com.biotrio.nocristina.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreeningService {

    @Autowired
    private TheaterRepository theaterRepo;

    @Autowired
    private ScreeningRepository screeningRepo;

    @Autowired
    private MovieRepository movieRepo;

    @Autowired
    private CinemaRepository cinemaRepo;


    public List<Screening> getAllScreenings() {
        List<Screening> screenings = screeningRepo.findAll();

        return screenings;
    }

    public List<Screening> getScreeningsByDate(String date) {
        List<Screening> screenings = screeningRepo.findByDate(date);
        return screenings;
    }
  
    public List<Screening> getBetweenDates(String date1, String date2) {
        List<Screening> screenings = screeningRepo.findBetweenDates(date1, date2);

        return screenings;
    }

    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }


    public List<Screening> getByMovieId(int movieId) {
        List<Screening> screenings = screeningRepo.findByMovieId(movieId);

        return screenings;

    }

    public List<Theater> getAllTheaters () {
        return theaterRepo.findAll();
    }

    public int addScreening(Screening newScreening){
        int screeningId = screeningRepo.addScreening(newScreening);

        return screeningId;
    }

    public void deleteScreening(int screeningId){
        screeningRepo.deleteOne(screeningId);
    }

    public Screening findById(int screeningId) {
        Screening screening = screeningRepo.findOne(screeningId);
        return screening;
    }

    public void editScreening(int id, Screening screening) {
        screeningRepo.updateOne(id, screening);
    }

    public Cinema getOneCinema (int cinemaId) {return cinemaRepo.findOne(cinemaId);}
}
