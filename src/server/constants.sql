-- MOVIE_FACTOIDS TABLE
-- Deletes the movie_factoids table
DROP TABLE movie_factoids;

-- Creates the movie_factoids table
CREATE TABLE movie_factoids(
  movie_id SERIAL PRIMARY KEY,
  movie_title VARCHAR,
  photo_url VARCHAR,
  description VARCHAR,
  factoid VARCHAR
);

-- Retrieves the title, picture url, description, and factoid for all movies in the movie_factoids table
SELECT movie_title, photo_url, description, factoid FROM movie_factoids;

-- Inserts new row into movie_factoids table
INSERT INTO movie_factoids(movie_title, photo_url, factoid) 
  VALUES ('2001: A Space Odyssey', 'https://res.cloudinary.com/dvgovtrrs/image/upload/v1553379181/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM_._V1_.jpg', '1968, Directed by Stanley Kubrick, Academy Award for Best Visual Effects');

-- Deletes row from movie_factoids table
DELETE FROM movie_factoids WHERE movie_title = '2001: A Space Odyssey';


