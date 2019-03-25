import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class NewFactoid extends Component {
  constructor(props) {
    super(props);
    this.showUploadWidget = this.showUploadWidget.bind(this);
  }
  showUploadWidget() { 
    cloudinary.openUploadWidget({    
      cloudName: "dvgovtrrs",    
      uploadPreset: "rmwtwx39",    
      sources: [        
        "local",        
        "url",        
        "camera",        
        "image_search",        
        "facebook",        
        "dropbox",       
         "instagram"    
        ],    
        googleApiKey: "<image_search_google_api_key>",    showAdvancedOptions: true,    
        cropping: true,    multiple: false,    defaultSource: "local",    styles: {        palette: {            window: "#FFFFFF",            windowBorder: "#90A0B3",            tabIcon: "#0078FF",            menuIcons: "#5A616A",            textDark: "#000000",            textLight: "#FFFFFF",            link: "#0078FF",            action: "#FF620C",            inactiveTabIcon: "#0E2F5A",            error: "#F44235",            inProgress: "#0078FF",            complete: "#20B832",            sourceBg: "#E4EBF1"        },        fonts: {            default: {                active: true            }        }    }}, (err, info) => {   if (!err) {         console.log("Upload Widget event - ", info);   }  }); }showWidget(widget) {
    widget.open();
  }

  render() {
   
    const { onImageDrop } = this.props;
    return (
      <div>
        <button onClick={this.showUploadWidget}>Upload Photo</button>
      </div>
    )
  }
}

// const NewFactoid = (props) => {
//   const { onImageDrop } = props;
//   return (
//     <div>
//       <Dropzone
//         onDrop={onImageDrop}
//         multiple={false}
//         accept='image/*'
//       >
//         {({ getRootProps }) => (
//           <div 
//             {...getRootProps()} 
//           >
//           Drop your image here!
//           </div>
//         )}
//       </Dropzone>
//     </div>
//   )
// }

export default NewFactoid;