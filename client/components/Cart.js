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

	//handle 0 request
	// remove item  from cart if quantity == 0
	handleChange(e, index) {
		const {updateCart, userId} = this.props;
		if (Number(e.target.value) < 1) {
			this.state.cart[index].orderProducts.quantity = 1;
		} else {
			this.state.cart[index].orderProducts.quantity = Number(e.target.value);
		}
		console.log(this.state.cart[index].orderProducts.quantity);
		updateCart(userId, this.state.cart[index]);
		console.log(this.state.cart[index].orderProducts.quantity);
	}

	handleRemove(e, plantId) {
		const {removeFromCart, userId} = this.props;
		e.preventDefault();
		removeFromCart(userId, {plantId: plantId});
	}

	handleCheckout(e) {
		e.preventDefault();
		const {checkout, userId} = this.props;
		checkout(userId, {
			totalPrice: this.state.totalPrice,
		});
	}

	render() {
		const {handleCheckout, handleChange, handleRemove} = this;
		return (
			<div className="card-checkout" onSubmit={handleCheckout}>
				{this.state.cart.length > 0 ? (
					this.state.cart
						.sort((a, b) => a.id - b.id)
						.map((item, index) => {
							return (
								<div className="card-body-checkout" key={item.id}>
									<img className="checkoutImg" src={item.imageURL} />
									<div className="information">
										<Link to={`/plants/${item.id}`}>{item.name}</Link>
										<h4>${item.price / 100}</h4>
										<input
											className="input-group-field"
											type="number"
											name="quantity"
											value={this.state.cart[index].orderProducts.quantity || 0}
											onChange={e => handleChange(e, index)}
										/>
									</div>
									<div className="remove">
										<button
											type="button"
											onClick={e => handleRemove(e, item.id)}
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
	updateCart: (userId, plant) => dispatch(getUpdateCart(userId, plant)),
	checkout: (userId, paymentInfo) =>
		dispatch(getCheckoutCart(userId, paymentInfo)),
});
export default connect(mapProps, mapDispatch)(Cart);

{
	// handleMinus(e, index)
	// console.log(e.target.value);
	// console.log(this.state.cart[index].quantity);
	// if (e.target.value - 1 < 0) this.state.cart[index].quantity = 0;
	// else {
	// 	this.state.cart[index].quantity = Number(e.target.value) - 1;
	// }
	// this.setState({cart: this.state.cart});
	// console.log(this.state.cart[index].quantity);
	// this.updateCart(this.state.cart);
}
{
	// handlePlus(e, index)
	// console.log(e.target.value, 'AND INDEX', index);
	// this.state.cart[index].quantity = Number(e.target.value) + 1;
	// console.log(this.state.cart);
	// console.log(this.state.cart[index]);
	// this.setState({cart: this.state.cart});
	// this.updateCart(this.state.cart);
}

{
	/* <div className="input-group-button">
<button
	type="button"
	className="button hollow circle"
	name="quantity"
	value={this.state.cart[index].quantity || 0}
	onClick={e => handlePlus(e, index)}
>
	<i className="fa fa-plus" aria-hidden="true"></i>
</button>
</div> */
}
{
	/* <div className="input-group plus-minus-input">
<div className="input-group-button">
	<button
		type="button"
		className="button hollow circle"
		name="quantity"
		value={this.state.cart[index].quantity || 0}
		onClick={e => handleMinus(e, index)}
	>
		<i className="fa fa-minus" aria-hidden="true"></i>
	</button>
</div> */
}
