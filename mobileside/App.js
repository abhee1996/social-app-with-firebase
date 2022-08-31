/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useContext, useEffect, useState} from 'react';
import {LogBox, SafeAreaView, Text, View} from 'react-native';
import Header from './Component/Header/Header';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigator/MainNavigator';
import {AuthStackNavigator} from './navigator/HomeNavigation';
import {AuthContext} from './navigator/AuthFireProvider';
import auth from '@react-native-firebase/auth';

LogBox.ignoreAllLogs(true);
const App = () => {
  const context = useContext(AuthContext);
  // console.log('context', context);

  // const {user, setUser} = context;
  const [initializing, setInitializing] = useState(null);
  function onAuthStateChanged(user) {
    context?.setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return subscribe;
  }, []);
  if (initializing) return null;

  return (
    <NavigationContainer>
      {context?.user ? (
        <>
          <Header />
          <MainNavigator />
        </>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
  // } else if (UserId) {
  //   console.log(' if  UserId');

  //   return (
  //     <NavigationContainer>
  //       {/* <Header />
  //       <MainNavigator /> */}
  //     </NavigationContainer>
  //   );
  // } else if (ShopId) {
  //   console.log(' if ShopId');

  //   return (
  //     <>
  //       <NavigationContainer>
  //         {/* <Header />
  //         <MainNavigator /> */}
  //       </NavigationContainer>
  //     </>
  //   );
  // } else {
  //   return (
  //     <View>
  //       <Text> no app</Text>
  //     </View>
  //   );
  // }
};

export default App;
