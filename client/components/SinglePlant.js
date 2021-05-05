/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSinglePlant } from '../store/singlePlant';
import { addItemsToCart } from '../store/cart';

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
    if (this.state.purchaseQty <= this.props.plant.quantity) {
      let items = {
        plantId: this.props.plantId,
        quantity: this.state.purchaseQty,
      };
      this.props.addItems(this.props.userId, items);
      toast.success('Added to cart!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Only ${this.props.plant.quantity} left in stock!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  render() {
    const { plant, cart } = this.props;
    const description = plant.description || '';

    let isInCart = false;
    if (cart.plants) {
      isInCart = !!cart.plants.filter((cartPlant) => cartPlant.id === plant.id)
        .length;
    }

    return (
      <div className="singlePlant">
        <div className="title">
          <h2>{plant.name}</h2>
        </div>
        <div className="singlePlantBody">
          <div className="content">
            <div className="infoBox">
              <img className="singleplantImage" src={plant.imageURL} />
              <div className="description">
                <h3>DESCRIPTION</h3>
                <ul>
                  {description.split('/n').map((line, idx) => {
                    if (idx === 0) {
                      return <p key={line}>{line}</p>;
                    }
                    if (line.length > 1) {
                      return <li key={line}>{line}</li>;
                    } else {
                      return <p key={line}></p>;
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className="orderBox">
              <form id="add-to-cart-form" onSubmit={this.addToCart}>
                <h3 className="quantity">Quantity: </h3>
                <input
                  name="purchaseQty"
                  onChange={this.changeQuantity}
                  value={this.state.purchaseQty}
                />
                <h3>Price: ${plant.price / 100}</h3>
                <div className="addButton">
                  <button type="submit">
                    {isInCart ? 'Update Cart Quantity' : 'Add to Cart'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plant: state.plant,
    userId: state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlant: (plantId) => dispatch(fetchSinglePlant(plantId)),
    addItems: (userId, items) => dispatch(addItemsToCart(userId, items)),
  };
};

export default connect(mapState, mapDispatch)(SinglePlant);
