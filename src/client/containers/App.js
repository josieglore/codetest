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
      description: '',
      factoid: '',
      newTitle: '',
      newUrl: '',
      newDescription: '',
      newFactoid: '',
      index: 0,
    }
    this.getMovies = this.getMovies.bind(this);
    this.getNextFactoid = this.getNextFactoid.bind(this);
    this.getPreviousFactoid = this.getPreviousFactoid.bind(this);
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
        description: movieArray[0].description,
        factoid: movieArray[0].factoid
      })
    })
      .catch( err => {
        console.log(err)
    })
  }
  getNextFactoid() {
    const { index, movies } = this.state;
    const newIndex = index + 1;
    this.setState({
      title: movies[newIndex].movie_title,
      url: movies[newIndex].photo_url,
      description: movies[newIndex].description,
      factoid: movies[newIndex].factoid,
      index: newIndex,
    })
  }
  getPreviousFactoid() {
    const { index, movies } = this.state;
    const newIndex = index - 1;
    this.setState({
      title: movies[newIndex].movie_title,
      url: movies[newIndex].photo_url,
      description: movies[newIndex].description,
      factoid: movies[newIndex].factoid,
      index: newIndex,
    })
  }

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { title, url, description, factoid } = this.state;
    return (
      <div>
        <h1>Movies</h1>
        <FactoidCard 
          title={title}
          url={url}
          description={description}
          factoid={factoid}
        />
        <button onClick={() => {this.getPreviousFactoid()}}>Previous movie</button>
        <button onClick={() => {this.getNextFactoid()}}>Next Movie</button>
      </div>
    );
  }
}

export default App;
