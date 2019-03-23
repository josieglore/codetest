require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movie-controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('movie/:id', movieController.getMovie);
app.post('/movie/newmovie', movieController.addMovie);

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on 3000');
});
