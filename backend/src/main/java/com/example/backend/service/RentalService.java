package com.example.backend.service;

import com.example.backend.model.Rental;
import com.example.backend.repository.RentalRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RentalService implements IRentalService{

    private final RentalRepository rentalRepository;

    public RentalService(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    @Override
    public Iterable<Rental> findAll() {
        return this.rentalRepository.findAll();
    }

    @Override
    public Optional<Rental> findById(Long id) {
        return this.rentalRepository.findById(id);
    }

    @Override
    public Rental save(Rental rental) {
        return this.rentalRepository.save(rental);
    }

    @Override
    public void delete(Rental rental) {
        this.rentalRepository.delete(rental);
    }

    @Override
    public Iterable<Rental> findActiveRentals() {
        return this.rentalRepository.findActiveRentals();
    }

    @Override
    public Iterable<Rental> findRentalHistory() {
        return this.rentalRepository.findRentalHistory();
    }
}
