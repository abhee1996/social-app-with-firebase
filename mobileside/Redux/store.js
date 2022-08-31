import {
  createStore,
  configureStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import cartReducer from './reducers/cartReducer';
import AuthReducer from './reducers/Auth.reducer';
import AuthShopReducer from './reducers/AuthShop.reducer';

const reducers = combineReducers({
  cartItems: cartReducer,
  // Auth: AuthReducer,
  // AuthShop: AuthShopReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
export default store;
