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

module.exports = { getMovie }