import React, { Component } from 'react';
import axios from 'axios';
// import Popup from 'reactjs-popup';
import Modal from 'react-awesome-modal';
import FactoidCard from '../components/FactoidCard';
import NewFactoid from '../components/NewFactoid';
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

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
    }
    this.getMovies = this.getMovies.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getNextFactoid = this.getNextFactoid.bind(this);
    this.getPreviousFactoid = this.getPreviousFactoid.bind(this);
    // this.onImageDrop = this.onImageDrop.bind(this);
    this.showUploadWidget = this.showUploadWidget.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitFactoid = this.submitFactoid.bind(this);
    this.deleteFactoid = this.deleteFactoid.bind(this);
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

  showModal() {
    this.setState({
      showModal: true
    });
  }
  hideModal() {
    this.setState({
      showModal: false
    })
  }
  // onImageDrop(images) {
  //   console.log(images)
  //   const uploads = images.map(image => {
  //     console.log(image)
  //     const formData = new FormData();
  //     const url =  'https://api.cloudinary.com/v1_1/dvgovtrrs/image/upload';
  //     formData.append('file', './IMG_1534.JPG');
  //     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); 
  //     formData.append('api_key', 784128697256257);
  //     formData.append('timestamp', (Date.now() / 1000) | 0);
  //     const config = {
  //       headers: {'X-Requested-With': 'XMLHttpRequest' }
  //     };
  //     return axios.post(url, formData, config)
  //       .then(response => {
  //           this.setState({
  //               newUrl : response.data.url,
  //               // uploadedSuccess: true,
  //           })
  //           console.log(response.data.url)
  //       })
  //   })
  // };

  showUploadWidget() { 
    cloudinary.openUploadWidget({    
      cloudName: 'dvgovtrrs',    
      uploadPreset: 'rmwtwx39',    
      sources: [        
        'local',        
        'url',        
        'camera',        
        'image_search',        
        'facebook',        
        'dropbox',       
        'instagram'    
        ],    
        googleApiKey: "<image_search_google_api_key>",    showAdvancedOptions: true,    
        cropping: true,   
        multiple: false,    
        defaultSource: "local",    
        styles: {        
          palette: {            
            window: "#FFFFFF",            
            windowBorder: "#90A0B3",            
            tabIcon: "#0078FF",            
            menuIcons: "#5A616A",            
            textDark: "#000000",            
            textLight: "#FFFFFF",            
            link: "#0078FF",            
            action: "#FF620C",            
            inactiveTabIcon: "#0E2F5A",            
            error: "#F44235",            
            inProgress: "#0078FF",            
            complete: "#20B832",            
            sourceBg: "#E4EBF1"        
          },        
          fonts: {            
            default: {                
              active: true            
            }        
          }    
        }}, (err, info) => {   
          if (!err) {         
            console.log("Upload Widget event - ", info);
            if (info.event === 'success') {
              this.setState({
                newUrl: info.info.secure_url
              }) 
            } 
          }  
        }
      ); 
    }
    
  handleInputChange(e) {
    if (e.target.id === 'newTitle') {
      this.setState({
        newTitle: e.target.value
      });
    }
    if (e.target.id === 'newDescription') {
      this.setState({
        newDescription: e.target.value
      })
    }
    if (e.target.id === 'newFactoid') {
      this.setState({
        newFactoid: e.target.value
      })
    }
  }

  submitFactoid() {
    const { newTitle, newUrl, newDescription, newFactoid, movies } = this.state;
    axios.post('http://localhost:3000/movies/newmovie', {
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
    })})
    alert('Movie factoid added to deck!');
  }

  deleteFactoid() {
    const { title, index, movies } = this.state;
    const moviesCopy = movies.splice(index, 1);
    fetch(`http://localhost:3000/movies/deletemovie/${title}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(this.setState({
      movies: moviesCopy,
    }))
    .then(this.getNextFactoid());
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { title, url, description, factoid, newUrl, showModal } = this.state;
    const centered = {
      display: 'flex',
      margin: 'auto',
      marginTop: 15,
    };
    const newFactoidButton = {
      display: 'flex',
      margin: 'auto',
      marginTop: 15,
      backgroundColor: 'darkslategray'
    }
    return (
      <div>
        <div><h1>Movies</h1></div>
        <FactoidCard 
          title={title}
          url={url}
          description={description}
          factoid={factoid}
          deleteFactoid={this.deleteFactoid}
        />
        <div style={{ textAlign: 'center' }}>
          <a className='waves-effect waves-light btn' onClick={() => {this.getPreviousFactoid()}}>Previous movie</a>
          <a className='waves-effect waves-light btn' onClick={() => {this.getNextFactoid()}}>Next Movie</a>
        </div>
        <div style={centered}><a style={newFactoidButton} className='waves-effect waves-light btn' onClick={() => {this.showModal()}}>Add New Movie Factoid</a></div>
        <Modal visible={showModal} style={{ width: 500, height: 500}} effect='fadeInUp'>
          <div>
            <NewFactoid 
              showUploadWidget={this.showUploadWidget}
              handleInputChange={this.handleInputChange}
              submitFactoid={this.submitFactoid}
              newUrl={newUrl}
              hideModal={this.hideModal}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
