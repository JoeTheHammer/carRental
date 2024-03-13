package com.example.backend.service;

import com.example.backend.model.Car;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface ICarService {

    Iterable<Car> findAll();
    Optional<Car> findById(Long id);
    Car save(Car car);
    void delete(Car car);

    Optional<Long> checkIfCarIsRentedById(Long carId);
}
