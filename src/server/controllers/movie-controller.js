const pgClient = require('../models/database');

function getMovie(req, res, next) {
  const { id } = req.params;
  const value = [id];
  const getMovieStr = 'SELECT * FROM movie_factoids WHERE movie_id = $1';
  pgClient.query(getMovieStr, value, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to retrieve movie factoid' });
    res.locals.movie = result.rows[0];
    console.log(res.locals.movie)
    next();
  });
}

function addMovie(req, res, next) {
  const { title, url, factoid } = req.body;
  const values = [title, url, factoid];
  const addMovieStr = 'INSERT INTO movie_factoids(movie_title, photo_url, factoid) VALUES ($1, $2, $3)';
  pgClient.query(addMovieStr, values, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to add movie card' });
    res.locals.newMovie = result;
    console.log(res.locals.newMovie);
    next();
  });
}

module.exports = { getMovie, addMovie }