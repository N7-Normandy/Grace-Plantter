/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Account = ({userName, isAdmin}) => (
	<div id="user-account">
		<div>
			<h2>Hi, {userName}!</h2>
			<nav>
				<Link to="/account/info">Info</Link>
				<Link to="/account/past-orders">Past Orders</Link>
				<Link to="/account/edit">Edit Account</Link>
				{isAdmin ? <Link to="/account/admin">Admin Dashboard</Link> : ''}
			</nav>
		</div>
	</div>
);

const mapState = state => {
	return {
		userName: state.auth.name,
		isAdmin: state.auth.isAdmin,
	};
};

export default connect(mapState)(Account);
