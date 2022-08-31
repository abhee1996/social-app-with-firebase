// import {ScrollView} from 'native-base';
import {Box} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';

import Banner from '../Banner/Banner';
import Screen from '../Screen';
import ProductCarts from './ProductCarts';
import Categories from '../../Component/Categories/Categories';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {getCategories} from '../../Redux/actions/categoryAction';
let {width, height} = Dimensions.get('window');
const ProductList = props => {
  const context = useContext(AuthGlobal);
  const ShopId = context?.shopValue?.shopId;
  const ShopUUId = context?.shopValue?.shop_uuid;
  const UserId = context?.userValue?.userId;
  const {item, categories, setCategories, productImage} = props;
  // const [product, setProduct] = useState([]);
  // const [productFilter, setProductFilter] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCategories(setCategories);
    // setProduct(item);
    // setProductFilter(item);
    setProductCat(item);
    setLoading(false);
    setActive(-1);
  }, []);
  const categoryFilter = catg => {
    console.log('catg', catg);

    {
      catg === 'all'
        ? [setProductCat(item), setActive(true)]
        : [
            setProductCat(
              item.filter(itm => itm.category_uuid == catg),
              setActive(true),
            ),
          ];
    }
  };
  return (
    <>
      <Screen
        style={{
          width: width,
          backgroundColor: 'gainsboro',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View>
            <Banner />
          </View>
          <View
            key={2}
            style={{
              marginVertical: 10,
              marginHorizontal: 15,
            }}>
            <Categories
              category={categories}
              categories={categories}
              setCategories={setCategories}
              categoryFilter={categoryFilter}
              productCat={productCat}
              active={active}
              setActive={setActive}
            />
          </View>

          <View style={{flex: 1, height: height}}>
            <Text
              style={{
                fontSize: 30,
                paddingTop: 10,
                alignSelf: 'center',
              }}>
              All Products
            </Text>
            <ScrollView nestedScrollEnabled={true}>
              <Pressable>
                <View
                  style={{
                    width: width,
                    backgroundColor: 'gainsboro',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {loading ? (
                    <>
                      <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="red" />
                      </View>
                    </>
                  ) : (
                    <>
                      {productCat.length > 0 ? (
                        <>
                          {productCat?.map(itm => {
                            return (
                              <>
                                <ProductCarts
                                  key={itm.id}
                                  item={itm}
                                  productCat={productCat}
                                  productImage={productImage}
                                  navigation={props.navigation}
                                />
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <View style={{height: 40}}>
                            <Text>No Product Available</Text>
                          </View>
                        </>
                      )}
                    </>
                  )}
                </View>
              </Pressable>
            </ScrollView>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
    borderRadius: 40,
    padding: 40,
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  inActive: {
    backgroundColor: 'grey',
    borderRadius: 40,
    padding: 40,
  },
});

export default ProductList;
