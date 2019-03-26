require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movie-controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.resolve(('../../build'))));
// }
app.use(express.static(__dirname + '/../../build/'));
app.use(express.static(__dirname + '/../../src/css/'));
app.use(express.static(__dirname + '/../../src/js/'));
// express.static(__dirname + '/../../build/');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

// app.get('/build/webpack-bundle.js', (req, res) => {
//   res.header('Content-Type', 'text/javascript');
//   res.sendFile(path.resolve('../../build/webpack-bundle.js'));
//  });

//  app.get('/js/materialie.min.js', (req, res) => {
//   res.header('Content-Type', 'text/javascript');
//   res.sendFile(path.resolve('../client/js/materialize.min.js'));
//  });

app.get('/movies/', movieController.getMovies, (req, res) => { 
  return res.status(200).json({ 'movies': res.locals.movies });
});

app.post('/movies/newmovie', movieController.addMovie, (req, res) => {
  return res.status(200).json({ 'new movie added': res.locals.newMovie });
});

app.delete('/movies/deletemovie/:title', movieController.deleteMovie, (req, res) => {
  return res.status(200).json({ 'movie deleted': res.locals.deletedMovie });
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on 5000');
});
