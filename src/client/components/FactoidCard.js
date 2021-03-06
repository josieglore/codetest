import React from 'react';

const FactoidCard = (props) => {
  const {
    title,
    url,
    description,
    factoid,
    // deleteFactoid, 
  } = props;
  // const deleteButton = {
  //   marginLeft: 0,
  //   backgroundColor: 'dimgray',
  // };
  return (
    <div className="col s12 m7">
      <div className="card horizontal">
        <div className="card-image">
        <img style={{ maxWidth: 200, marginLeft: 10 }}src={url}/>
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <br />
          <p>{factoid}</p>
        </div>
      </div>
    </div>
  </div>        
  );
};

export default FactoidCard;
