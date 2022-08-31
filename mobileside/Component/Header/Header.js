import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../../config/colors';
import config from '../../config/config';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AppIconButton from '../AppButtons/AppIconButton';
import {userlogout} from '../../Redux/actions/Auth.Action';
import {shoplogout} from '../../Redux/actions/ShopAuth.action';
import {Select} from 'native-base';

const {width, height} = Dimensions.get('window');
const Header = props => {
  const context = useContext(AuthGlobal);
  const [currentShop, setCurrentShop] = useState();
  const [userProfile, setuserProfile] = useState();
  const navigation = useNavigation();
  const userId = context?.userValue?.userId;
  const shopId = context?.shopValue?.shopId;

  if (userId) {
    useEffect(() => {
      if (userId === null) {
        navigation.navigate('Login');
      }
      const asyncAuthURL = `${config.server}/users/auth/userprofile/${userId}`;
      AsyncStorage.getItem('user_login_Jwt_Token').then(res => {
        let requestBody = {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        };
        axios.get(asyncAuthURL, requestBody).then(user => {
          setuserProfile(user.data);
        });
      });
    }, [userId]);
  } else {
    useEffect(() => {
      if (shopId === null) {
        navigation.navigate('Login');
      }
      const asyncShopAuthURL = `${config.server}/shop/shopdetail/${shopId}`;
      AsyncStorage.getItem('shop_jwt').then(res => {
        let requestBody = {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        };
        axios
          .get(asyncShopAuthURL, requestBody)
          .then(shop => {
            setCurrentShop(shop.data);
          })
          .catch(err => {
            console.log('error in get shop details', err);
          });
      });
    }, [shopId]);
  }
  return (
    <SafeAreaView style={styles.header}>
      <View
        style={{
          width: width / 1,
          height: height / 13,

          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {shopId ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                // borderWidth: 1,
                width: width / 1.07,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => alert(currentShop?.name)}
                style={{
                  alignSelf: 'center',
                  right: 48,
                  width: 110,
                  marginLeft: 10,
                  // borderWidth: 2,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#fff',
                  }}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  {currentShop?.name}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  // width: 50,
                  // height: 50,
                  // right: 45,
                  marginVertical: 2,

                  right: 30,
                  marginHorizontal: 10,
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  resizeMode="contain"
                  source={require('../../assets/shopping-cart-20380.png')}
                />
              </View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  left: 55,
                  marginRight: 10,
                }}>
                <AppIconButton
                  style={{
                    fontWeight: 'bold',
                  }}
                  IconStyle={{
                    left: 1,
                  }}
                  leftIcon={true}
                  iconAs={'AntDesign'}
                  iconColor={'#fff'}
                  name={'logout'}
                  size={17}
                  width={-62}
                  height={-8}
                  marginY="20%"
                  borderRadius={20}
                  buttonBgColor={colors.dangerpro.danger600}
                  onPress={() => {
                    AsyncStorage.removeItem('shop_jwt'),
                      shoplogout(context.dispatchShop);
                    navigation.navigate('Login');
                  }}
                />
                {/* <AppIconButton
                  style={{
                    fontWeight: 'bold',
                  }}
                  leftIcon={true}
                  iconAs={'MaterialCommunityIcons'}
                  iconColor={'#fff'}
                  name={'android-messages'}
                  size={17}
                  width={-60}
                  height={-8}
                  marginY="20%"
                  borderRadius={20}
                  buttonBgColor={colors.warningpro.warning400}
                  txtColor={colors.default.white}
                  onPress={() => {
                    navigation.navigate('InboxScreen');
                  }}
                /> */}
              </View>
            </View>
          </>
        ) : (
          <>
            {userId ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    // borderWidth: 1,
                    width: width / 1.07,
                  }}>
                  <TouchableOpacity
                    onPress={() => alert(userProfile?.name)}
                    style={{
                      alignSelf: 'center',
                      left: 75,
                      width: 100,
                      marginLeft: 10,

                      flexWrap: 'wrap',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                      }}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}>
                      {userProfile?.username}
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <Image
                      style={{
                        height: 50,
                        right: 13,
                      }}
                      resizeMode="contain"
                      source={require('../../assets/shopping-cart-20380.png')}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 50,
                      right: 85,

                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <AppIconButton
                      style={{
                        left: 10,
                      }}
                      leftIcon={true}
                      iconAs={'MaterialCommunityIcons'}
                      iconColor={colors.amber.amber300}
                      name={'android-messages'}
                      size={40}
                      width={-30}
                      height={6}
                      marginY="18%"
                      borderRadius={20}
                      onPress={() => {
                        navigation.navigate('InboxScreen');
                      }}
                    />
                    <AppIconButton
                      leftIcon={true}
                      iconAs={'AntDesign'}
                      iconColor={colors.default.white}
                      IconStyle={{
                        fontWeight: '800',
                        left: 1,
                      }}
                      name={'logout'}
                      size={18}
                      width={-60}
                      height={-9}
                      marginY="30%"
                      borderRadius={20}
                      buttonBgColor={colors.dangerpro.danger600}
                      onPress={() => {
                        userlogout(context.dispatch);
                        navigation.navigate('Login');
                      }}
                    />
                  </View>
                </View>
              </>
            ) : (
              <>
                <Image
                  style={{height: 50}}
                  resizeMode="contain"
                  source={require('../../assets/shopping-cart-20380.png')}
                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    // width: width,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // paddingVertical: 10,
    backgroundColor: '#AD40AF',
  },
});
export default Header;
{
  /* <View
style={{
  // left: 100,
  // fontSize: 30,
  // width: 30,
  // backgroundColor: 'red',
  // borderWidth: 2,
  borderColor: '#03bafc',
}}>markjons@mail.com
<Select
  style={{
    // borderWidth: 2,
    left: 10,
    // fontSize: 30,
    width: 10,
    borderColor: '#03bafc',
  }}
  placeholder="Mode of payment"
  // selectedValue={language}
  width={50}
  onValueChange={itemValue => setLanguage(itemValue)}>
  <Select.Item label="Wallet" value="key0" />
  <Select.Item label="ATM Card" value="key1" />
  <Select.Item label="Debit Card" value="key2" />
  <Select.Item label="Credit Card" value="key3" />
  <Select.Item label="Net Banking" value="key4" />
</Select>
</View> */
}
