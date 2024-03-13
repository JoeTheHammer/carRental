package com.example.backend.controller;

import com.example.backend.cmd.SaveRentalCmd;
import com.example.backend.dto.RentalDTO;
import com.example.backend.model.*;
import com.example.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/api/rental")
public class RentalController {
    private final ICustomerService customerService;
    private final IRentalService rentalService;
    private final ICarService carService;
    private final IAddressService addressService;

    @Autowired
    public RentalController(CustomerService customerService, RentalService rentalService, CarService carService, AddressService addressService) {
        this.rentalService = rentalService;
        this.customerService = customerService;
        this.carService = carService;
        this.addressService = addressService;
    }

    @GetMapping(value = "/getActiveRentals", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public List<RentalDTO> getActiveRentals(){
        List<RentalDTO> rentalDTOList = new ArrayList<>();

        for (Rental rental: this.rentalService.findActiveRentals()){
            rentalDTOList.add(createRentalDTO(rental));
        }

        return rentalDTOList;
    }

    @GetMapping(value = "/getRentalHistory", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public List<RentalDTO> getRentalHistory(){
        List<RentalDTO> rentalDTOList = new ArrayList<>();

        for (Rental rental: this.rentalService.findRentalHistory()){
            rentalDTOList.add(createRentalDTO(rental));
        }

        return rentalDTOList;
    }

    @PostMapping("/closeRental/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public void closeRental(@PathVariable("id") Long rentalId) {
        Optional<Rental> optionalRental = this.rentalService.findById(rentalId);
        if (optionalRental.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental was not found!");
        }
        Rental rental = optionalRental.get();
        rental.setRentalStatus(RentalStatus.FINISHED);
        this.rentalService.save(rental);
    }

    @PostMapping("/saveRental")
    @CrossOrigin(origins = "http://localhost:5173")
    public void saveRental(@RequestBody SaveRentalCmd saveRentalCmd){
        if (saveRentalCmd == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request was null!");
        }

        Rental rental = new Rental(saveRentalCmd);
        Customer customer = getCustomerFromId(saveRentalCmd.getCustomerId());
        Car car = getCarFromId(saveRentalCmd.getCarId());

        rental.setRentalStatus(RentalStatus.ONGOING);
        rental.setCar(car);
        rental.setCustomer(customer);
        rental.setStartDate(new Date());

        if (saveRentalCmd.isTwoAddresses()){
            Address address = new Address(saveRentalCmd);
            Optional<Long> optionalAddressId = this.addressService.findExistingAddressId(address);
            if (optionalAddressId.isPresent()){
                address.setId(optionalAddressId.get());
            }
            // Address is created if not already present, otherwise existing is used.
            address = this.addressService.save(address);
            rental.setBillingAddress(address);
        } else {
            rental.setBillingAddress(customer.getResidentialAddress());
        }

        this.rentalService.save(rental);

    }

    private Customer getCustomerFromId(Long id){
        return this.customerService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental cannot be created, customer was not found!"));
    }

    private Car getCarFromId(Long id){
        return this.carService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental cannot be created, car was not found!"));
    }


    private RentalDTO createRentalDTO(Rental rental) {
        RentalDTO rentalDTO = new RentalDTO();
        rentalDTO.setId(rental.getId());
        rentalDTO.setCarInformation(rental.getCar().getBrand() + " " + rental.getCar().getModel());
        rentalDTO.setCustomerName(rental.getCustomer().getFirstName() + " " + rental.getCustomer().getLastName());
        rentalDTO.setLicensePlate(rental.getCar().getLicensePlate());
        rentalDTO.setStartDate(rental.getStartDate());
        rentalDTO.setEndDate(rental.getEndDate());
        rentalDTO.setRentedKilometers(rental.getRentedKilometers());
        rentalDTO.setBillingAddress(rental.getBillingAddress().getAddressLine1() + " " +
                rental.getBillingAddress().getAddressLine2() + ", " + rental.getBillingAddress().getPostalCode() + " " +
                rental.getBillingAddress().getCity() + "; " + rental.getBillingAddress().getCountry());

        return rentalDTO;
    }
}
