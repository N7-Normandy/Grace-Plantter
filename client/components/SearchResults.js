/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';

function SearchResults({ plants }) {
  return (
    <div className="plants-container">
      {/* But, Sarah, this is the same as Home.
    Yes, but that refactoring can wait. */}
      {plants.map((plant) => (
        <Plant key={plant.id} plant={plant} />
      ))}
    </div>
  );
}

const mapState = (state) => {
  return {
    plants: state.plants,
  };
};

export default connect(mapState)(SearchResults);
