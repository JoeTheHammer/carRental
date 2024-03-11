package com.example.backend.service;

import com.example.backend.model.Address;
import com.example.backend.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService implements IAddressService{

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Iterable<Address> findAll() {
        return this.addressRepository.findAll();
    }

    @Override
    public Optional<Address> findById(Long id) {
        return this.addressRepository.findById(id);
    }

    @Override
    public Address save(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public void delete(Address address) {
        this.addressRepository.delete(address);
    }
}
