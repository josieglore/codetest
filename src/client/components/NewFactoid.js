import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

// class NewFactoid extends Component {
//   constructor(props) {
//     super(props);
//     this.showUploadWidget = this.showUploadWidget.bind(this);
//   }

//   render() {
   
//     const { onImageDrop } = this.props;
//     return (
//       <div>
//         <button onClick={this.showUploadWidget}>Upload Photo</button>
//       </div>
//     )
//   }
// }

const NewFactoid = (props) => {
  const { showUploadWidget, handleInputChange, submitFactoid, newUrl } = props;
  return (
    <div>
      <p>Movie Title</p>
      <input 
        id='newTitle' 
        type='text'
        onChange={handleInputChange}>
      </input>
      <p>Description of the Movie</p>
      <textarea 
        id='newDescription'
        type='text'
        onChange={handleInputChange}
      >
      </textarea>
      <p>Fun Factoid</p>
      <textarea 
        id='newFactoid'
        type='text'
        onChange={handleInputChange}
      >
      </textarea>
      <input value={newUrl}></input><button onClick={showUploadWidget}>Upload Photo</button>
      <button onClick={() => submitFactoid()}>Submit Factoid</button>
    </div>
  )
}

export default NewFactoid;