import {SET_CURRENT_USER} from '../actions/Auth.Action';
import {SET_CURRENT_SHOP} from '../actions/ShopAuth.action';

import isEmpty from '../../config/isEmpty';
export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    case SET_CURRENT_SHOP:
      return {
        ...state,
        isShopAuthenticated: !isEmpty(action.payload),
        shop: action.payload,
        userProfile: action.shopDetail,
        shopDetail: action.shopDetail,
      };

    default:
      return state;
  }
}
