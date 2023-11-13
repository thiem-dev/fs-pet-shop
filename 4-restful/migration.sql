DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id serial PRIMARY KEY,
    age INTEGER,
    name VARCHAR(255),
    kind VARCHAR(255)
);


INSERT INTO pets (age, name, kind) VALUES 
(5, 'horsey', 'seahorse'),
(13, 'dunky', 'donkey'),
(8, 'kang', 'kangaroo'),
(17, 'blueberry', 'cat');