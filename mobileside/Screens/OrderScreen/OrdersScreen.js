import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import config from '../../config/config';

import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {getUserProfileByUUID} from '../../Redux/actions/Auth.Action';
import colors from '../../config/colors';
import {getShopDetailByUuid} from '../../Redux/actions/ShopAuth.action';
import {getOrderDetails} from '../../Redux/actions/orders.actions';

import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
const configDotServer = config.server;

const OrdersScreen = props => {
  const context = useContext(AuthGlobal);
  const UserId = context?.userValue?.user_uid;
  const ShopId = context?.shopValue?.shop_uuid;
  const [senderValue, setSenderValue] = useState([]);
  const [buyerValue, setBuyerValue] = useState([]);
  const [orderList, setOrderList] = useState();
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [statusColor, setStatusColor] = useState(colors.primarypro.primary600);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    handleRefreshOrderDetails();
    orderStatusColor();
  }, []);
  function orderStatusColor() {
    if (orderStatus === `Pending`) {
      setStatusColor(colors.primarypro.primary600);
      return colors.primarypro.primary600;
    } else if (orderStatus === 'Dispatched') {
      setStatusColor(colors.warningpro.warning600);
      return colors.warningpro.warning600;
    } else if (orderStatus === 'Successfull') {
      setStatusColor(colors.successpro.success600);
      return colors.successpro.success600;
    } else {
      setStatusColor(colors.dangerpro.danger600);
      return colors.dangerpro.danger600;
    }
  }
  async function handleRefreshOrderDetails() {
    if (UserId) {
      //if UserId then user orderlist
      let GET_ORDER_LIST_URL = `${configDotServer}/order/orderdetailby/userid/${UserId}`;
      let res = await getOrderDetails(GET_ORDER_LIST_URL);
      setOrderList(res?.data.reverse());
      res?.data?.forEach(async (orderValue, i) => {
        setOrderStatus(orderValue.status);
        let resUser = await getShopDetailByUuid(orderValue?.shop_uuid);

        setSenderValue(resUser[0]?.name.toUpperCase());
        setLoading(false);
      });
      setLoading(false);
    } else if (ShopId) {
      //if ShopId then shop orderlist
      console.log('//if ShopId then shop orderlist');
      let GET_ORDER_SHOP_URL = `${configDotServer}/order/orderdetailby/shop/${ShopId}`;

      let resData = await getOrderDetails(GET_ORDER_SHOP_URL);
      setOrderList(resData.data.reverse());
      resData?.data?.forEach(async (orderValue, i) => {
        setOrderStatus(orderValue.status);
        let resShop = await getUserProfileByUUID(orderValue?.user_uid);
        setBuyerValue(resShop[0]?.name.toUpperCase());
        setLoading(false);
      });
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        height: height,
        bottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginHorizontal: 27,
          marginVertical: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Placed Orders </Text>
      </View>

      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.subContainer}>
            {orderList?.length > 0 ? (
              <>
                {orderList?.map((order, index) => {
                  return (
                    <>
                      <View
                        style={{
                          backgroundColor: colors.dangerpro.danger600,
                          color: colors.default.white,
                          margin: 5,
                          padding: 15,
                          width: width - 20,
                          borderRadius: 10,

                          borderWidth: 3,
                          borderStyle: 'dashed',
                        }}>
                        <View
                          style={{
                            backgroundColor: colors.dangerpro.danger600,
                            color: colors.default.white,
                            borderRadius: 10,
                          }}>
                          <Text
                            style={
                              (styles.textColor,
                              {fontWeight: '700', fontSize: 17})
                            }>
                            order Id : {order.orderUuid}
                          </Text>
                          <Text style={styles.textColor}>
                            <Text>
                              {UserId
                                ? `order delivery by : ${senderValue}`
                                : `order placed by : ${buyerValue}`}
                            </Text>
                          </Text>
                          <Text style={styles.textColor}>
                            address : {order.shippingAddress1}
                          </Text>
                          <Text style={styles.textColor}>
                            Total : {order.totalPrice}
                          </Text>

                          {UserId ? (
                            <>
                              {orderStatus === `Pending` ? (
                                <>
                                  <TouchableOpacity
                                    style={styles.status}
                                    onPress={() =>
                                      setOrderStatus('Dispatched')
                                    }>
                                    <Text
                                      style={[
                                        styles.status,
                                        {color: statusColor},
                                      ]}>
                                      {orderStatus}
                                    </Text>
                                  </TouchableOpacity>
                                </>
                              ) : orderStatus === 'Dispatched' ? (
                                'Dispatched'
                              ) : (
                                <>
                                  <Text
                                    style={[
                                      styles.status,
                                      {color: statusColor},
                                    ]}>
                                    {orderStatus}
                                  </Text>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {orderStatus === `Pending` ? (
                                <>
                                  <TouchableOpacity
                                    style={styles.status}
                                    onPress={() => {
                                      setOrderStatus('Dispatched');
                                      orderStatusColor();
                                    }}>
                                    <Text
                                      style={[
                                        styles.status,
                                        {color: statusColor},
                                      ]}>
                                      {orderStatus}
                                    </Text>
                                  </TouchableOpacity>
                                </>
                              ) : orderStatus === 'Dispatched' ? (
                                <>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setOrderStatus('Fullfilled');
                                      orderStatusColor();
                                    }}>
                                    <Text
                                      style={[
                                        styles.status,
                                        {color: statusColor},
                                      ]}>
                                      {orderStatus}
                                    </Text>
                                  </TouchableOpacity>
                                </>
                              ) : (
                                <>
                                  <Text
                                    style={[
                                      styles.status,
                                      {color: statusColor},
                                    ]}>
                                    {orderStatus}
                                  </Text>
                                </>
                              )}
                            </>
                          )}
                        </View>
                      </View>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <Text style={{marginTop: 20}}>
                  Currently No Order Available ,Please place your first order
                </Text>
              </>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};
export default OrdersScreen;

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    marginBottom: 500,
  },
  textColor: {
    color: '#fff',
    margin: 3,
    fontSize: 14,
    fontWeight: '800',
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  status: {
    margin: 3,
    fontSize: 17,
    fontWeight: '800',
    alignSelf: 'flex-end',
  },
});
