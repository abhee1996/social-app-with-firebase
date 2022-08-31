import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {useToast} from 'native-base';
import * as actions from '../../Redux/actions/cartAction';
import AppIconButton from '../AppButtons/AppIconButton';
import colors from '../../config/colors';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
const {width, height} = Dimensions.get('window');
const cardGap = 35;

const cardWidth = (width - cardGap * 3) / 2;
const ProductCarts = props => {
  const context = useContext(AuthGlobal);
  const ShopId = context?.shopValue?.shopId;
  const ShopUUId = context?.shopValue?.shop_uuid;
  const UserId = context?.userValue?.userId;
  const [color, setColor] = useState('green');
  const {item, productImage} = props;
  const {name, sku, discription, price, countOnStock = 50} = item;
  const toast = useToast();
  const {container, card, title, cartPrice} = styles;
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('ProductDetails', {item: item})}>
      {ShopUUId ? (
        <>
          {/* // case 1: Shop is logged In */}
          {item?.shop_uuid === ShopUUId ? (
            <>
              <View>
                <View style={container}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{
                      uri: item.image,
                    }}
                  />

                  <View style={card} />
                  <Text style={title}>
                    {item?.name?.length > 15
                      ? item?.name?.substring(0, 15 - 3) + '...'
                      : item?.name}
                  </Text>
                  <Text style={cartPrice}>${item?.price}</Text>
                  {countOnStock > 0 ? (
                    <>
                      <View>
                        <AppIconButton
                          leftIcon={true}
                          iconAs="FontAwesome"
                          name="pencil-alt"
                          width={-55}
                          size={18}
                          iconColor={colors.default.white}
                          marginX="3.5%"
                          buttonStyle={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            top: 8,
                            left: 3,
                          }}
                          borderRadius={100}
                          buttonBgColor={colors.purplepro.purple500}
                          txtColor={colors.default.white}
                          onPress={() => {
                            props?.navigation?.navigate('AdminProductForm', {
                              item: item,
                            });
                          }}
                        />
                      </View>
                    </>
                  ) : (
                    <Text style={{marginTop: 20}}>
                      You have not created any product yet
                    </Text>
                  )}
                </View>
              </View>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {/* // case 1: Shop is logged In */}
          <View>
            <View style={container}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />

              <View style={card} />
              <Text style={title}>
                {name?.length > 15 ? name?.substring(0, 15 - 3) + '...' : name}
              </Text>
              <Text style={cartPrice}>${price}</Text>
              {countOnStock > 0 ? (
                <>
                  <View style={{marginBottom: 60}}>
                    <AppIconButton
                      leftIcon={true}
                      iconAs="FontAwesome"
                      name="shopping-cart"
                      width={-55}
                      size={18}
                      iconColor={colors.default.white}
                      marginX="3.4%"
                      marginY="3%"
                      borderRadius={100}
                      buttonStyle={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        top: 8,
                        left: 3,
                      }}
                      buttonBgColor={colors.purplepro.purple500}
                      txtColor={colors.default.white}
                      onPress={() => {
                        props.addItemToCart(props),
                          toast.show({
                            title: `Product '${item.name}' added to cart successfully`,
                            placement: 'top',
                          });
                      }}
                    />
                  </View>
                </>
              ) : (
                <Text style={{marginTop: 20}}>Currently Not Available</Text>
              )}
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
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
    flexBasis: '50%',
  },
  image: {
    width: width,
    height: 90,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
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
});

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => {
      dispatch(actions.AddToCart({quantity: 1, product}));
    },
  };
};
export default connect(null, mapDispatchToProps)(ProductCarts);
