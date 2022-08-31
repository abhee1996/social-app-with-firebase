import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HomeNavigation,
  UserStackNavigator,
  AdminStackNavigator,
  CartStackNavigator,
  InboxStackNavigator,
} from './HomeNavigation';
import CartScreen from '../Screens/CartScreen/CartScreen';
import CartIcon from '../Screens/CartScreen/CartIcon';
import AuthGlobal from '../Redux/AuthStore/AuthGlobal';
import OrdersScreen from '../Screens/OrderScreen/OrdersScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const BottomTabStack = createBottomTabNavigator();
const getTabBarStyle = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  let display = routeName === 'Chat' ? 'none' : 'flex';
  return {display};
};
const MainNavigator = () => {
  const context = useContext(AuthGlobal);

  const UserId = context?.userValue?.userId;
  const ShopId = context?.shopValue?.shopId;
  console.log('ShopId', context?.shopValue);
  return (
    <BottomTabStack.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: '#e91e63',
        tabBarHideOnKeyboard: true,

        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#03bafc',
        tabBarInactiveTintColor: 'grey',
      }}
      initialRouteName="Login">
      <BottomTabStack.Screen
        name="Home"
        component={InboxStackNavigator}
        // component={HomeNavigation}
        options={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#03bafc',
          tabBarInactiveTintColor: 'grey',
          tabBarShowLabel: false,
          tabBarStyle: getTabBarStyle(route),
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View>
                <FontAwesome
                  name="home"
                  style={{position: 'relative'}}
                  size={30}
                  color={color}
                />
              </View>
            );
          },
        })}
      />
      {/* {UserId ? (
        <>
          <BottomTabStack.Screen
            name="CartScreen"
            component={CartStackNavigator}
            options={{
              tabBarActiveTintColor: '#03bafc',
              tabBarInactiveTintColor: 'grey',
              tabBarIcon: ({color, size, focused}) => {
                return (
                  <View>
                    <FontAwesome5
                      name="shopping-cart"
                      style={{position: 'relative'}}
                      color={color}
                      size={30}
                    />
                    <CartIcon />
                  </View>
                );
              },
            }}
          />
          <BottomTabStack.Screen
            name="OrdersScreen"
            component={OrdersScreen}
            options={{
              tabBarActiveTintColor: '#03bafc',
              tabBarInactiveTintColor: 'grey',
              tabBarIcon: ({color, size, focused}) => {
                return (
                  <View>
                    <FontAwesome5
                      name="gift"
                      style={{position: 'relative'}}
                      color={color}
                      size={30}
                    />
                    {/* <CartIcon /> 
                  </View>
                );
              },
            }}
          />
        </>
      ) : null} */}
      {/* {auth().currentUser.uid ? ( */}
      {ShopId ? (
        <BottomTabStack.Screen
          name="AdminScreen"
          component={AdminStackNavigator}
          options={{
            tabBarActiveTintColor: '#03bafc',
            tabBarInactiveTintColor: 'grey',

            tabBarIcon: ({color, size, focused}) => {
              return (
                <MaterialIcons
                  name="settings"
                  style={{position: 'relative'}}
                  color={color}
                  size={30}
                />
              );
            },
          }}
        />
      ) : null}
      <BottomTabStack.Screen
        name="UserScreen"
        component={UserStackNavigator}
        options={{
          tabBarInactiveTintColor: 'grey',

          tabBarIcon: ({color, size, focused}) => {
            return (
              <FontAwesome
                name="user"
                style={{position: 'relative'}}
                color={color}
                size={30}
              />
            );
          },
        }}
      />
    </BottomTabStack.Navigator>
  );
};

export default MainNavigator;
