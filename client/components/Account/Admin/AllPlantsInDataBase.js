import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchAllPlants} from '../../../store/plants';

class AllPlants extends Component {
	constructor(props) {
		super(props);
		const {
			id,
			name,
			imageURL,
			description,
			active,
			price,
			quantity,
			species,
		} = this.props.plant;
		this.state = {
			id: id || 0,
			name: name || '',
			imageURL: imageURL || '',
			description: description || '',
			active: active || false,
			price: price || 0,
			quantity: quantity || 0,
			species: species || '',
		};
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleSubmit = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	render() {
		const {
			id,
			name,
			imageURL,
			description,
			active,
			price,
			quantity,
			species,
		} = this.state;
		return (
			<tr>
				<td className="admin">
					<Link to={`/plants/${id}`}>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={this.handleChange}
							required
						/>{' '}
					</Link>
				</td>
				<td className="admin">
					<input
						type="text"
						name="price"
						id="price"
						value={price / 100}
						onChange={this.handleChange}
						required
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="quantity"
						id="quantity"
						value={quantity}
						onChange={this.handleChange}
						required
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={this.handleChange}
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="species"
						id="species"
						value={species}
						onChange={this.handleChange}
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="active"
						id="active"
						value={active}
						onChange={this.handleChange}
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="imageURL"
						id="imageURL"
						value={imageURL}
						onChange={this.handleChange}
					/>
				</td>
				<td className="admin">
					<button type="button">Remove</button>
				</td>
			</tr>
		);
	}
}

export default connect(null)(AllPlants);
