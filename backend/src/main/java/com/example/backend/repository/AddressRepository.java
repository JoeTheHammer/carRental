package com.example.backend.repository;

import com.example.backend.model.Address;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
    @Query("SELECT a.id FROM Address a WHERE a.addressLine1 = :addressLine1 AND" +
            " a.addressLine2 = :addressLine2 AND a.city = :city AND a.region = :region AND a.postalCode = :postalCode")
    Optional<Long> findExistingAddressId(String addressLine1, String addressLine2, String city, String region, String postalCode);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM address WHERE id NOT IN " +
            "(SELECT DISTINCT residential_address_id FROM customer UNION SELECT billing_address_id FROM rental)", nativeQuery = true)
    void deleteAddressesNotInUse();


}
