import React, { Component } from 'react';
import axios from 'axios';
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
    }
    this.getMovies = this.getMovies.bind(this);
    this.getNextFactoid = this.getNextFactoid.bind(this);
    this.getPreviousFactoid = this.getPreviousFactoid.bind(this);
    // this.onImageDrop = this.onImageDrop.bind(this);
    this.showUploadWidget = this.showUploadWidget.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
        <NewFactoid 
          showUploadWidget={this.showUploadWidget}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default App;
