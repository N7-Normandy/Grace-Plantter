import React from 'react';

function Plant (props) {
  const { name, imageURL} = props;
  return (
    <div className="card">
      <img src={imageURL} style={{width: '100%'}} />
      <div className="container">
        <h4><b>{name}</b></h4>
      </div>
    </div>
  );
}

export default Plant;
