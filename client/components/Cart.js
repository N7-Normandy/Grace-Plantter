import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCart, getUpdateCart, getCheckoutCart} from '../store/cart';

const myCart = [
	{
		plant: {
			id: 1,
			name: 'Orchid',
			price: 120,
			imageUrl:
				'https://images.thdstatic.com/productImages/e154a248-ac84-46bf-a1a9-65724e122958/svn/endless-summer-bushes-14750-64_400.jpg',
		},
		quantity: 2,
	},
	{
		plant: {
			id: 2,
			name: 'Peony',
			price: 18.95,
			imageUrl:
				' https://images.thdstatic.com/productImages/b33f34d0-8f91-4e49-a1d8-2eaab0012500/svn/proven-winners-bushes-14766-64_100.jpg',
		},
		quantity: 12,
	},
];

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {cart: myCart, totalPrice: 0, paymentType: 'card'};
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
	}
	componentDidMount() {
		console.log(this.state.cart);
		this.props.fetchCart(); // how will they pass in user id?
		// this.setState({
		// 	cart: this.props.cart,
		// });
	}
	handleChange(e, index) {
		this.state.cart[index].quantity = Number(e.target.value);
		this.setState({cart: this.state.cart});
		this.props.updateCart(this.state.cart);
	}
	handleCheckout(e) {
		e.preventDefault();
		this.props.checkout(this.state.cart, {
			totalPrice: this.state.totalPrice,
			paymentType: this.state.paymentType,
		});
	}
	render() {
		const {handleCheckout, handleChange} = this;
		return (
			<div className="card" onSubmit={handleCheckout}>
				{this.state.cart.length > 0 ? (
					this.state.cart.map((item, index) => {
						console.log(item.plant.id);
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
						{/* <h3 name="paymentType">Payment Type: {this.state.paymentType}</h3> */}
						<button type="submit"> Checkout! </button>
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
