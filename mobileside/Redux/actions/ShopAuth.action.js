import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast, useToast} from 'native-base';
import config from '../../config/config';
import axios from 'axios';
import {DevSettings} from 'react-native';
export const SET_CURRENT_SHOP = 'SET_CURRENT_SHOP';
const configDotServer = config.server;
let token;
export const loginShop = (shop, dispatch) => {
  const LOGIN_URL = `${configDotServer}/shop/auth/shoplogin`; ///auth/shoplogin
  console.log('dispatch', dispatch);
  let _shop = fetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(shop),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        token = data.token;

        const decoded = jwt_decode(token);
        AsyncStorage.setItem(`shop_jwt`, token);

        AsyncStorage.setItem(`shop_jwt_decoded`, JSON.stringify(decoded));

        dispatch(setCurrentShop(decoded, shop));
      } else {
        shoplogout(dispatch);
      }
      return data;
    })
    .catch(err => {
      console.log('shop login error ${err}', err);
      Toast.show({
        title: `shop login error ${err}`,
        placement: 'top',
        description: 'please provide correct credentials',
      });
      shoplogout(dispatch);
    });
  return _shop;
};

export const getShopDetail = async id => {
  const SHOP_PROFILE_URL = `${configDotServer}/shop/shopdetail/${id}`;
  let _result = await fetch(SHOP_PROFILE_URL, {
    method: 'GET',
    //body: JSON.stringify(shop),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  return _result;
};
export const getShopDetailByUuid = async uuid => {
  console.log('uuid', uuid);
  const SHOP_PROFILE_URL = `${configDotServer}/shop/shopdetail/shopuuid/${uuid}`;
  let _result = await fetch(SHOP_PROFILE_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  return _result;
};
export const shoplogout = dispatch => {
  //   AsyncStorage.removeItem('jwt');
  try {
    AsyncStorage.removeItem('shop_jwt');
    AsyncStorage.removeItem(`shop_jwt_decoded`);
    AsyncStorage.removeItem(`decoded`);
    AsyncStorage.removeItem(`stateShop`);

    dispatch(setCurrentShop({}));
    DevSettings.reload();
  } catch (error) {
    console.log('error in shop logout', error);
  }
  //   dispatch(setCurrentShop({}));
};
export const setCurrentShop = (decoded, shop) => {
  return {
    type: SET_CURRENT_SHOP,
    payload: decoded,
    shopDetail: shop,
  };
};

export const saveCurrentShop = async (isShopAuthenticated, shop, shopId) => {
  const registerShopURL = `${configDotServer}/shop/auth/new`;
  const updateShopURL = `${configDotServer}/shop/put/${shopId}`;
  console.log('shop', shop);
  const configHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };
  if (isShopAuthenticated === true) {
    console.log('case1: update_shop');
    const response = await axios.put(updateShopURL, shop, configHeaders);
    return response;
  } else {
    console.log('case2: register_new_shop');
    const response = await axios.post(registerShopURL, shop, configHeaders);
    return response;
  }
};
