import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	fetchCart,
	getUpdateCart,
	getCheckoutCart,
	getRemoveFromCart,
} from '../store/cart';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {cart: [], totalPrice: 0, paymentType: 'card'};
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	async componentDidMount() {
		console.log("inside componentDidMount")
		await this.props.fetchCart(); // how will they pass in user id?
		this.setState({
			cart: this.props.cart,
		});
		console.log("STATE-->",this.state);
	}
	async handleChange(e, index) {
		this.state.cart[index].quantity = Number(e.target.value);
		this.setState({cart: this.state.cart});
		await this.props.updateCart(this.state.cart);
	}
	handleCheckout(e) {
		e.preventDefault();
		this.props.checkout(this.state.cart, {
			totalPrice: this.state.totalPrice,
		});
	}
	async handleRemove(e, plantId) {
		e.preventDefault();
		await this.props.removeFromCart(plantId);
		this.setState({
			cart: this.props.cart,
		});
		//remove the index of plant from from our state
		// call updateCart
		// this.props.remove(plantId);
	}
	render() {
		const {handleCheckout, handleChange, handleRemove} = this;
		return (
			<div className="card" onSubmit={handleCheckout}>
				{this.state.cart.length > 0 ? (
					this.state.cart.map((item, index) => {
						return (
							<div className="card-body" key={item.plant.id}>
								<img src={item.plant.imageUrl} />
								<div className="information">
									<Link to={`/plants/${item.plant.id}`}>{item.plant.name}</Link>
									<h4>${item.plant.price}</h4>
									<input
										className="input-group-field"
										type="number"
										name="quantity"
										value={this.state.cart[index].quantity || 0}
										onChange={e => handleChange(e, index)}
									/>
								</div>
								<div className="remove">
									<button
										type="button"
										onClick={e => handleRemove(e, item.plant.id)}
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
const mapProps = ({cart}) => ({
	cart,
});
const mapDispatch = dispatch => ({
	fetchCart: () => dispatch(fetchCart()),
	removeFromCart: plantId => dispatch(getRemoveFromCart(plantId)),
	updateCart: cart => dispatch(getUpdateCart(cart)),
	checkout: paymentInfo => dispatch(getCheckoutCart(paymentInfo)),
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
