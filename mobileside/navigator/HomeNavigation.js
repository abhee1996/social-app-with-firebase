import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import ProductDetails from '../Component/Products/ProductDetails';
import AuthGlobal from '../Redux/AuthStore/AuthGlobal';
import AdminScreen from '../Screens/AdminScreen/AdminScreen';
import AdminCategories from '../Screens/AdminScreen/Categories.Admin';
import AdminOrders from '../Screens/AdminScreen/Orders.Admin';
import AdminProduct from '../Screens/AdminScreen/Product.Admin';
import AdminProductForm from '../Screens/AdminScreen/ProductForm.Admin';
import CartScreen from '../Screens/CartScreen/CartScreen';
import CheckOut from '../Screens/CartScreen/Checkout/CheckOut';
import Confirms from '../Screens/CartScreen/Checkout/Confirms';
import Payments from '../Screens/CartScreen/Checkout/Payments';
import CartCheckoutTab from '../Screens/CartScreen/CheckoutTabs';
import ChatScreen from '../Screens/ChatScreens/chat.screen';
import InboxScreen from '../Screens/ChatScreens/InboxScreen';
import DashboardScreen from '../Screens/DashboardScreen/DashboardScreen';
import RegisterShop from '../Screens/DashboardScreen/RegisterShop';
import OrdersScreen from '../Screens/OrderScreen/OrdersScreen';
import ProductScreen from '../Screens/ProductScreens/ProductScreen';
import ShopDetails from '../Screens/ShopScreens/ShopDetails';
import Login from '../Screens/UserScreen/Login';
import Register from '../Screens/UserScreen/Register';
import UserProfile from '../Screens/UserScreen/UserProfile';
import UserScreen from '../Screens/UserScreen/UserScreen';

const Stack = createStackNavigator();
// const AllStackNavigator = (screen, component) => {
//   let ScreenName = '';
//   let ComponentName;
//   useEffect(() => {
//     if (screen == 'UserScreen') {
//       ScreenName = screen;
//       ComponentName = component;
//     } else if (screen == 'ProductScreen') {
//       ScreenName = screen;
//       ComponentName = component;
//     } else if (screen == 'AdminScreen') {
//       ScreenName = screen;
//       ComponentName = component;
//     } else if (screen == 'CartScreen') {
//       ScreenName = screen;
//       ComponentName = component;
//     }
//   }, []);

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name={ScreenName}
//         component={ComponentName}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShopDetails"
        component={ShopDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const UserStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterShop"
        component={RegisterShop}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const UserStackNavigator = () => {
  const context = useContext(AuthGlobal);
  const UserId = context?.userValue?.userId;
  console.log('UserStackNavigator UserId', UserId);
  const ShopId = context?.shopValue?.shopId;
  return (
    <Stack.Navigator>
      {/* {UserId ? ( */}
      <>
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />
      </>
      {/* ) : (
        <>
          <Stack.Screen
            name="ShopProfile"
            component={DashboardScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )} */}
    </Stack.Navigator>
  );
};

const CartStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CartCheckoutTab"
        component={CartCheckoutTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const InboxStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminProducts"
        component={AdminProduct}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminCategories"
        component={AdminCategories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminOrders"
        component={OrdersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminProductForm"
        component={AdminProductForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <>
      <ProductStackNavigator />
    </>
  );
};

export {
  // AllStackNavigator,
  AuthStackNavigator,
  HomeNavigation,
  UserStackNavigator,
  AdminStackNavigator,
  CartStackNavigator,
  InboxStackNavigator,
};
