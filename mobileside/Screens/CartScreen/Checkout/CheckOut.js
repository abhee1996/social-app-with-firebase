import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useToast} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import FormContainer from '../../../Component/FormContainer';
import InputField from '../../../Component/InputField';
import Error from '../../../Component/Error';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import config from '../../../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIconButton from '../../../Component/AppButtons/AppIconButton';
import colors from '../../../config/colors';
import Screen from '../../../Component/Screen';
import AppPicker from '../../../Component/AppPicker/AppPicker';
import * as RNImagePicker from 'react-native-image-picker';
import mime from 'mime';
import {connect} from 'react-redux';
import AuthGlobal from '../../../Redux/AuthStore/AuthGlobal';
import {getUserProfile} from '../../../Redux/actions/Auth.Action';
const {width} = Dimensions.get('window');
const countries = require('../../../config/countries.json');

const CheckOut = props => {
  const context = useContext(AuthGlobal);
  const [userProfile, setuserProfile] = useState();

  const [orderItems, setOrderItems] = useState();
  const [error, setError] = useState();
  const [phone, setPhone] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipCode] = useState();
  const [country, setCountry] = useState();
  const [pickerValue, setPickerValue] = useState();
  const {cartItems} = props;
  console.log('O screen props?.route?.params', props?.route);
  const total = props?.route?.params?.total;
  const UserId = context?.userValue?.userId;
  const isUser = context?.userValue?.isUser;
  useEffect(() => {
    setOrderItems(cartItems);
    getUserProfile(UserId).then(res => {
      setuserProfile(res);
    });
  }, []);
  console.log('O userProfile=>', userProfile);

  const checkout = () => {
    let order = {
      city,
      country,
      phone,
      orderItems,
      shippingAddress1: address1,
      shippingAddress2: address2,
      zipcode,
      user_uuid: userProfile?.user_uid,
    };
    console.log('checkout__order', order);
    props.navigation.navigate('Payments', {order: order, total});
  };
  return (
    <View>
      <>
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          enableOnAndroid={true}>
          <FormContainer title="Shipping">
            {/* <View style={styles.ImageContainer}>
              <Image style={styles.Image} source={{uri: mainImage}} />
              <TouchableOpacity
                onPress={ImagePicker}
                style={styles.ImagePicker}>
                <FontAwesome name="camera" style={{color: 'white'}} />
              </TouchableOpacity>
            </View> */}
            <InputField
              placeholder="Phone"
              name="phone"
              id={'phone'}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
            <InputField
              placeholder="Shipping Address 1"
              name="address1"
              id={'address1'}
              value={address1}
              onChangeText={text => setAddress1(text)}
            />
            <InputField
              placeholder="Shipping Address 2"
              name="address2"
              id={'address2'}
              value={address2}
              onChangeText={text => setAddress2(text)}
            />
            <InputField
              placeholder="City"
              name="city"
              id={'city'}
              value={city}
              onChangeText={text => setCity(text)}
            />
            <InputField
              placeholder="ZipCode"
              name="zipcode"
              id={'zipcode'}
              keyboardType={'numeric'}
              value={zipcode}
              onChangeText={text => setZipCode(text)}
            />
            <View style={{marginTop: 10}}>
              <AppPicker
                selectedValue={pickerValue}
                pickerStyle={styles.picker}
                prickerItemStyle={styles.pickerItem}
                onValueChange={item => {
                  console.log('item', item);
                  setPickerValue(item), setCountry(item);
                }}
                dataArray={countries}
                placeholder={'Select Country'}
                pickerWidth={320}
              />
            </View>
            <View>{error ? <Error message={error} /> : null}</View>
            <View style={styles.buttonContainer}>
              <AppIconButton
                title="Save"
                leftIcon={true}
                size={15}
                marginX="3.5%"
                marginY="7%"
                borderRadius={0}
                buttonBgColor={colors.successpro.success500}
                txtColor={colors.default.white}
                onPress={() => checkout()}
              />
            </View>
          </FormContainer>
        </KeyboardAwareScrollView>
      </>
    </View>
  );
};
const mapStateToProps = state => {
  const {cartItems} = state;
  console.log('mapStateToProps cartItems', cartItems);
  return {
    cartItems: cartItems,
  };
};
export default connect(mapStateToProps, null)(CheckOut);

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  picker: {
    padding: 2,
    borderWidth: 0,
    // marginTop: 10,
  },
  prickerItem: {
    padding: 2,
    fontSize: 20,
    fontWeight: 600,
    borderWidth: 0,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  ImageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  ImagePicker: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
