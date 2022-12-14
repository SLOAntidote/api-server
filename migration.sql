CREATE TABLE movies (
    id SERIAL, 
    title VARCHAR(100), 
    personal_rating INTEGER,
    movie_rating VARCHAR(5),
    runtime_minutes INTEGER,
    rewatch BOOLEAN
);

INSERT INTO movies (title, personal_rating, movie_rating, runtime_minutes, rewatch) VALUES ('Everything Everywhere All At Once', 10, 'R', 139, TRUE);
INSERT INTO movies (title, personal_rating, movie_rating, runtime_minutes, rewatch) VALUES ('Jurassic World: Dominion', 4, 'PG-13', 147, FALSE);
