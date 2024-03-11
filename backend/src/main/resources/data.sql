DELETE from car;

ALTER SEQUENCE car_id_seq RESTART WITH 1;

INSERT INTO car (id, license_plate, brand, model, color, manufactured_year, mileage) VALUES (1, 'XYZ123', 'Toyota', 'Corolla', 'Blue', 2020, 15000);
INSERT INTO car (id, license_plate, brand, model, color, manufactured_year, mileage) VALUES (2, 'ABC456', 'Honda', 'Civic', 'Red', 2019, 20000);
INSERT INTO car (id, license_plate, brand, model, color, manufactured_year, mileage) VALUES (3, 'DEF789', 'Ford', 'Focus', 'White', 2018, 25000);
