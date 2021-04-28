/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Plant from './Plant';

function SearchResults({ plants }) {
  return (
    <>
      {plants.length ? (
        <div className="plants-container">
          {/* But, Sarah, this is the same as Home.
    Yes, but that refactoring can wait. */}
          {plants.map((plant) => (
            <Plant key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <>
          <h3>
            Sorry, we have no plants matching that search in our database.
          </h3>
          <Link to="/home">You can shop our whole selection here.</Link>
        </>
      )}
    </>
  );
}

const mapState = (state) => {
  return {
    plants: state.searchResults,
  };
};

export default connect(mapState)(SearchResults);
