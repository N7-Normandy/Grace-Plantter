# Grace-Plantter

A Grace Shopper website to sell plants!

## Important Set Up Notes

Make sure to createdb grace-plantter and grace-plantter-test

## API Documentation

Here is a list of all of our resources and how to use our API to interact with them.

### Users

A User instance will have the following fields:

- id
- email
- password (hashed)
- name
- isAdmin (boolean ; default to false)
- shippingAddress (optional)
- billingAddress (optional)

Retrieve All Users
GET /users

- You need to be logged in with Admin Privileges to access
- Will return an array of all users' IDs and emails

Create A User
POST /users

- You need to be logged in with Admin Privileges to access
- Will create a user with the details in the request body

Retrieve a User's Orders
GET /users/:id/orders/filter

example using req queries to get only the most recent non-cart order:
GET /users/:id/orders/filter?limit=1&order=createdAt+ASC&status[not]=cart

- Runs an Order.findAll()
- Includes the Plant information in the results
- Set up to accept optional query params, currently including:
  - a limit
  - a column to order by and the direction to order in
  - option to exclude any orders by a status

### Plants

A plant instance will have the following fields:

- id
- name
- species
- price
- imageURL
- description
- quantity
- active (boolean)

Retrieve All Plants
GET /plants

- sends an array of all plants
