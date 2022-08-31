/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from './Redux/store';
import Auth from './Redux/AuthStore/Auth.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from './Redux/AuthStore/AuthGlobal';
import SplashScreen from 'react-native-splash-screen';
import {getUserProfile} from './Redux/actions/Auth.Action';
import {AuthFireProvider} from './navigator/AuthFireProvider';
import {
  GoogleSignin,
  // GoogleSigninButton,
  // statusCodes,
} from '@react-native-google-signin/google-signin';
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
//const getAsyncData = async (setUser, setShop, setAuthContext) => {
const getAsyncData = async () => {
  try {
    // await  AsyncStorage.getItem('shop_jwt').then(res => {
    // });
    // await AsyncStorage.getItem('shop_jwt_decoded').then(res => {
    //   setShop(JSON.parse(res));
    // });
    // // for user
    // await AsyncStorage.getItem('user_jwt_decoded').then(res => {
    //   setUser(JSON.parse(res));
    // });
  } catch (error) {
    console.warn(error);
  } finally {
    await SplashScreen.hide();
  }
};
const theme = extendTheme({colors: newColorTheme});
export default function Main() {
  React.useEffect(() => {
    getAsyncData();
    GoogleSignin.configure({
      webClientId:
        '264265061734-bfd880nbu2uffma5caagrm4gu89ph68b.apps.googleusercontent.com',
    });
  }, []);
  // <Auth userValue={user} shopValue={shop}>
  //   <Provider store={store}>
  // <NativeBaseProvider theme={theme}>
  //   <App />
  // </NativeBaseProvider>
  //   </Provider>
  // </Auth>
  return (
    <AuthFireProvider>
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </AuthFireProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
