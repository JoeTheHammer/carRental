
DELETE FROM customer;
ALTER SEQUENCE customer_id_seq RESTART WITH 1;

DELETE FROM address;
ALTER SEQUENCE address_id_seq RESTART WITH 1;

DELETE FROM car;
ALTER SEQUENCE car_id_seq RESTART WITH 1;

INSERT INTO address (country, address_line_1, address_line_2, city, region, postal_code)
VALUES ('Country1', '123 Main St', 'Apt 1', 'City1', 'Region1', '12345'),
       ('Country2', '456 Second St', NULL, 'City2', 'Region2', '67890');

INSERT INTO customer (first_name, last_name, phone_number, email_address, license_id, register_date, residential_address_id)
VALUES ('John', 'Doe', '1234567890', 'john.doe@example.com', 'LIC123', '2023-01-01', 1),
       ('Jane', 'Doe', '0987654321', 'jane.doe@example.com', 'LIC456', '2023-01-02', 2);

INSERT INTO car (license_plate, brand, model, color, manufactured_year, mileage) VALUES
                                                                                     ('XYZ123', 'Toyota', 'Corolla', 'Blue', 2020, 15000),
                                                                                     ('ABC456', 'Honda', 'Civic', 'Red', 2019, 20000),
                                                                                     ('DEF789', 'Ford', 'Focus', 'White', 2018, 25000);
