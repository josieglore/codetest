require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movie-controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/movie/:id', movieController.getMovie, (req, res) => { 
  return res.status(200).json({ 'movie title': res.locals.movie });
});
app.post('/movie/newmovie', movieController.addMovie, (req, res) => {
  return res.status(200).json({ 'new movie added': res.locals.newMovie });
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on 3000');
});
