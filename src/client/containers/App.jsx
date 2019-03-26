import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import FactoidCard from '../components/FactoidCard';
import NewFactoid from '../components/NewFactoid';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;


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
      showModal: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getNextFactoid = this.getNextFactoid.bind(this);
    this.getPreviousFactoid = this.getPreviousFactoid.bind(this);
    this.showUploadWidget = this.showUploadWidget.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitFactoid = this.submitFactoid.bind(this);
    // this.deleteFactoid = this.deleteFactoid.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

 // retrieve movie factoids from database and populate movies array in state
  getMovies() {
    axios.get('https://moviefactoids.herokuapp.com/movies/')
      .then((response) => {
        const movieArray = [];
        response.data.movies.forEach((movie) => {
          movieArray.push(movie);
        });
        this.setState({
          movies: movieArray,
          title: movieArray[0].movie_title,
          url: movieArray[0].photo_url,
          description: movieArray[0].description,
          factoid: movieArray[0].factoid,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // retrieve next movie factoid from the stack / movies array
  getNextFactoid() {
    const { index, movies } = this.state;
    const newIndex = index + 1;
    this.setState({
      title: movies[newIndex].movie_title,
      url: movies[newIndex].photo_url,
      description: movies[newIndex].description,
      factoid: movies[newIndex].factoid,
      index: newIndex,
    });
  }

  // retrieve previous movie factoid from stack / movies array
  getPreviousFactoid() {
    const { index, movies } = this.state;
    const newIndex = index - 1;
    this.setState({
      title: movies[newIndex].movie_title,
      url: movies[newIndex].photo_url,
      description: movies[newIndex].description,
      factoid: movies[newIndex].factoid,
      index: newIndex,
    });
  }

  // toggle showModal property in state to display modal
  showModal() {
    this.setState({
      showModal: true,
    });
  }

  // toggle showModal property in state to hide modal
  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  // display widget for uploading photos to cloudinary
  showUploadWidget() {
    cloudinary.openUploadWidget({
      cloudName: 'dvgovtrrs',
      uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      sources: [
        'local',
        'url',
        'camera',
        'image_search',
        'facebook',
        'dropbox',
        'instagram',
      ],
      googleApiKey: '<image_search_google_api_key>',
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#90A0B3',
          tabIcon: '#0078FF',
          menuIcons: '#5A616A',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#0078FF',
          action: '#FF620C',
          inactiveTabIcon: '#0E2F5A',
          error: '#F44235',
          inProgress: '#0078FF',
          complete: '#20B832',
          sourceBg: '#E4EBF1',
        },
        fonts: {
          default: {
            active: true,
          },
        },
      },
    }, (err, info) => {
      if (!err) {
        console.log('Upload Widget event - ', info);
        if (info.event === 'success') {
          this.setState({
            newUrl: info.info.secure_url,
          });
        }
      }
    });
  }

  // update state when text fields in new factoid modal are changed
  handleInputChange(e) {
    if (e.target.id === 'newTitle') {
      this.setState({
        newTitle: e.target.value,
      });
    }
    if (e.target.id === 'newDescription') {
      this.setState({
        newDescription: e.target.value,
      });
    }
    if (e.target.id === 'newFactoid') {
      this.setState({
        newFactoid: e.target.value,
      });
    }
  }

  // post new factoid information, add new factoid to end of stack, and close modal
  submitFactoid() {
    const {
      newTitle,
      newUrl,
      newDescription,
      newFactoid,
      movies,
    } = this.state;
    axios.post('https://moviefactoids.herokuapp.com/movies/newmovie', {
      title: newTitle,
      url: newUrl,
      description: newDescription,
      factoid: newFactoid,
    })
      .then(() => {
        const newMovieObj = {
          movie_title: newTitle,
          photo_url: newUrl,
          description: newDescription,
          factoid: newFactoid,
        };
        this.setState({
          newTitle: '',
          newUrl: '',
          newDescription: '',
          newFactoid: '',
          showModal: false,
          movies: movies.concat([newMovieObj]),
        });
      });
    alert('Movie factoid added to deck!');
  }

  // remove factoid from database and movies array, then proceed to next factoid -- needs debugging
  // deleteFactoid() {
  //   const { title, index, movies } = this.state;
  //   let filteredArr = movies;
  //   filteredArr = filteredArr.filter((movie) => {
  //     return filteredArr.indexOf(movie) !== index;
  //   });
  //   fetch(`https://moviefactoids.herokuapp.com/movies/deletemovie/${title}`, {
  //     method: 'DELETE',
  //   })
  //     .then(res => res.json())
  //     .then(() => this.setState({
  //       movies: filteredArr,
  //     }))
  //     .then(() => this.getNextFactoid());
  // }

  render() {
    const {
      title,
      url,
      description,
      factoid,
      newUrl,
      showModal,
      newTitle,
      newFactoid,
      newDescription,
    } = this.state;
    const centered = {
      display: 'flex',
      margin: 'auto',
      marginTop: 15,
    };
    const newFactoidButton = {
      display: 'flex',
      margin: 'auto',
      marginTop: 15,
      backgroundColor: 'darkslategray',
    };
    return (
      <div>
        <div><h1>Movies That Are Cool</h1></div>
        <FactoidCard
          title={title}
          url={url}
          description={description}
          factoid={factoid}
          // deleteFactoid={this.deleteFactoid}
        />
        <div style={{ textAlign: 'center' }}>
          <a
            className='waves-effect waves-light btn'
            onClick={() => {this.getPreviousFactoid()}}>
            Previous movie</a>
          <a
          className='waves-effect waves-light btn'
          onClick={() => {this.getNextFactoid()}}>
          Next Movie</a>
        </div>
        <div style={centered}>
          <a
            style={newFactoidButton}
            className='waves-effect waves-light btn' 
            onClick={() => {this.showModal()}}>
            Add New Movie Factoid</a>
        </div>
        <Modal 
          visible={showModal} 
          style={{ width: 500, height: 500 }} 
          effect='fadeInUp'>
          <div>
            <NewFactoid
              showUploadWidget={this.showUploadWidget}
              handleInputChange={this.handleInputChange}
              submitFactoid={this.submitFactoid}
              newUrl={newUrl}
              newFactoid={newFactoid}
              newTitle={newTitle}
              newDescription={newDescription}
              hideModal={this.hideModal}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
