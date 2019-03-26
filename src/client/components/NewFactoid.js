import React from 'react';

const NewFactoid = (props) => {
  const {
    showUploadWidget,
    handleInputChange,
    submitFactoid,
    newUrl,
    hideModal,
    newFactoid,
    newDescription,
    newTitle,
  } = props;
  return (
    <div style={{ paddingTop: 25, paddingRight: 25, paddingBottom: 25, paddingLeft: 25 }}>
      <p>Movie Title</p>
      <input
        id='newTitle' 
        type='text'
        value={newTitle}
        onChange={handleInputChange}>
      </input>
      <p>Description of the Movie</p>
      <input 
        id='newDescription'
        type='text'
        value={newDescription}
        onChange={handleInputChange}
      >
      </input>
      <p>Fun Factoid About the Movie</p>
      <input 
        id='newFactoid'
        type='text'
        value={newFactoid}
        onChange={handleInputChange}
        style={{ marginBottom: 15 }}
      >
      </input>
      <div>
        <span>Upload a Photo for the Movie!</span>
        <span>
          <a 
            className='waves-effect waves-light btn-small' 
            style={{ marginLeft: 15, marginTop: 0 }}
            onClick={showUploadWidget}>
            Upload Photo</a>
        </span>
      </div>
      <input value={newUrl}></input>
      <div style={{ textAlign: 'center' }}>
        <a 
          className='waves-effect waves-light btn' 
          style={{ marginRight: 15}} 
          onClick={() => submitFactoid()}>
          Submit Factoid</a>
        <a
          href='javascript:void(0);' 
          className='waves-effect waves-light btn' 
          style={{ marginLeft: 15 }} 
          onClick={() => hideModal()}>
          Close</a>
      </div>
    </div>
  );
};

export default NewFactoid;
