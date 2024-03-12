package com.example.backend.controller;

import com.example.backend.dto.CustomerDTO;
import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;
import com.example.backend.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final ICustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping(value = "/getAllCustomers", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public List<CustomerDTO> getAllCustomers(){
        List<CustomerDTO> customerDTOList = new ArrayList<>();
        for (Customer customer : this.customerService.findAll()){
            customerDTOList.add(new CustomerDTO(customer));
        }
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
    }

    private Customer getCustomerFromId(Long id, String errorMessage){
        return this.customerService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, errorMessage));
    }



}
