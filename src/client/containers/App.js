import React, { Component } from 'react';
import axios from 'axios';
import FactoidCard from '../components/FactoidCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      title: '',
      url: '',
      factoid: ''
    }
    this.getMovies = this.getMovies.bind(this);
  }
  getMovies() {
    axios.get('http://localhost:3000/movies/')
      .then(response => {
        const movieArray = [];
        response.data.movies.forEach((movie) => {
          movieArray.push(movie);
          // console.log(movieArray)
        }
        )
        // console.log('responseData is', response.data.movies);
      this.setState({
        movies: movieArray,
        title: movieArray[0].movie_title,
        url: movieArray[0].photo_url,
        factoid: movieArray[0].factoid
      })
    })
      .catch( err => {
        console.log(err)
    })
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    return (
      <div>
        <h1>Movies</h1>
        <FactoidCard />
      </div>
    );
  }
}

export default App;
