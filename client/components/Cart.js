import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCart, updateCart, checkoutCart} from '../store';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {cart: [], totalPrice: 0, paymentType: 'card'};
		this.handleChange = this.handleChange.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
		this.handlePlus = this.handlePlus.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
	}
	componentDidMount() {
		this.props.fetchCart(); // how will they pass in user id?
		this.setState({
			cart: this.props.cart,
		});
	}
	handleChange(e, index) {
		e.preventDefault();
		this.state.cart[index] = e.target.value;
		this.updateCart(this.state.cart);
	}
	handleMinus(e, index) {
		if (e.target.value - 1 < 0) this.state.cart[index] = 0;
		else {
			this.state.cart[index] = e.target.value - 1;
		}
		this.updateCart(this.state.cart);
	}
	handlePlus(e, index) {
		this.state.cart[index] = e.target.value + 1;
		this.updateCart(this.state.cart);
	}
	handleCheckout(e) {
		e.preventDefault();
		this.props.checkout(this.state.cart, {
			totalPrice: this.state.totalPrice,
			paymentType: this.state.paymentType,
		});
	}
	render() {
		const {handleCheckout, handleChange, handlePlus, handleMinus} = this.state;
		return (
			<div className="card" onSubmit={handleCheckout}>
				{this.cart.length > 0 ? (
					this.cart.map(
						item => {
							return (
								<div className="card-body">
									<img src={item.plant.imageUrl} />
									<div className="information">
										<Link to={`/plants/${item.plant.id}`}>
											{item.plant.name}
										</Link>
										<h4>${item.plant.price}</h4>
										<div class="input-group plus-minus-input">
											<div class="input-group-button">
												<button
													type="button"
													class="button hollow circle"
													onClick={handleMinus(item)}
												>
													<i class="fa fa-minus" aria-hidden="true"></i>
												</button>
											</div>
											<input
												class="input-group-field"
												type="number"
												name="quantity"
												value={item.plant.quantity}
												onChange={handleChange(item)}
											/>
											<div class="input-group-button">
												<button
													type="button"
													class="button hollow circle"
													onClick={handlePlus(item)}
												>
													<i class="fa fa-plus" aria-hidden="true"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							);
						},
						<div>
							<h3 name="totalPrice">${this.state.totalPrice}</h3>
							<h3 name="paymentType">${this.state.paymentType}</h3>
							<button type="submit"> Checkout! </button>
						</div>
					)
				) : (
					<div className="emptyCart">
						<h1>Keep on shopping!</h1>
						<Link to="/">Home </Link>
					</div>
				)}
			</div>
		);
	}
}
const mapProps = ({cart}) => {
	cart;
};
const mapDispatch = dispatch => ({
	fetchCart: () => dispatch(fetchCart()),
	updateCart: cart => dispatch(updateCart(cart)),
	checkout: paymentInfo => dispatch(checkoutCart(paymentInfo)),
});
export default connect(mapProps, mapDispatch)(Cart);
