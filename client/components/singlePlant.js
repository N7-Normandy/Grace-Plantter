import React from 'react';
import {connect} from 'react-redux';
import {fetchSinglePlant} from '../store/singlePlant';
import {addItemsToCart} from '../store/cart';

class SinglePlant extends React.Component {
	constructor() {
		super();
		this.state = {
			purchaseQty: 1,
		};
		this.changeQuantity = this.changeQuantity.bind(this);
		this.addToCart = this.addToCart.bind(this);
	}

	componentDidMount() {
		try {
			this.props.getPlant(this.props.plantId);
		} catch (error) {
			console.log(error);
		}
	}
	changeQuantity(event) {
		this.setState({
			purchaseQty: event.target.value,
		});
	}

	addToCart(event) {
		event.preventDefault();
		let items = {
			plantId: this.props.plantId,
			quantity: this.state.purchaseQty,
		};
		this.props.addItems(this.props.userId, items);
	}

	render() {
		const plant = this.props.plant;
		const description = plant.description || '';
		return (
			<div className="singlePlant">
				<div className="title">
					<h2>{plant.name}</h2>
				</div>
				<div className="content">
					<div className="infoBox">
						<img className="singleplantImage" src={plant.imageURL} />
						<div className="description">
							<h3>DESCRIPTION</h3>
							<ul>
								{description.split('/n').map(line => {
									return <li key={line}>{line}</li>;
								})}
							</ul>
						</div>
					</div>
					<div className="orderBox">
						<form id="add-to-cart-form" onSubmit={this.addToCart}>
							<h3>Quantity: </h3>
							{/* <button type="button">-</button> */}
							<input
								name="purchaseQty"
								onChange={this.changeQuantity}
								value={this.state.purchaseQty}
							/>
							{/* <button type="button">+</button> */}
							<h3>Price: ${plant.price}</h3>
							<button type="submit">Add to Cart</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => {
	return {
		plant: state.plant,
		userId: state.auth.id,
	};
};

const mapDispatch = dispatch => {
	return {
		getPlant: plantId => dispatch(fetchSinglePlant(plantId)),
		addItems: (userId, items) => dispatch(addItemsToCart(userId, items)),
	};
};

export default connect(mapState, mapDispatch)(SinglePlant);
