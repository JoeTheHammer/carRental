package com.example.backend.service;

import com.example.backend.model.Address;

import java.util.Optional;

public interface IAddressService {
    Iterable<Address> findAll();
    Optional<Address> findById(Long id);
    Address save(Address address);
    void delete(Address address);
    Optional<Long> findExistingAddressId(Address address);

    void deleteAddressesNotInUse();
}
