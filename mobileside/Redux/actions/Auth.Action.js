import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast, useToast} from 'native-base';
import config from '../../config/config';
import axios from 'axios';
import {DevSettings} from 'react-native';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  const LOGIN_URL = `${config.server}/users/auth/login`;
  let _data = fetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log('loginUser data', data);
        const token = data.token;
        AsyncStorage.setItem(`user_jwt`, token);
        const decoded = jwt_decode(token);
        AsyncStorage.setItem(`user_jwt_decoded`, JSON.stringify(decoded));

        dispatch(setCurrentUser(decoded, user)); //TODO
      } else {
        userlogout(dispatch);
      }
      return data;
    })
    .catch(err => {
      Toast.show({
        title: `user login error ${err}`,
        placement: 'top',
        description: 'please provide correct credentials',
      });
      userlogout(dispatch);
    });
  return _data;
};

export const getUserProfile = id => {
  const USER_PROFILE_URL = `${config.server}/users/auth/userprofile/${id}`;
  let _result = fetch(USER_PROFILE_URL, {
    method: 'GET',
    // body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  return _result;
};
export const getUserProfileByUUID = uuid => {
  const USER_PROFILE_URL = `${config.server}/users/auth/userdetail/user_uid/${uuid}`;
  let _result = fetch(USER_PROFILE_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(rs => rs);

  return _result;
};
export const userlogout = dispatch => {
  //   AsyncStorage.removeItem('jwt');
  console.log('userlogout');

  AsyncStorage.removeItem('user_jwt');
  AsyncStorage.removeItem(`user_jwt_decoded`);

  dispatch(setCurrentUser({}));
  DevSettings.reload();
};
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
