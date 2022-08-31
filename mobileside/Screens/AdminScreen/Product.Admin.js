import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  // Button,
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  Heading,
  Input,
  Box,
  Center,
  Icon,
  IconButton,
  Button,
  Stack,
  List,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import config from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminProductListItem from './ListItem';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {getfilterShopProduct} from '../../Redux/actions/Product.actions';
import firestore from '@react-native-firebase/firestore';
var {width, height} = Dimensions.get('window');
const ListHeader = () => {
  return (
    <>
      <View style={styles.listHeader}>
        <View style={styles.headerItems}></View>
        <View style={styles.headerItems}>
          <Text style={styles.headerItemText}>Name</Text>
        </View>
        <View style={styles.headerItems}>
          <Text style={styles.headerItemText}>Category</Text>
        </View>
        <View style={styles.headerItems}>
          <Text style={styles.headerItemText}>SKU</Text>
        </View>

        <View style={styles.headerItems}>
          <Text style={styles.headerItemText}> Price</Text>
        </View>
      </View>
    </>
  );
};
const AdminProduct = props => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const context = useContext(AuthGlobal);
  // const isAuthenticated = context.stateUser.isAuthenticated;
  // const isShopAuthenticated = context.stateShop.isShopAuthenticated;
  const ShopId = context?.shopValue?.shopId;
  const ShopUUId = context?.shopValue?.shop_uuid;

  var AdminProductURL = `${config.server}/product/getall/`;
  var filterShopProductURL = `${config.server}/product/getallProductBy/shopuuid/${ShopUUId}`;

  async function firestoreGetProduct() {
    const querySnap = await firestore()?.collection('eshop')?.get();
    console.log('querySnap', querySnap);
    const response = await querySnap?.docs?.map(docs => docs.data());
    console.log('response', response);
    setProductFilter(response);
    setLoading(false);
  }
  useFocusEffect(
    useCallback(() => {
      //get Token
      AsyncStorage.getItem(`user_login_Jwt_Token`)
        .then(res => {
          setToken(res);
        })
        .catch(err => console.log('err', err));
      firestoreGetProduct();
      // getfilterShopProduct(filterShopProductURL).then(res => {
      //   setProductFilter(res.data);
      //   setLoading(false);
      // });
    }, []),
  );
  const handleSearchProduct = text => {
    if (text == '') {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter(i => {
        return (
          i.name.toLowerCase().includes(text.toLowerCase()),
          i.sku.toLowerCase().includes(text.toLowerCase())
        );
      }),
    );
  };
  const deleteProduct = id => {
    const PRODUCT_DELETE_URL = `${config.server}/product/delete/${id}`;
    axios
      .delete(PRODUCT_DELETE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const products = productFilter.filter(item => item.id !== id);
        setProductFilter(products);
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View>
      <View>
        <Heading>
          <Box style={{width: width}}>
            <Center
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingVertical: 13,
                paddingHorizontal: 1,
              }}>
              <Input
                w={{
                  base: '95%',
                  md: '45%',
                }}
                style={{
                  backgroundColor: 'gainsboro',
                }}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="search" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Icon as={<FontAwesome name="close" />} size={5} mr="2" />
                }
                variant="rounded"
                width="330"
                placeholder="search"
                onChangeText={text => handleSearchProduct(text)}
              />
            </Center>
          </Box>
        </Heading>
      </View>

      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          {productFilter?.length > 0 ? (
            <>
              <List style={styles.listH}>
                <Text style={styles.listHText}>image</Text>
                <Text style={styles.listHText}>Name</Text>
                <Text style={styles.listHText}></Text>
                <Text style={styles.listHText}>Price</Text>
              </List>
              {productFilter.map((item, index) => {
                return (
                  <AdminProductListItem
                    ShopId={ShopId}
                    ShopUUId={ShopUUId}
                    item={item}
                    index={index}
                    productFilter={productFilter}
                    navigation={props?.navigation}
                    deleteProduct={deleteProduct}
                  />
                );
              })}
            </>
          ) : (
            <>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text>No Product available. Please add your first product</Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default AdminProduct;

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
    elevation: 10,
  },
  headerItems: {
    width: width / 6,
    marginHorizontal: 5,
    marginVertical: 4,
  },
  headerItemText: {
    fontWeight: '600',
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  listH: {flexDirection: 'row', borderWidth: 2, paddingVertical: 10, margin: 4},
  listHText: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  iconInRow: {
    margin: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
