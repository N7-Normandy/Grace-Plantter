/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlants } from '../store/plants';
import Slider from './Helpers/Slider';
import { Login, Signup } from './AuthForm';

class LandingPage extends Component {
  componentDidMount() {
    const { getPlants } = this.props;
    getPlants();
  }

  render() {
    const { plants, location } = this.props;
    const images = plants.map((plant) => plant.imageURL);

    return (
      <div className="landing-page flex-column">
        <div className="flex-column landing-info">
          <h1>Welcome to the Grace Plantter Spring Collection</h1>
          {location.pathname.includes('login') ? <Login /> : ''}
          {location.pathname.includes('signup') ? <Signup /> : ''}
        </div>
        <Slider
          options={{
            autoPlay: 4000,
            pauseAutoPlayOnHover: true,
            wrapAround: true,
            fullscreen: true,
            adaptiveHeight: true,
            groupCells: true,
          }}
        >
          {images.map((image, index) => (
            <div
              className="carousel-cell"
              style={{ width: '30%', height: '400px', margin: '0 0.5em' }}
              key={index}
            >
              <img className="carousel-img" src={image} alt="" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

const mapState = (state) => ({
  plants: state.plants,
});

const mapDispatch = (dispatch) => ({
  getPlants: () => dispatch(fetchPlants()),
});

export default connect(mapState, mapDispatch)(LandingPage);
