package com.example.backend.repository;

import com.example.backend.model.Rental;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends CrudRepository<Rental, Long> {
    @Query("SELECT r FROM Rental r WHERE r.rentalStatus = 0")
    Iterable<Rental> findActiveRentals();

    @Query("SELECT r FROM Rental r WHERE r.rentalStatus = 1")
    Iterable<Rental> findRentalHistory();
}
