package com.example.backend.model;

import com.example.backend.cmd.SaveCustomerCmd;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "email_address")
    private String emailAddress;
    @Column(name = "license_id")
    private String licenseId;
    @Column(name = "register_date")
    private Date registerDate;
    @ManyToOne
    @JoinColumn(name = "residential_address_id")
    private Address residentialAddress;
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private Set<Rental> rentals;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;


    public Customer(){
    }

    public Customer(SaveCustomerCmd saveCustomerCmd){
        this.id = saveCustomerCmd.getId();
        this.firstName = saveCustomerCmd.getFirstName();
        this.lastName = saveCustomerCmd.getLastName();
        this.phoneNumber = saveCustomerCmd.getPhoneNumber();
        this.licenseId = saveCustomerCmd.getLicenseId();
        this.registerDate = saveCustomerCmd.getRegisterDate();
        this.emailAddress = saveCustomerCmd.getEmailAddress();
        this.dateOfBirth = saveCustomerCmd.getDateOfBirth();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getLicenseId() {
        return licenseId;
    }

    public void setLicenseId(String licenseId) {
        this.licenseId = licenseId;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    public Address getResidentialAddress() {
        return residentialAddress;
    }

    public void setResidentialAddress(Address residentialAddress) {
        this.residentialAddress = residentialAddress;
    }

    public Set<Rental> getRentals() {
        return rentals;
    }

    public void addRent(Rental rental) {
        if (this.rentals == null){
            this.rentals = new HashSet<>();
        }
        this.rentals.add(rental);
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(id, customer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
