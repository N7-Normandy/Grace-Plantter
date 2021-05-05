/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Plant from './Plant';
import { filterPlants } from '../store/searchResults';

class SearchResults extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    const { handleSearch } = this.props;
    handleSearch(search);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { search } = location;
    if (prevProps.location.search !== search) {
      const { handleSearch } = this.props;
      handleSearch(search);
    }
  }

  render() {
    const { plants } = this.props;
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
            <Link to="/plants">You can shop our whole selection here.</Link>
          </>
        )}
      </>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.searchResults,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSearch(query) {
      dispatch(filterPlants(query));
    },
  };
};

export default connect(mapState, mapDispatch)(SearchResults);
