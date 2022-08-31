import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Button,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Heading,
  Input,
  Box,
  Center,
  Icon,
  List,
  Image,
  Text,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import {useFocusEffect} from '@react-navigation/core';
// import axios from 'axios';
// import config from '../../config/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
const ListItemBody = props => {
  const {item, index} = props;
  return (
    <>
      <View>
        <TouchableOpacity
          style={[
            styles.container,
            {backgroundColor: index % 2 == 0 ? 'white' : 'grainsboro'},
          ]}>
          <>
            <ScrollView>
              <List
                style={styles.list}
                key={item?.id}
                //  onPress={() =>
                //    props.navigation.navigate('ProductDetails', {item: item})
                //  }
              >
                <Image
                  size={'16'}
                  alt="fallback text"
                  borderRadius={100}
                  resizeMode="contain"
                  style={styles.image}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_960_720.jpg',
                  }}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.item}>
                  {item.name}
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.item}>
                  {item.CategoryId == 4
                    ? 'Sport'
                    : item.CategoryId == 1
                    ? 'laptops'
                    : 'Games'}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.item}>
                  {item.sku}
                </Text>
                <Text style={styles.item}>${item.price}</Text>
              </List>
            </ScrollView>
          </>
          {/* ) : (
          <>
            <View style={styles.center}>
              <Text>No products match with search criteria</Text>
            </View>
          </>
        )} */}
        </TouchableOpacity>
      </View>
    </>
  );
};

const AppListItem = props => {
  // const [productList, setProductList] = useState();
  // const [productFilter, setProductFilter] = useState();
  // const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState();

  // var AdminProductURL = `${config.server}/product/getall/`;
  // useFocusEffect(
  //   useCallback(() => {
  //     //get Token
  //     AsyncStorage.getItem(`user_login_Jwt_Token`)
  //       .then(res => {
  //         setToken(res);
  //       })
  //       .catch(err => console.log('err', err));

  //     axios.get(AdminProductURL).then(res => {
  //       setProductList(res.data);
  //       setProductFilter(res.data);
  //       setLoading(false);
  //     });

  //     return () => {
  //       setProductList();
  //       setProductFilter();
  //       setLoading();
  //     };
  //   }, []),
  // );
  // const handleSearchProduct = text => {
  //   if (text == '') {
  //     setProductFilter(productList);
  //   }
  //   setProductFilter(
  //     productList.filter(i => {
  //       return (
  //         i.name.toLowerCase().includes(text.toLowerCase()),
  //         i.sku.toLowerCase().includes(text.toLowerCase())
  //       );
  //     }),
  //   );
  // };
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
                    // style={{backgroundColor: 'gainsboro'}}
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Icon
                    //onPress={() => setfocus(false)}
                    as={<FontAwesome name="close" />}
                    size={5}
                    mr="2"
                  />
                }
                variant="rounded"
                width="330"
                placeholder="search"
                //   onFocus={() => setfocus(true)}
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
              <FlatList
                data={productFilter}
                ListHeaderComponent={ListHeader}
                renderItem={({item, index}) => {
                  return (
                    <ListItemBody
                      item={item}
                      index={index}
                      navigation={props.navigation}
                    />
                  );
                }}
              />
            </>
          ) : null}
        </>
      )}
    </View>
  );
};

export default AppListItem;

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
  container: {
    flexDirection: 'row',
    width: width,
    padding: 5,
  },
  list: {flexDirection: 'row', borderWidth: 0},
  image: {
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    marginHorizontal: 8,
    marginVertical: 4,
    width: width / 6,
    alignSelf: 'center',
  },
});
