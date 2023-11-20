DROP TABLE IF EXISTS  person;

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    fname VARCHAR,
    lname VARCHAR
);

INSERT INTO person (fname, lname) VALUES 
('Ryan', 'Hill'),
('Sarah', 'Love');
