package com.example.backend.service;

import com.example.backend.model.Customer;

public interface ICustomerService {
    Iterable<Customer> findAll();
}
