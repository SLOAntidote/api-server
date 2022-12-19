DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE TABLE movies (
    id SERIAL, 
    title VARCHAR(100), 
    genre TEXT,
    movie_rating VARCHAR(5),
    runtime_minutes INTEGER,
    user_name VARCHAR(50),
    user_rating INTEGER
);

CREATE TABLE users (
    id SERIAL, 
    first_name TEXT, 
    user_name VARCHAR(50), 
    favorite_genre TEXT
);


INSERT INTO movies (title, genre, movie_rating, runtime_minutes, user_name, user_rating) VALUES ('Everything Everywhere All At Once', 'Action', 'R', 139, 'SLOAntidote', 10);
INSERT INTO movies (title, genre, movie_rating, runtime_minutes, user_name, user_rating) VALUES ('Jurassic World: Dominion', 'Action', 'PG-13', 147, 'Mapache1991', 4);

INSERT INTO users (first_name, user_name, favorite_genre) VALUES ('Lance', 'SLOAntidote', 'Thriller');
INSERT INTO users (first_name, user_name, favorite_genre) VALUES ('Edward', 'Mapache1991', 'Action');
