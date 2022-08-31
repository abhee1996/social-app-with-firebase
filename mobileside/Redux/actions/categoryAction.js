import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast, useToast} from 'native-base';
import config from '../../config/config';
import axios from 'axios';
import {DevSettings} from 'react-native';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

export const getCategories = async (setCategoryState, id) => {
  const categoriesURL = `${config.server}/category/allcategories`;
  const configHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(categoriesURL, configHeaders);

    setCategoryState(res.data);
    return res;
    // return res;
  } catch (error) {
    console.log('error', error);
  }
};
export const getCategoriesByProductCat = async url => {
  const configHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(url, configHeaders);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
