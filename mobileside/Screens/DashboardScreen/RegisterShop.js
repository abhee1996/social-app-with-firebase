import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import colors from '../../config/colors';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import Error from '../../Component/Error';

import config from '../../config/config';
import axios from 'axios';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'native-base';
import {getShopDetail} from '../../Redux/actions/ShopAuth.action';
import {saveCurrentShop} from '../../Redux/actions/ShopAuth.action';
import {ActivityIndicator} from 'react-native';
const {width, height} = Dimensions.get('window');
const RegisterShop = props => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [discription, setDiscription] = useState('');
  const [address, setAddress] = useState('');
  const [shop, setShop] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);
  const toast = useToast();

  const shopValue = context?.shopValue;
  const shopId = shopValue?.shopId;
  let shopData;
  const isShopAuthenticated = props?.isShopAuthenticated;

  useEffect(() => {
    if (!shopValue) {
      setShop(null);
      setLoading(false);
    } else {
      getShopDetail(shopId).then(_res => {
        setShop(_res),
          setName(_res?.name),
          setEmail(_res?.email),
          setOwner(_res?.owner),
          setNumber(_res?.number);
        setDiscription(_res?.discription);
        setType(_res?.type);
        setAddress(_res?.place);
        setLoading(false);
      });
    }
    AsyncStorage.getItem('shop_jwt')
      .then(res => {
        setToken(res);
        // console.log('token', token);
      })
      .catch(error => console.log('error', error));
  }, []);

  const shopAction = response => {
    try {
      if (response.status == 200) {
        toast.show({
          title: `${
            isShopAuthenticated
              ? 'Shop Updated Successfully'
              : 'Registeration Successfully'
          }`,
          placement: 'top-right',
          color: 'white',
          bgColor: 'green.300',
        });
        {
          isShopAuthenticated
            ? null
            : setTimeout(() => {
                props.navigation.navigate('Login');
              }, 500);
        }
      }
    } catch (err) {
      console.warn('error in registeration', err);
      toast.show({
        title: `${
          isShopAuthenticated ? 'Shop Updated failed' : 'Registeration failed'
        }`,
        placement: 'top-right',
      });
    }
  };
  const saveShop = () => {
    if (
      (name === '' || owner === '' || email === '' || password === '',
      number === '')
    ) {
      setError('Please fill all credientials to register');
    } else {
      if (isShopAuthenticated) {
        console.log('update shop data');

        const putshop = {
          name: name,
          owner: owner,
          email: email,
          discription: discription,
          place: address,
          type: type,
          number: number,
        };
        saveCurrentShop(isShopAuthenticated, putshop, shopId).then(_res => {
          shopAction(_res);
          setLoading(false);
        });
      } else {
        console.log('register new shop');
        const newshop = {
          name: name,
          owner: owner,
          email: email,
          password: password,
          number: number,
        };

        saveCurrentShop(isShopAuthenticated, newshop).then(_res => {
          shopAction(_res);
          setLoading(false);
        });
      }
    }
  };

  return (
    <View>
      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          {isShopAuthenticated ? (
            <>
              <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}>
                <FormContainer title=" Shop Profile">
                  <InputField
                    placeholder="Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                  />
                  <InputField
                    placeholder="Owner Name"
                    name="owner"
                    value={owner}
                    id={'owner'}
                    onChangeText={text => setOwner(text)}
                  />
                  <InputField
                    placeholder="Email "
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                  />

                  <InputField
                    placeholder="Phone Number"
                    name="number"
                    id={'number'}
                    // value={number}
                    value={number?.toString()}
                    keyboardType={'numeric'}
                    onChangeText={text => setNumber(text)}
                  />
                  <InputField
                    placeholder="Type"
                    name="type"
                    value={type}
                    id={'type'}
                    onChangeText={text => setType(text.toLowerCase())}
                  />
                  <InputField
                    placeholder="Discription"
                    name="discription"
                    value={discription}
                    id={'discription'}
                    onChangeText={text => setDiscription(text)}
                  />

                  <InputField
                    placeholder="Address"
                    name="place"
                    value={address}
                    id={'place'}
                    onChangeText={text => setAddress(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View>
                    <AppIconButton
                      title="Save"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={() => saveShop()}
                    />
                  </View>
                </FormContainer>
              </KeyboardAwareScrollView>
            </>
          ) : (
            <>
              <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}>
                <FormContainer title="Create Shop Account">
                  <InputField
                    placeholder="Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                  />
                  <InputField
                    placeholder="Owner Name"
                    name="owner"
                    value={owner}
                    id={'owner'}
                    onChangeText={text => setOwner(text)}
                  />
                  <InputField
                    placeholder="Email "
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                  />
                  <InputField
                    placeholder="Password"
                    name="password"
                    value={password}
                    id={'password'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />
                  <InputField
                    placeholder=" Number"
                    name="number"
                    id={'number'}
                    value={number?.toString()}
                    keyboardType={'numeric'}
                    onChangeText={text => setNumber(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View>
                    <AppIconButton
                      title="Register as Shop"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={() => saveShop()}
                    />
                  </View>
                  <View>
                    <AppIconButton
                      title="Login as Shop"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.warningpro.warning500}
                      txtColor={colors.default.white}
                      onPress={() => props.navigation.navigate('Login')}
                    />
                  </View>
                </FormContainer>
              </KeyboardAwareScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default RegisterShop;

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
});
// const saveShop = async () => {
// let registerShopURL = `${config.server}/shop/auth/new`;
// let updateShopURL = `${config.server}/shop/put/${shopId}`;
//   if (
//     (name === '' || owner === '' || email === '' || password === '',
//     number === '')
//   ) {
//     setError('Please fill all credientials to register');
//   } else {
//     let putshop = {
//       name: name,
//       owner: owner,
//       email: email,
//       discription: discription,
//       place: address,
//       type: type,
//     };
//     const config = {
//       headers: {
//         // Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     if (isShopAuthenticated) {
//       console.log('update shop data');
//       const putResponse = await axios.put(updateShopURL, putshop, config);
//       let result = putResponse.then(res => {
//         return res;
//       });

//       shopAction(result);
//       // shopAction(updateShopURL, shop, config);
//     } else {
//       console.log('register new shop');
//       const newshop = {
//         name: name,
//         owner: owner,
//         email: email,
//         password: password,
//         number: number,
//       };
//       let newResponse = await axios.post(registerShopURL, newshop, config);
//       let result = newResponse.then(res => {
//         return res;
//       });

//       shopAction(result);
//     }
//   }
// };
