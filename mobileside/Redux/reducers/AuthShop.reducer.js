import {SET_CURRENT_SHOP} from '../actions/ShopAuth.action';
import isEmpty from '../../config/isEmpty';
export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_SHOP:
      return {
        ...state,
        isShopAuthenticated: !isEmpty(action.payload),
        shop: action.payload,
        userProfile: action.userProfile,
        shopDetail: action.shopDetail,
      };

    default:
      return state;
  }
}
