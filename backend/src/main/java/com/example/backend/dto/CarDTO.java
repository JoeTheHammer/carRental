package com.example.backend.dto;

import com.example.backend.model.Car;

public class CarDTO {

    private Long id;
    private String licensePlate;
    private String brand;
    private String model;
    private String color;
    private int manufacturedYear;
    private int mileage;

    public CarDTO(Car car){
        this.id = car.getId();
        this.licensePlate = car.getLicensePlate();
        this.brand = car.getBrand();
        this.model = car.getModel();
        this.color = car.getColor();
        this.manufacturedYear = car.getManufacturedYear();
        this.mileage = car.getMileage();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getManufacturedYear() {
        return manufacturedYear;
    }

    public void setManufacturedYear(int manufacturedYear) {
        this.manufacturedYear = manufacturedYear;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

}
