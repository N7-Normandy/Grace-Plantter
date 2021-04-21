/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, cart }) => (
  <header className="flex-row">
    <h1>Grace Plantter</h1>
    <div className="flex-column nav-wrapper">
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart ({cart.length} items)</Link>
        {isLoggedIn ? (
          <>
            <Link to="/account">Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
      <form>
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </form>
    </div>
  </header>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
