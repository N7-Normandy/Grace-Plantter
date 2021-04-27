/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Order from './Order';
import { fetchUserOrders } from '../store/orders';
import Account from './Account';

class AllOrders extends Component {
  componentDidMount() {
    const { userId, getOrders } = this.props;
    getOrders(userId);
  }

  render() {
    const { orders } = this.props;

    return (
      <>
      <Account />
        {orders.length ? (
          orders.map((order, idx, arr) => (
            <div key={order.id}>
              <h3>Order #{arr.length - idx}</h3>
              <Order order={order} />
            </div>
          ))
        ) : (
          <>
            <h3>You have no orders with us :(</h3>
            <Link to="/home">Start shopping!</Link>
          </>
        )}
      </>
    );
  }
}

function mapState(state) {
  return {
    userId: state.auth.id,
    orders: state.orders,
  };
}

function mapDispatch(dispatch) {
  return {
    getOrders: (id) => dispatch(fetchUserOrders(id)),
  };
}

export default connect(mapState, mapDispatch)(AllOrders);
