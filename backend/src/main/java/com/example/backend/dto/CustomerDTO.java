package com.example.backend.dto;

import com.example.backend.model.Customer;

import java.util.Date;

public class CustomerDTO {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String emailAddress;
    private String licenseId;
    private Date registerDate;
    private String country;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String region;
    private String postalCode;


    public CustomerDTO(Customer customer){
        this.firstName = customer.getFirstName();
        this.lastName = customer.getLastName();
        this.phoneNumber = customer.getPhoneNumber();
        this.emailAddress = customer.getEmailAddress();
        this.licenseId = customer.getLicenseId();
        this.registerDate = customer.getRegisterDate();
        if (customer.getResidentialAddress() != null){
            this.country = customer.getResidentialAddress().getCountry();
            this.addressLine1 = customer.getResidentialAddress().getAddressLine1();
            this.addressLine2 = customer.getResidentialAddress().getAddressLine2();
            this.city = customer.getResidentialAddress().getCity();
            this.region = customer.getResidentialAddress().getRegion();
            this.postalCode = customer.getResidentialAddress().getPostalCode();
        }
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
}
