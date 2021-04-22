import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
<<<<<<< HEAD
import plant from './singlePlant';

const reducer = combineReducers({ auth, plant });
=======
import cart from './cart';
import plants from './plants'

const reducer = combineReducers({ auth, cart, plants });

>>>>>>> main
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
