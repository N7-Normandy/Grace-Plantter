/* eslint-disable react/jsx-filename-extension */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import SinglePlant from './components/SinglePlant';
import OrderConfirmation from './components/OrderConfirmation';
import Cart from './components/Cart';
import { me } from './store';
import AllOrders from './components/AllOrders';
import AccountInfo from './components/AccountInfo';
import EditAccount from './components/EditAccount';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={LandingPage} />
            <Route path="/plants" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route
              path="/plants/:plantId"
              render={(routeProps) => (
                <SinglePlant plantId={routeProps.match.params.plantId} />
              )}
            />
            {/* <Route exact path="/account" component={Account} /> */}
            <Route exact path="/account/info" component={AccountInfo} />
            <Route exact path="/account/past-orders" component={AllOrders} />
            <Route exact path="/account/edit" component={EditAccount} />
            <Route path="/searchResults" component={SearchResults} />
            <Route path="/order-confirmation" component={OrderConfirmation} />
            <Redirect to="/home" />

          </Switch>
        ) : (
          <Switch>
            <Route path="/plants" component={Home} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={LandingPage} />
            <Route path="/login" component={LandingPage} />
            <Route path="/signup" component={LandingPage} />
            <Route path="/cart" component={Cart} />
            <Route
              path="/plants/:plantId"
              render={(routeProps) => (
                <SinglePlant plantId={routeProps.match.params.plantId} />
              )}
            />
            <Route path="/searchResults" component={SearchResults} />
            <Route path="/order-confirmation" component={OrderConfirmation} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.email,
    cart: state.cart,
  };
};

// fetch cart
const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
