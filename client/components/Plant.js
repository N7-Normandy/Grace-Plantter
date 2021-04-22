import React from 'react';
import {Link} from 'react-router-dom';

function Plant (props) {
  const {id, name, imageURL} = props.plant;
  return (
    <Link className="card" to={`/plants/${id}`}>
      <div >
        <img src={imageURL} style={{width: '100%'}} />
        <div className="container">
          <h4><b>{name}</b></h4>
        </div>
      </div>
    </Link>
  );
}

export default Plant;
