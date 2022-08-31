import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getShopDetailByUuid} from '../../Redux/actions/ShopAuth.action';
import {getfilterShopProduct} from '../../Redux/actions/Product.actions';
import config from '../../config/config';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as actions from '../../Redux/actions/cartAction';
import {connect} from 'react-redux';
import {useToast} from 'native-base';
const configDotServer = config.server;
const {width, height} = Dimensions.get('window');

const ShopDetails = props => {
  const [shopDeltaProducts, setShopDeltaProducts] = useState();
  const [loading, setLoading] = useState(true);
  const ShopDeltas = props?.route?.params?.shopListDetails;
  var filterShopProductURL = `${configDotServer}/product/getallProductBy/shopuuid/${ShopDeltas[0]?.shopUuid}`;
  const toast = useToast();
  // const toast = useToast();
  console.log('props', props);
  useEffect(() => {
    // getShopDetailByUuid(uuid);
    shopDeltafunc();
  }, []);
  async function shopDeltafunc() {
    const shopDeltaResponse = await getfilterShopProduct(filterShopProductURL);
    setShopDeltaProducts(shopDeltaResponse.data);
    setLoading(false);
  }
  return (
    <View style={{backgroundColor: colors.default.white, height: height}}>
      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          {props?.route?.params?.shopListDetails ? (
            <>
              {props.route.params.shopListDetails?.map(shop => {
                return (
                  <>
                    <View
                      style={{
                        justifyContent: 'space-evenly',
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-around',
                          flexDirection: 'row',
                          marginVertical: 20,
                        }}>
                        <View
                          style={{
                            width: 100,
                          }}></View>
                        <Text
                          style={[
                            styles.shopDetailHeadingText,
                            {
                              alignSelf: 'center',
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          ]}>
                          {shop.name}
                        </Text>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                          }}>
                          <AppIconButton
                            style={{
                              fontWeight: 'bold',
                            }}
                            leftIcon={true}
                            iconAs={'MaterialIcons'}
                            iconColor={colors.amber.amber400}
                            name={'chat'}
                            size={37}
                            height={25}
                            marginY="0%"
                            IconStyle={{top: 12}}
                            txtColor={colors.default.white}
                            onPress={() => {
                              props.navigation.navigate('ChatScreen', {
                                item: shop,
                              });
                            }}
                          />
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text style={styles.shopDetailText}>
                            Owner :{shop.owner}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.shopDetailText}>
                            Address: {shop.place}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.shopDetailText}>
                            Contact No.{shop.number}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View
                        style={[
                          styles.shopDetailHeadingText,
                          {
                            alignSelf: 'center',
                            // borderWidth: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}>
                        <Text style={styles.shopDetailHeadingText}>
                          Shop Products
                        </Text>
                      </View>

                      <>
                        {/* // case 1: Shop is logged In */}
                        {shopDeltaProducts ? (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flexBasis: '50%',
                              }}>
                              {shopDeltaProducts.map(shp => {
                                return (
                                  <>
                                    <TouchableOpacity style={styles.container}>
                                      <Image
                                        resizeMode="contain"
                                        style={styles.image}
                                        source={{
                                          uri: shp?.image,
                                        }}
                                      />

                                      <View style={styles.card} />
                                      <Text style={styles.title}>
                                        {shp?.name?.length > 15
                                          ? shp?.name?.substring(0, 15 - 3) +
                                            '...'
                                          : shp?.name}
                                      </Text>
                                      <Text style={styles.cartPrice}>
                                        ${shp?.price}
                                      </Text>
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
                                        buttonBgColor={
                                          colors.dangerpro.danger600
                                        }
                                        txtColor={colors.default.white}
                                        onPress={() => {
                                          props.addItemToCart(shp);
                                          toast.show({
                                            title: `Product '${shp.name}' added to cart successfully`,
                                            placement: 'top',
                                          });
                                        }}
                                      />
                                    </TouchableOpacity>
                                  </>
                                );
                              })}
                            </View>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    </View>
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
};
const mapDespatchToProps = dispatch => {
  return {
    addItemToCart: propduct => {
      dispatch(actions.AddToCart(propduct));
    },
  };
};
export default connect(null, mapDespatchToProps)(ShopDetails);
// export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    height: width / 1.9,
    padding: 10,
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width,
    height: 90,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2.5 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  cartPrice: {
    fontSize: 20,
    color: 'orange',
    marginTop: 0,
  },
  shopDetailHeadingText: {
    fontSize: 28,
    fontWeight: '800',
  },
  shopDetailText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
