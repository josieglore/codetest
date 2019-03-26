const pgClient = require('../models/database');

function getMovies(req, res, next) {
  // const { id } = req.params;
  // const value = [id];
  const getMovieStr = 'SELECT movie_title, photo_url, description, factoid FROM movie_factoids;';
  pgClient.query(getMovieStr, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to retrieve movie factoid' });
    res.locals.movies = result.rows;
    console.log(res.locals.movies)
    next();
  });
}

function addMovie(req, res, next) {
  const { title, url, description, factoid } = req.body;
  const values = [title, url, description, factoid];
  const addMovieStr = 'INSERT INTO movie_factoids(movie_title, photo_url, description, factoid) VALUES ($1, $2, $3, $4);';
  pgClient.query(addMovieStr, values, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to add movie card' });
    res.locals.newMovie = result;
    next();
  });
}

function deleteMovie(req, res, next) {
  const { title } = req.body;
  const value = [title];
  const deleteMovieStr = 'DELETE FROM movie_factoids WHERE movie_title = $1';
  pgClient.query(deleteMovieStr, value, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to delete movie card' });
    res.locals.deletedMovie = result;
    next();
  });
}

module.exports = { getMovies, addMovie, deleteMovie };
