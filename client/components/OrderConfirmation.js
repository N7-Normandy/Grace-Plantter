/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Order from './Order';
import { fetchRecentOrder } from '../store/recentOrder';

class OrderConfirmation extends React.Component {
  componentDidMount() {
    const { getRecentOrder, id } = this.props;
    getRecentOrder(id);
  }

  render() {
    const { recentOrder } = this.props;

    return (
      <>
        <div>
          <div className="title">
            <h2>Order Confirmation</h2>
          </div>
          {recentOrder.id ? (
            <Order order={recentOrder} />
          ) : (
            <Link to="/home">Order confirmed!</Link>
          )}
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  id: state.auth.id,
  recentOrder: state.recentOrder,
});

const mapDispatch = (dispatch) => ({
  getRecentOrder: (userId) => dispatch(fetchRecentOrder(userId)),
});

export default connect(mapState, mapDispatch)(OrderConfirmation);
