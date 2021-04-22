import React from 'react';
import { connect } from 'react-redux';
import { fetchSinglePlant } from '../store/singlePlant';

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
      plant: this.props.plant,
      quantity: this.state.purchaseQty,
    };
    console.log(items);
  }

  render() {
    console.log('state', this.state);
    console.log('props', this.props);
    const plant = this.props.plant;
    return (
      <div>
        <h2>{plant.name}</h2>
        <div className="infoBox">
          <img src={plant.imageURL} />
          <p>{plant.description}</p>
        </div>
        <div className="orderBox">
          <form id="add-to-cart-form" onSubmit={this.addToCart}>
            <h3>Quantity:</h3>
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
    );
  }
}

const mapState = (state) => {
  return {
    plant: state.plant,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlant: (plantId) => dispatch(fetchSinglePlant(plantId)),
  };
};

export default connect(mapState, mapDispatch)(SinglePlant);
