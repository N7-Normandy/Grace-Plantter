/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/auth';
import Account from './Account';

export class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      name: this.props.user.name,
      shippingAddress: this.props.user.shippingAddress || '',
      billingAddress: this.props.user.billingAddress || '',
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user && user !== prevProps.user) {
      this.setState({
        email: user.email,
        name: user.name,
        shippingAddress: user.shippingAddress,
        billingAddress: user.billingAddress,
      });
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { updateProfile, user } = this.props;
    updateProfile(user.id, this.state);
  };

  render() {
    return (
      <>
      <Account />
      <form className="flex-column full-form" onSubmit={this.handleSubmit}>
        <label htmlFor="email">Update Your Email?</label>
        <input
          type="text"
          name="email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="name">Update Your Name?</label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="shippingAddress">Update Your Shipping Address?</label>
        <input
          type="text"
          name="shippingAddress"
          id="shippingAddress"
          value={this.state.shippingAddress}
          onChange={this.handleChange}
        />
        <label htmlFor="billingAddress">Update Your Billing Address?</label>
        <input
          type="text"
          name="billingAddress"
          id="billingAddress"
          value={this.state.billingAddress}
          onChange={this.handleChange}
        />
        <button type="submit">Update My Information</button>
      </form>
      </>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  updateProfile: (id, info) => dispatch(updateUser(id, info)),
});

export default connect(mapState, mapDispatch)(EditAccount);
