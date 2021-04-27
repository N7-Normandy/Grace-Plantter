import React, {Component} from 'react';
import {connect} from 'react-redux';
import AllPlantsInDataBase from './AllPlantsInDataBase';
import {fetchAllPlants} from '../../../store/plants';

class DashBoard extends Component {
	constructor() {
		super();
		this.state = {
			plants: [],
		};
	}
	componentDidMount() {
		this.props.getPlants();
		this.setState({plants: this.props.plants});
	}
	componentDidUpdate(prevProps) {
		if (this.props.plants != prevProps.plants) {
			this.setState({plants: this.props.plants});
		}
	}
	handleSubmit = e => {};
	render() {
		console.log('PLANTZS', this.state.plants);
		return (
			<div className="dashboard">
				{this.props.isAdmin ? (
					this.state.plants.length > 0 ? (
						<div>
							<h1 className="adminPlantHeader">Your Plants</h1>
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Description</th>
										<th>Species</th>
										<th>Active</th>
										<th>Image URL</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{this.state.plants.map(plant => {
										return <AllPlantsInDataBase plant={plant} key={plant.id} />;
									})}
								</tbody>
							</table>
							<button type="submit" className="saveChanges">
								Save Changes
							</button>
						</div>
					) : (
						<h1>You should shop for some inventory!</h1>
					)
				) : (
					<h1>Apply to our store today !</h1>
				)}
			</div>
		);
	}
}

const mapState = state => ({
	isAdmin: state.auth.isAdmin,
	plants: state.plants,
});
const mapProps = dispatch => ({
	getPlants: () => dispatch(fetchAllPlants()),
	// updatePlants: () => dispatch()
});
export default connect(mapState, mapProps)(DashBoard);
