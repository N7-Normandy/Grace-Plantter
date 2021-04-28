import React, {Component} from 'react';
import {connect} from 'react-redux';
import AllPlantsInDataBase from './AllPlantsInDataBase';
import {fetchAllPlants, getUpdatedPlants} from '../../../store/plants';

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
		if (this.props.plants !== prevProps.plants) {
			this.setState({plants: this.props.plants});
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		const plantsList = [];
		this.state.plants.forEach((plant, index) => {
			plantsList.push({
				id: plant.id,
				name: e.target.name[index].value,
				species: e.target.species[index].value,
				price: +e.target.price[index].value,
				imageURL: e.target.imageURL[index].value,
				description: e.target.description[index].value,
				quantity: e.target.quantity[index].value,
				active: e.target.active[index].value,
			});
		});
		this.props.updatePlants({plantsList: plantsList});
	};
	render() {
		return (
			<div className="dashboard">
				{this.props.isAdmin ? (
					this.state.plants.length > 0 ? (
						<div>
							<h1 className="adminPlantHeader">Your Plants</h1>
							<form className="myTable" onSubmit={this.handleSubmit}>
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
										</tr>
									</thead>
									<tbody>
										{this.state.plants
											.sort((a, b) => {
												if (a.name < b.name) {
													return -1;
												}
												if (a.name < b.name) {
													return 1;
												}
												return 0;
											})
											.map(plant => {
												return (
													<AllPlantsInDataBase plant={plant} key={plant.id} />
												);
											})}
									</tbody>
								</table>
								<button type="submit" className="saveChanges">
									Save Changes
								</button>
							</form>
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
	updatePlants: plants => dispatch(getUpdatedPlants(plants)),
});
export default connect(mapState, mapProps)(DashBoard);
