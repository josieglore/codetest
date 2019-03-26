require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movie-controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/movies/', movieController.getMovies, (req, res) => { 
  return res.status(200).json({ 'movies': res.locals.movies });
});

app.post('/movies/newmovie', movieController.addMovie, (req, res) => {
  return res.status(200).json({ 'new movie added': res.locals.newMovie });
});

app.delete('/movies/deletemovie/:title', movieController.deleteMovie, (req, res) => {
  return res.status(200).json({ 'movie deleted': res.locals.deletedMovie });
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on 3000');
});
