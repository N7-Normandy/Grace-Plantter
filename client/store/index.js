import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import cart from './cart';
import plants from './plants';
import plant from './singlePlant';
import recentOrder from './recentOrder';
import orders from './orders';
import searchResults from './searchResults';

const reducer = combineReducers({
  auth,
  cart,
  plants,
  recentOrder,
  orders,
  plant,
  searchResults,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
