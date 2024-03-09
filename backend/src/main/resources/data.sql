DELETE FROM customer;

ALTER SEQUENCE customer_id_seq RESTART WITH 1;

INSERT INTO customer (first_name, last_name, test_value) VALUES ('test', 'user', 'Oichel1');
INSERT INTO customer (first_name, last_name, test_value) VALUES ('test1', 'user1', 'Oichel 2');
INSERT INTO customer (first_name, last_name, test_value) VALUES ('India', 'Steurer', 'Nice');
