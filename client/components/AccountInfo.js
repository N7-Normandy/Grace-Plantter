/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Order from './Order';
import { fetchRecentOrder } from '../store/recentOrder';

class AccountInfo extends React.Component {
  componentDidMount() {
    const { getRecentOrder, id } = this.props;
    getRecentOrder(id);
  }

  render() {
    const { userEmail, shipAddress, recentOrder } = this.props;

    return (
      <>
        <div id="info">
          <table>
            <tbody>
              <tr>
                <td>Email</td>
                <td>{userEmail}</td>
              </tr>
              <tr>
                <td>Shipping Address</td>
                <td>{shipAddress || 'No address on file'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Your Most Recent Order</h3>
          {recentOrder.id ? (
            <Order order={recentOrder} />
          ) : (
            <Link to="/home">Start shopping!</Link>
          )}
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  id: state.auth.id,
  userEmail: state.auth.email,
  shipAddress: state.auth.shippingAddress,
  recentOrder: state.recentOrder,
});

const mapDispatch = (dispatch) => ({
  getRecentOrder: (userId) => dispatch(fetchRecentOrder(userId)),
});

export default connect(mapState, mapDispatch)(AccountInfo);
