import React from 'react';

const FactoidCard = (props) => {
  const { title, url, description, factoid } = props;
  return (
    <div>
      <h2>{title}</h2>
      <img src={url} style={{maxWidth: 200}}/>
      <p>{description}</p>
      <p>{factoid}</p>
    </div>
  )
}

export default FactoidCard;