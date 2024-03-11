package com.example.backend.service;

import com.example.backend.model.Rental;

import java.util.Optional;

public interface IRentalService {
    Iterable<Rental> findAll();
    Optional<Rental> findById(Long id);
    Rental save(Rental rental);
    void delete(Rental rental);
}
