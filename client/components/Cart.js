/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	fetchCart,
	getUpdateCart,
	getCheckoutCart,
	getRemoveFromCart,
} from '../store/cart';

//

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			totalPrice: 0,
			paymentType: 'card',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
	}

	calculateTotal() {
		if (!this.props.cart.plants) {
			return 0;
		}
		return (
			this.props.cart.plants.reduce((acc, curr) => {
				return acc + curr.price * curr.orderProducts.quantity;
			}, 0) / 100
		);
	}

	componentDidMount() {
		const {getCart, userId} = this.props;
		getCart(userId);
		let cart = this.props.cart.plants || [];
		this.setState({
			cart,
			totalPrice: this.calculateTotal(),
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.cart !== prevProps.cart) {
			if (this.props.cart.plants) {
				this.setState({
					cart: this.props.cart.plants,
					totalPrice: this.calculateTotal(),
				});
			} else {
				this.setState({
					cart: [],
					totalPrice: this.calculateTotal(),
				});
			}
		}
	}

	handleChange(e, plant) {
		const {updateCart, userId} = this.props;
		if (Number(e.target.value) < 1) {
			plant.orderProducts.quantity = 1;
		} else {
			plant.orderProducts.quantity = Number(e.target.value);
		}
		const updatedPlant = plant.id;
		const quantity = plant.orderProducts.quantity;
		updateCart(userId, updatedPlant, quantity);
	}

	handleRemove(e, plantId) {
		const {removeFromCart, userId} = this.props;
		removeFromCart(userId, plantId);
	}

	handleCheckout(e) {
		e.preventDefault();
		const {checkout, userId} = this.props;
		checkout(userId);
	}

	render() {
		const {handleCheckout, handleChange, handleRemove} = this;
		return (
			<div className="card-checkout" onSubmit={handleCheckout}>
				{this.state.cart.length > 0 ? (
					this.state.cart
						.sort((a, b) => a.id - b.id)
						.map(plant => {
							return (
								<div className="card-body-checkout" key={plant.id}>
									<img className="checkoutImg" src={plant.imageURL} />
									<div className="information">
										<Link to={`/plants/${plant.id}`}>{plant.name}</Link>
										<h4>${plant.price / 100}</h4>
										<input
											className="input-group-field"
											type="number"
											name="quantity"
											value={plant.orderProducts.quantity || 0}
											onChange={e => handleChange(e, plant)}
										/>
									</div>
									<div className="remove">
										<button
											type="button"
											onClick={e => handleRemove(e, plant.id)}
										>
											Remove
										</button>
									</div>
								</div>
							);
						})
				) : (
					<div className="emptyCart">
						<h1>Keep on shopping!</h1>
					</div>
				)}
				{this.state.cart.length > 0 ? (
					<div id="checkout">
						<h3 name="totalPrice">${this.state.totalPrice}</h3>
						<button type="submit" onClick={handleCheckout}>
							Checkout!
						</button>
					</div>
				) : (
					<div className="emptyCart">
						<button type="button">
							<Link to="/">Home </Link>
						</button>
					</div>
				)}
			</div>
		);
	}
}
const mapProps = state => ({
	cart: state.cart,
	userId: state.auth.id,
});
const mapDispatch = dispatch => ({
	getCart: userId => dispatch(fetchCart(userId)),
	removeFromCart: (userId, plantId) =>
		dispatch(getRemoveFromCart(userId, plantId)),
	updateCart: (userId, plant, quantity) =>
		dispatch(getUpdateCart(userId, plant, quantity)),
	checkout: userId => dispatch(getCheckoutCart(userId)),
});
export default connect(mapProps, mapDispatch)(Cart);
