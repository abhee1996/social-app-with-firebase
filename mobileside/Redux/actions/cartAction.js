import {ADD_TO_CART, ROMOVE_FROM_CART, CLEAR_CART} from '../constant';

export const AddToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};
export const RemoveFromCart = payload => {
  return {
    type: ROMOVE_FROM_CART,
    payload,
  };
};
export const clearCart = payload => {
  return {
    type: CLEAR_CART,
  };
};
