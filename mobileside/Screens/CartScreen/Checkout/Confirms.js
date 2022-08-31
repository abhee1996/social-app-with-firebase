import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {Box, Center, Heading, List, Radio, Select, useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
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
import * as action from '../../../Redux/actions/cartAction';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
const paymentMethod = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Credit/Debit Card Payment', value: 3},
];

const configDotServer = config.server;
const Confirms = props => {
  const [paymentCardMethod, setPaymentCardMethod] = useState();

  const propsRouteParams = props?.route?.params;
  console.log('propsRouteParams', propsRouteParams);
  const OrdersInfo = propsRouteParams?.order?.params?.order;
  let SelectedVal = propsRouteParams?.selected;
  console.log('propsRouteParams.SelectedVal', SelectedVal);
  const toast = useToast();
  const [orderedProduct, setOrderedProduct] = useState();
  useEffect(() => {
    paymentMethod.filter(e => {
      if (SelectedVal === e.value) {
        setPaymentCardMethod(e);
      }
    });
    OrdersInfo?.orderItems?.map(x => setOrderedProduct(x?.product?.item));
  }, []);
  console.log('JSON.str orderItems', orderedProduct?.product?.item);

  const finalOrder = () => {
    try {
      const finalOrderURL = `${configDotServer}/order/new`;
      const order = {
        orderItems: OrdersInfo.orderItems,
        shippingAddress1: OrdersInfo.shippingAddress1,
        shippingAddress2: OrdersInfo.shippingAddress2,
        city: OrdersInfo.city,
        zipcode: OrdersInfo.zipcode,
        country: OrdersInfo.country,
        phone: OrdersInfo.phone,
        status: OrdersInfo.status || 'Pending',
        user_uid: OrdersInfo.user_uuid,
        totalPrice: propsRouteParams?.ptotal,
      };
      axios.post(finalOrderURL, order).then(res => {
        toastAction(res, order);
      });
    } catch (error) {
      console.log('finalconfirm error', error);
    }
  };
  const toastAction = (response, order) => {
    try {
      if (response.status === 200) {
        action.clearCart();
        toast.show({
          title: 'Order Completed Successfully',
          placement: 'top-right',
          color: 'white',
          bgColor: 'green.300',
        });

        setTimeout(() => {
          props.navigation.navigate('OrderPlaced', {order});
          //props.clearCart();
          action.clearCart();
        }, 500);
      }
    } catch (err) {
      console.warn('error in registeration', err);
      toast.show({
        // title: `${
        //   isShopAuthenticated ? 'Shop Updated failed' : 'Registeration failed'
        // }`,
        title: `Order Not Completed`,
        placement: 'top-right',
      });
    }
  };
  return (
    <>
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 27,
              marginVertical: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirms </Text>
          </View>
          <View>
            {propsRouteParams ? (
              <>
                <View style={{borderWidth: 1, borderColor: 'orange'}}>
                  <Text style={styles.title}>Shipping</Text>
                  <View style={{padding: 8}}>
                    <Text>Address: {OrdersInfo?.shippingAddress1}</Text>
                    <Text>Address 2: {OrdersInfo?.shippingAddress2}</Text>
                    <Text>city: {OrdersInfo?.city}</Text>
                    <Text>zipcode: {OrdersInfo?.zipcode}</Text>
                    <Text>country: {OrdersInfo?.country}</Text>
                  </View>
                  <Text style={styles.title}>Items:</Text>
                  {OrdersInfo?.orderItems?.map(x => {
                    let item = x?.product ? x?.product?.item : x;
                    console.log('item', item);
                    return (
                      <List
                        style={styles.listItem} //key={x?.product?.item?.id}
                      >
                        <List.Item
                          style={{
                            flex: 1,
                          }}>
                          <Box
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Image
                              size={50}
                              alt="fallback text"
                              style={{
                                width: 50,
                                height: 50,

                                borderWidth: 1,
                              }}
                              borderRadius={100}
                              source={{
                                uri: item.image, //'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_960_720.jpg',
                              }}
                              resizeMode={'contain'}
                            />
                          </Box>
                          <View
                            direction="row"
                            style={{
                              marginHorizontal: 13,
                              bottom: 2,
                              alignSelf: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '75%',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                alignSelf: 'center',
                              }}>
                              {item?.name}
                            </Text>
                            <Text style={{fontSize: 20, color: 'grey'}}>
                              ${item?.price}
                            </Text>
                          </View>
                        </List.Item>
                      </List>
                    );
                  })}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginHorizontal: 27,
                      marginVertical: 20,
                      fontWeight: 'bold',
                    }}>
                    <Text style={{fontWeight: '900', fontSize: 20}}>
                      Total :{propsRouteParams?.ptotal}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>

          <View>
            <AppIconButton
              title="Save"
              size={25}
              width={25}
              height={4}
              marginX="3%"
              marginY="5%"
              borderRadius={0}
              buttonBgColor={colors.successpro.success500}
              txtColor={colors.default.white}
              onPress={() => {
                console.log('final order');
                finalOrder();
                //action?.clearCart();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(action.clearCart()),
    removeCart: item => dispatch(action.RemoveFromCart(item)),
  };
};
export default Confirms; //connect(null, mapDispatchToProps)(Confirms);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    borderWidth: 1,
    height: 70,
  },
});
