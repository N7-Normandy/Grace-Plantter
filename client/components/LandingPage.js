/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlants} from '../store/plants';
import Slider from './Helpers/Slider';
import {Login, Signup} from './AuthForm';
import {Link} from 'react-router-dom';

class LandingPage extends Component {
	componentDidMount() {
		const {getPlants} = this.props;
		getPlants();
	}

	render() {
		const {plants, location} = this.props;

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
					{plants.map((plant, index) => (
						<div
							className="carousel-cell"
							style={{width: '30%', height: '400px', margin: '0 0.5em'}}
							key={index}
						>
							<Link to={`/plants/${plant.id}`}>
								<img className="carousel-img" src={plant.imageURL} alt="" />
							</Link>
						</div>
					))}
				</Slider>
			</div>
		);
	}
}

const mapState = state => ({
	plants: state.plants,
});

const mapDispatch = dispatch => ({
	getPlants: () => dispatch(fetchPlants()),
});

export default connect(mapState, mapDispatch)(LandingPage);
