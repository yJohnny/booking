package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class MovieRepository implements IRepository<Movie>{

    @Autowired
    private JdbcTemplate jdbc;


    public List<Movie> findAll(){

        String sql = "SELECT * FROM movies";
        List<Movie> movies = jdbc.query(sql, new BeanPropertyRowMapper<>(Movie.class));

        return movies;
    }

    public Movie findOne(int movieId) {

        String sql = "SELECT * FROM movies WHERE id = ?";
        Movie movie = jdbc.queryForObject(sql, new Object[] {movieId}, new BeanPropertyRowMapper<>(Movie.class));

        return movie;
    }

    public int saveOne(Movie newMovie){

        String sql = "INSERT INTO movies VALUES(?,?);";
        jdbc.update((Connection connection)->{

            PreparedStatement ps = connection.prepareStatement(sql);

                ps.setInt(1, newMovie.getId());
                ps.setString(2, newMovie.getTitle());

                return ps;
            });

        return newMovie.getId();
    }



    public void deleteOne(int id){

        String sql = "DELETE FROM movies WHERE id =?";
        jdbc.update(sql, id);

    }

    @Override
    public void updateOne(int id, Movie itemToUpdate) {

    }

}

