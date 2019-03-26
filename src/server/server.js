require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movie-controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../build/'));
app.use(express.static(__dirname + '/../../src/css/'));
app.use(express.static(__dirname + '/../../src/js/'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});
// route to retrieve movies from database
app.get('/movies/', movieController.getMovies, (req, res) => { 
  return res.status(200).json({ movies: res.locals.movies });
});

// route to post movie to database
app.post('/movies/newmovie', movieController.addMovie, (req, res) => {
  return res.status(200).json({ 'new movie added': res.locals.newMovie });
});

// route to delete movie from database
app.delete('/movies/deletemovie/:title', movieController.deleteMovie, (req, res) => {
  return res.status(200).json({ 'movie deleted': res.locals.deletedMovie });
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on 5000');
});
