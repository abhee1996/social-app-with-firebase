import {Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {Center, Box, List, Icon, Image, Text, Stack} from 'native-base';
const {width} = Dimensions.get('window');
const SearchProduct = props => {
  const {productFilter} = props;
  return (
    <>
      <Box style={{width: width, borderWidth: 1, height: '70%'}}>
        {productFilter.length > 0 ? (
          <>
            <ScrollView>
              {productFilter?.map(item => (
                <List
                  style={{flexDirection: 'row'}}
                  key={item?.id}
                  onPress={() =>
                    props.navigation.navigate('ProductDetails', {item: item})
                  }>
                  <Image
                    size={50}
                    alt="fallback text"
                    borderRadius={100}
                    source={{
                      uri: item.image,
                    }}
                    fallbackSource={{
                      uri: item.image,
                    }}
                  />
                  <Box>
                    <Text
                      style={{
                        fontSize: 20,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginVertical: 5,
                        marginTop: 15,
                        marginHorizontal: 10,
                      }}>
                      {item.name}
                    </Text>
                    <Text>{item.discription}</Text>
                  </Box>
                </List>
              ))}
            </ScrollView>
          </>
        ) : (
          <>
            <View style={styles.center}>
              <Text>No products match with search criteria</Text>
            </View>
          </>
        )}
      </Box>
    </>
  );
};
const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchProduct;
