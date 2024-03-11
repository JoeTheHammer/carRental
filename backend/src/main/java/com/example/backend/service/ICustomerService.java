package com.example.backend.service;

import com.example.backend.model.Customer;

import java.util.Optional;

public interface ICustomerService {
    Iterable<Customer> findAll();
    Optional<Customer> findById(Long id);
    Customer save(Customer customer);
    void delete(Customer customer);

}
