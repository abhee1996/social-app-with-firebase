import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {useNavigation} from '@react-navigation/core';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import colors from '../../config/colors';
import RegisterShop from './RegisterShop';

const DashboardScreen = () => {
  const context = useContext(AuthGlobal);
  console.log('cotext', context?.user?.uid);
  // const [currentShop, setCurrentShop] = useState();

  // const navigation = useNavigation();
  const ShopId = context?.shopValue?.shopId;
  // const shop = context?.shopValue;
  // const isShopAuthenticated = context?.shopValue?.isShop;

  // useEffect(() => {
  //   if (isShopAuthenticated === false || isShopAuthenticated === null) {
  //     navigation.navigate('Login');
  //   }
  //   const asyncShopAuthURL = `${config.server}/shop/shopdetail/${ShopId}`;
  //   AsyncStorage.getItem('shop_jwt').then(res => {
  //     let requestBody = {
  //       headers: {
  //         Authorization: `Bearer ${res}`,
  //       },
  //     };
  //     axios
  //       .get(asyncShopAuthURL, requestBody)
  //       .then(shop => {
  //         setCurrentShop(shop.data);
  //       })
  //       .catch(err => {
  //         console.log('error in get shop details', err);
  //       });
  //   });
  // }, [isShopAuthenticated]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.voiletpro.violet500,
        alignItems: 'center',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>
        Welcome to Shop Dashboard
      </Text>
      <Text style={{color: '#fff'}}>{`\t ${context?.user?.uid}`}</Text>
      {/* {ShopId ? (
        <>
          <RegisterShop isShopAuthenticated={isShopAuthenticated} />
        </>
      ) : (
        <></>
      )} */}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
