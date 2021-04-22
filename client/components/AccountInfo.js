/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';

class AccountInfo extends React.Component {
  componentDidMount() {
    console.log('hi');
  }

  render() {
    const { userEmail, shipAddress } = this.props;

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
                <td>{shipAddress ? shipAddress : 'No address on file'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Your Most Recent Order</h3>
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  userEmail: state.auth.email,
  shipAddress: state.auth.shippingAddress,
});

export default connect(mapState)(AccountInfo);
