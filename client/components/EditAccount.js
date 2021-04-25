/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    console.log(this.state);
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
  };

  render() {
    return (
      <form className="flex-column full-form" onSubmit={this.handleSubmit}>
        <label htmlFor="email">Update Your Email?</label>
        <input
          type="text"
          name="email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="name">Update Your Name?</label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onChange={this.handleChange}
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
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
});

export default connect(mapState)(EditAccount);
