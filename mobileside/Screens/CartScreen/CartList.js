import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Center, List} from 'native-base';
const {width, height} = Dimensions.get('window');

const CartList = props => {
  const {item} = props;
  return (
    <>
      {item?.product?.item ? (
        <>
          <View>
            <List style={styles.list} key={Math.random()}>
              <Box
                style={{
                  flexDirection: 'row',
                  width: '80%',
                }}>
                <Image
                  size={70}
                  alt="fallback text"
                  borderRadius={100}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_960_720.jpg',
                  }}
                  resizeMode={'contain'}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  {item.product.item.name}
                </Text>
              </Box>
              <Box
                direction="row"
                style={{
                  margin: 10,
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}>
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
                  <Text style={{fontSize: 20, color: 'grey'}}>
                    ${item?.product?.item?.price}
                  </Text>
                </Center>
              </Box>
            </List>
          </View>
        </>
      ) : (
        <>
          <View>
            <List style={styles.list} key={Date.now()}>
              <Box
                style={{
                  flexDirection: 'row',
                  width: '80%',
                }}>
                <Image
                  size={70}
                  alt="fallback text"
                  borderRadius={100}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_960_720.jpg',
                    //   uri: item.img
                    //     ? item.img
                    //     : 'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_960_720.jpg',
                  }}
                  resizeMode={'contain'}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  {item.name}
                </Text>
              </Box>
              <Box
                direction="row"
                style={{
                  margin: 10,
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}>
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
                  <Text style={{fontSize: 20, color: 'grey'}}>
                    {item.price ? `$${item.price}` : ''}
                  </Text>
                </Center>
              </Box>
            </List>
          </View>
        </>
      )}
    </>
  );
};

export default CartList;

const styles = StyleSheet.create({
  list: {
    borderWidth: 0,
    width: width - 10,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // height: height,
  },
});
