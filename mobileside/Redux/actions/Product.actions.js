import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config/config';
import axios from 'axios';
import {DevSettings} from 'react-native';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const getProductImages = async url => {
  const configheaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(url, configheaders);
  return result;
};
export const getfilterShopProduct = async url => {
  const configheaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(url, configheaders);
  return result;
};
export const getAllProduct = async url => {
  const configheaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(url, configheaders);
  return result;
};
