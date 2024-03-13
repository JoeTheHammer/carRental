package com.example.backend.service;

import com.example.backend.model.Car;
import com.example.backend.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarService implements ICarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }


    @Override
    public Iterable<Car> findAll() {
        return this.carRepository.findAll();
    }

    @Override
    public Optional<Car> findById(Long id) {
        return this.carRepository.findById(id);
    }

    @Override
    public Car save(Car car) {
        return this.carRepository.save(car);
    }

    @Override
    public void delete(Car car) {
        this.carRepository.delete(car);
    }

    @Override
    public Optional<Long> checkIfCarIsRentedById(Long carId) {
        return this.carRepository.checkIfCarIsRentedById(carId);
    }
}
