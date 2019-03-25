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
  const { showUploadWidget } = props;
  return (
    <div>
      <button onClick={showUploadWidget}>Upload Photo</button>
    </div>
  )
}

export default NewFactoid;