/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order';

class AllOrders extends Component {
  componentDidMount() {
    const { userId, getOrders } = this.props;
    getOrders(userId);
  }

  render() {
    const { orders } = this.props;
    return (
      <>
        {orders.forEach((order, idx, arr) => (
          <div key={order.id}>
            <h3>Order #{arr.length - idx}</h3>
            <Order order={order} />
          </div>
        ))}
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
