package com.example.backend.controller;

import com.example.backend.cmd.SaveCarCmd;
import com.example.backend.cmd.SaveCustomerCmd;
import com.example.backend.dto.CarDTO;
import com.example.backend.dto.CustomerDTO;
import com.example.backend.model.Address;
import com.example.backend.model.Car;
import com.example.backend.model.Customer;
import com.example.backend.service.AddressService;
import com.example.backend.service.CustomerService;
import com.example.backend.service.IAddressService;
import com.example.backend.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final ICustomerService customerService;
    private final IAddressService addressService;

    @Autowired
    public CustomerController(CustomerService customerService, AddressService addressService) {
        this.customerService = customerService;
        this.addressService = addressService;
    }

    @GetMapping(value = "/getAllCustomers", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public List<CustomerDTO> getAllCustomers(){
        List<CustomerDTO> customerDTOList = new ArrayList<>();
        for (Customer customer : this.customerService.findAll()){
            customerDTOList.add(new CustomerDTO(customer));
        }

        // Sort by ID to ensure that list in frontend stays the same after reload.
        customerDTOList.sort(Comparator.comparingLong(CustomerDTO::getId));

        return customerDTOList;
    }

    @GetMapping(value = "/getCustomer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public CustomerDTO getCustomerById(@PathVariable("id") Long id) {
        return new CustomerDTO(this.getCustomerFromId(id, "Customer " + id + " not found!"));
    }

    @DeleteMapping("/deleteCustomer/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public void deleteCustomerById(@PathVariable("id") Long id) {
        customerService.delete(this.getCustomerFromId(id,
                "Customer " + id + " cannot be deleted because it was not found!"));
        // Old address might not be in use anymore.
        addressService.deleteAddressesNotInUse();
    }

    @PostMapping("/saveCustomer")
    @CrossOrigin(origins = "http://localhost:5173")
    public void saveCustomer(@RequestBody SaveCustomerCmd saveCustomerCmd){
        if (saveCustomerCmd == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request was null!");
        }

        Address address = new Address(saveCustomerCmd);
        // Check if address exists, then use this, if not, create new one.
        Optional<Long> optionalAddressId = this.addressService.findExistingAddressId(address);
        if (optionalAddressId.isPresent()){
            address.setId(optionalAddressId.get());
        }

        address = this.addressService.save(address);

        Customer customer = new Customer(saveCustomerCmd);
        customer.setResidentialAddress(address);

        this.customerService.save(customer);

        // Old address might not be in use anymore if address has changed.
        this.addressService.deleteAddressesNotInUse();

    }

    private Customer getCustomerFromId(Long id, String errorMessage){
        return this.customerService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage));
    }



}
