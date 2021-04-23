/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import AllOrders from './AllOrders';

const Account = ({ userName }) => (
  <div id="user-account">
    <div>
      <h2>Hi, {userName}!</h2>
      <nav>
        <Link to="/account/info">Info</Link>
        <Link to="/account/past-orders">Past Orders</Link>
        <Link to="/account/edit">Edit Account</Link>
      </nav>
    </div>
    <Switch>
      <Route path="/account/info" component={AccountInfo} />
      <Route path="/account/past-orders" component={AllOrders} />
      <Route path="/account/edit" />
      <Redirect to="/account/info" />
    </Switch>
  </div>
);

const mapState = (state) => {
  return {
    userName: state.auth.name,
  };
};

export default connect(mapState)(Account);
