import React from 'react';

const FactoidCard = (props) => {
  const { title, url, factoid } = props;
  return (
    <div>
      <h1>Movie Goes Here</h1>
      <p>{title}</p>
      <img src={url} style={{maxWidth: 200}}/>
      <p>{factoid}</p>
    </div>
  )
}

export default FactoidCard;