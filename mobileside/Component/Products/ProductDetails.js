import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useToast} from 'native-base';
import {Center, Box, Stack} from 'native-base';
import * as actions from '../../Redux/actions/cartAction';
import {connect} from 'react-redux';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AppIconButton from '../AppButtons/AppIconButton';
import colors from '../../config/colors';
import {useNavigation} from '@react-navigation/core';
import {getProductImages} from '../../Redux/actions/Product.actions';
import config from '../../config/config';
import AppImageSlider from '../AppImageSlider/AppImageSlider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getShopDetailByUuid} from '../../Redux/actions/ShopAuth.action';
import {ActivityIndicator} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const ProductDetails = props => {
  const [item, setItem] = useState(props.route.params.item);
  const [avalibility, setAvalibility] = useState('');
  const [imagesList, setImagesList] = useState([]);
  const [shopListDetails, setShopListDetails] = useState();
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigation = useNavigation();
  const configDotServer = config.server;
  const context = useContext(AuthGlobal);
  const contextValue = context?.userValue
    ? context?.userValue
    : context?.shopValue;
  const isAuthenticated = context?.userValue?.isUser;
  const isShopAuthenticated = context?.shopValue?.isShop;
  let getproductImagesURL = `${configDotServer}/product/getproductImages/${item?.productUuid}`;

  useEffect(() => {
    if (props.route.params.item) {
      setItem(props.route.params.item);
    }
    getProductImages(getproductImagesURL)?.then(res => {
      setImagesList(res?.data);
    });
    getShopDetailByUuid(item?.shop_uuid).then(res => {
      setShopListDetails(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
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
              {/* case 1: isShop login true*/}
              <View style={styles.container}>
                <ScrollView
                  style={{height: height, marginBottom: 100, padding: 5}}>
                  <AppImageSlider images={imagesList} />

                  <View style={styles.contentContainer}>
                    <Text style={styles.contentHeading}>{item.name}</Text>
                    <Text style={styles.contentText}>SKU:{item.sku}</Text>
                    <Text style={styles.contentText}>{item.description}</Text>
                  </View>
                </ScrollView>
                <View
                  style={{
                    position: 'absolute',
                    top: 548,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: height / 11.5,
                    width: width - 1,

                    backgroundColor: colors.indigopro.indigo700,
                  }}>
                  <Stack direction="row">
                    <Box
                      direction="row"
                      style={{
                        flexDirection: 'row',
                        width: width - 1,
                        justifyContent: 'space-around',
                      }}>
                      <Center style={{right: 10}} rounded="sm">
                        <Text style={{fontSize: 20, color: '#fff'}}>
                          ${item.price}
                        </Text>
                      </Center>
                      <Center rounded="sm">
                        {/* <AppIconButton
                          style={{
                            fontWeight: 'bold',
                          }}
                          leftIcon={true}
                          iconAs={'MaterialIcons'}
                          iconColor={colors.amber.amber400}
                          name={'chat'}
                          size={37}
                          height={25}
                          marginX={'6%'}
                          marginY="0%"
                          IconStyle={{top: 12}}
                          txtColor={colors.default.white}
                          onPress={() => {
                            navigation.navigate('InboxScreen', {
                              item: item,
                            });
                          }}
                        /> */}
                      </Center>
                      <Center
                        size={16}
                        _dark={{
                          bg: 'secondary.400',
                        }}
                        rounded="sm"
                        _text={{
                          color: 'warmGray.50',
                          fontWeight: 'medium',
                        }}>
                        {contextValue?.shop_uuid === item?.shop_uuid ? (
                          <>
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                left: 5,
                              }}>
                              <AppIconButton
                                style={{
                                  fontWeight: 'bold',
                                }}
                                title={'Edit'}
                                leftIcon={true}
                                iconAs={'MaterialCommunityIcons'}
                                iconColor={'#fff'}
                                name={'pencil'}
                                size={17}
                                buttonStyle={{
                                  margin: 5,
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                width={-20}
                                height={-8}
                                marginX={'5%'}
                                marginY="20%"
                                borderRadius={20}
                                buttonBgColor={colors.dangerpro.danger600}
                                txtColor={colors.default.white}
                                onPress={() => {
                                  navigation.navigate('AdminProductForm', {
                                    item: item,
                                  });
                                }}
                              />
                            </View>
                          </>
                        ) : (
                          <></>
                        )}
                      </Center>
                    </Box>
                  </Stack>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* case 2: isuser login true*/}
              <ScrollView style={{marginBottom: 80, padding: 5, top: 10}}>
                <View style={styles.container}>
                  <View>
                    <AppImageSlider images={imagesList} />
                  </View>
                  <View style={styles.contentContainer}>
                    <Text style={styles.contentHeading}>{item.name}</Text>
                    <Text style={styles.contentText}>SKU:{item.sku}</Text>
                    <Text style={styles.contentText}>
                      Description:{item?.description}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.contentText}>Shop Name :</Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (shopListDetails.length > 0) {
                            navigation.navigate('ShopDetails', {
                              shopListDetails: shopListDetails,
                            });
                          }
                        }}>
                        <Text
                          style={[
                            styles.contentText,
                            {color: colors.indigopro.indigo600},
                          ]}>
                          {shopListDetails ? shopListDetails[0]?.name : null}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  top: 548,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: height / 11.5,
                  width: width - 1,

                  backgroundColor: colors.indigopro.indigo700,
                }}>
                <Stack direction="row">
                  <Box
                    direction="row"
                    style={{
                      flexDirection: 'row',
                      width: width - 1,
                      justifyContent: 'space-around',
                    }}>
                    <Center style={{right: 10}} rounded="sm">
                      <Text style={{fontSize: 20, color: 'red'}}>
                        ${item.price}
                      </Text>
                    </Center>
                    <Center rounded="sm">
                      {/* <AppIconButton
                        style={{
                          fontWeight: 'bold',
                        }}
                        leftIcon={true}
                        iconAs={'MaterialIcons'}
                        iconColor={colors.amber.amber400}
                        name={'chat'}
                        size={37}
                        height={25}
                        marginX={'6%'}
                        marginY="0%"
                        IconStyle={{top: 12}}
                        txtColor={colors.default.white}
                        onPress={() => {
                          navigation.navigate('InboxScreen', {
                            item: item,
                          });
                        }}
                      /> */}
                    </Center>
                    <Center
                      size={16}
                      _dark={{
                        bg: 'secondary.400',
                      }}
                      rounded="sm"
                      _text={{
                        color: 'warmGray.50',
                        fontWeight: 'medium',
                      }}>
                      <>
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            left: 5,
                          }}>
                          <AppIconButton
                            style={{
                              fontWeight: 'bold',
                            }}
                            title={'add'}
                            leftIcon={true}
                            iconAs={'MaterialCommunityIcons'}
                            iconColor={'#fff'}
                            name={'cart'}
                            size={17}
                            width={-20}
                            height={-8}
                            marginX={'5%'}
                            marginY="20%"
                            borderRadius={20}
                            buttonBgColor={colors.dangerpro.danger600}
                            txtColor={colors.default.white}
                            onPress={() => {
                              props.addItemToCart(item);
                              toast.show({
                                title: `Product '${item.name}' added to cart successfully`,
                                placement: 'top',
                              });
                            }}
                          />
                        </View>
                      </>
                    </Center>
                  </Box>
                </Stack>
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};
const mapDespatchToProps = dispatch => {
  return {
    addItemToCart: propduct => {
      dispatch(actions.AddToCart(propduct));
    },
  };
};
export default connect(null, mapDespatchToProps)(ProductDetails);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    marginBottom: 100,
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeading: {
    fontWeight: '900',
    fontSize: 40,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
});
