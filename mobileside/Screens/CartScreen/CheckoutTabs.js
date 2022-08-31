import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import CheckOut from './Checkout/CheckOut';
import Payments from './Checkout/Payments';
import Confirms from './Checkout/Confirms';
import OrdersScreen from '../OrderScreen/OrdersScreen';
const Tab = createMaterialTopTabNavigator();

const CartCheckoutTab = props => {
  console.log('CartCheckoutTab props', props);
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Check"
      screenOptions={{
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: '#03bafc',
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {width: 100},
        tabBarStyle: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen
        name="CheckOut"
        initialParams={{
          total: props.route.params.total,
          clearCart: props?.route?.params?.clearCart,
        }}
        component={CheckOut}
      />
      {/* <Tab.Screen
        name="CheckOut"
        initialParams={{total: 45}}
        //component={CheckOut}
      >
        {props => (
          <CheckOut
            {...props}
            //extraData={props.route.params}
          />
        )}
      </Tab.Screen> */}
      <Tab.Screen name="Payments" component={Payments} />
      <Tab.Screen name="Confirms" component={Confirms} />
      <Tab.Screen name="OrderPlaced" component={OrdersScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};
// const Checkout = () => {
//   return (
//     <View>
//       <Text>CheckoutTabs</Text>
//     </View>
//   );
// };
// const Payments = () => {
//   return (
//     <View>
//       <Text>PaymentsTabs</Text>
//     </View>
//   );
// };
// const Confirms = () => {
//   return (
//     <View>
//       <Text>Confirms </Text>
//     </View>
//   );
// };
// const CheckoutTabs = () => {
//   return (
//     <>
//       <cartCheckoutTab />
//     </>
//   );
// };

export default CartCheckoutTab;

const styles = StyleSheet.create({});
