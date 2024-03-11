package com.example.backend.controller;

import com.example.backend.dto.CarDTO;
import com.example.backend.model.Car;
import com.example.backend.model.Customer;
import com.example.backend.service.ICarService;
import com.example.backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/car")
public class CarController {

    private final ICarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping(value = "/getAllCars", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public List<CarDTO> getAllCars(){
        List<CarDTO> carDTOList = new ArrayList<>();
        for (Car car : this.carService.findAll()){
            carDTOList.add(new CarDTO(car));
        }
        return carDTOList;
    }

    @GetMapping(value = "/getCar/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public CarDTO getCarById(@PathVariable("id") Long id) {
        return new CarDTO(this.getCarFromId(id, "Car " + id + " not found!"));
    }

    @DeleteMapping("/deleteCar/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public void deleteCarById(@PathVariable("id") Long id) {
        carService.delete(this.getCarFromId(id, "Car " + id + " cannot be deleted because is was not found!"));
    }

    private Car getCarFromId(Long id, String errorMessage){
        return this.carService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage));
    }
}
