import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUpdatedPlants} from '../../../store/plants';
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
		e.preventDefault();
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

		const {handleChange} = this;
		return (
			<tr>
				<td className="admin">
					<input
						type="text"
						name="name"
						id={id}
						value={name}
						onChange={handleChange}
						required
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="price"
						id={id}
						value={price / 100}
						onChange={handleChange}
						required
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="quantity"
						id="quantity"
						value={quantity}
						onChange={handleChange}
						required
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={handleChange}
					/>
				</td>
				<td className="admin">
					<input
						type="text"
						name="species"
						id="species"
						value={species}
						onChange={handleChange}
					/>
				</td>
				<td className="admin">
					<select
						onChange={handleChange}
						name="active"
						id="active"
						value={active}
					>
						<option value={true}>True</option>
						<option value={false}>False</option>
					</select>
				</td>
				<td className="admin">
					<input
						type="text"
						name="imageURL"
						id="imageURL"
						value={imageURL}
						onChange={handleChange}
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
