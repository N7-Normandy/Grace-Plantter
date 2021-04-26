/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export default function Order({order}) {
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td>Date</td>
						<td>{order.createdAt}</td>
					</tr>
					<tr>
						<td>Total Paid</td>
						<td>${order.totalPrice}</td>
					</tr>
				</tbody>
			</table>
			{order.plants.map(plant => {
				return (
					<div className="order-plant" key={plant.id}>
						<div className="img-container">
							<img src={plant.imageURL} style={{width: '100px'}} />
						</div>
						<div>
							<p>{plant.name}</p>
							<p>Quantity: {plant.orderProducts.quantity}</p>
							<p>Price: ${plant.price / 100}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
