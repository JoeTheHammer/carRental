package com.example.backend.repository;

import com.example.backend.model.Car;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarRepository extends CrudRepository<Car, Long> {

    @Query("SELECT r.id FROM Rental r WHERE r.car.id = :carId and r.rentalStatus != 1")
    Optional<Long> checkIfCarIsRentedById(Long carId);
}
