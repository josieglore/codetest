import React, { Component } from 'react';
import axios from 'axios';

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
        console.log('responseData is', response.data);
      })
      .catch( err => {
        console.log(err)
    })
  }
  componentDidMount() {
    console.log('hi')
    this.getMovies();
  }
  render() {
    return (
      <div>
        <h1>Movies</h1>
      </div>
    );
  }
}

export default App;
