/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { filterPlants } from '../store/plants';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      search: '',
    });
    const { handleSearch } = this.props;
    handleSearch(evt.target.search.value);
  };

  render() {
    const { handleClick, isLoggedIn, cart } = this.props;
    const { search } = this.state;

    return (
      <header className="flex-row">
        <Link to="/home">
          <h1>Grace Plantter</h1>
        </Link>
        <div className="flex-column nav-wrapper">
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/cart">
              Cart ({cart.plants ? cart.plants.length : 0} items)
            </Link>
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
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              name="search"
              id="search"
              onChange={this.handleChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.email,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    handleSearch(query) {
      dispatch(filterPlants(query));
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
