import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List, Image, Text, Icon} from 'native-base';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppModal from '../../Component/AppModal/AppModal';
import {
  getCategories,
  getCategoriesByProductCat,
} from '../../Redux/actions/categoryAction';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import config from '../../config/config';
const {width, height} = Dimensions.get('window');
const AdminProductListItem = props => {
  const {item, ShopId, ShopUUId, index, productFilter} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [catName, setCatName] = useState({});

  useEffect(() => {
    // getCategories(setCatArray);
    // catArray?.filter(cat => {
    //   if (cat?.id == item?.category_uuid) {
    //     setCatName(cat?.name);
    //   }
    // });

    const getCatByProductCatURL = `${config.server}/category/getallcategoriesBy/productcategoryId/${item?.category_uuid}`;
    getCategoriesByProductCat(getCatByProductCatURL).then(res => {
      setCatName(res.data[0]);
    });
  }, []);

  return (
    <>
      <View>
        {productFilter?.length > 0 ? (
          <>
            <>
              <View style={[styles.container]}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('ProductDetails', {
                      item: item,
                    })
                  }
                  onLongPress={() => setModalVisible(true)}
                  style={[
                    styles.container,
                    {
                      backgroundColor:
                        index % 2 == 0
                          ? colors.gray.trueGray300
                          : colors.indigopro.indigo300,
                    },
                  ]}>
                  <>
                    <ScrollView>
                      <List style={styles.list} key={item.id}>
                        <Image
                          size={'16'}
                          alt="image.png"
                          borderRadius={100}
                          resizeMode="contain"
                          style={{width: 70, height: 65}}
                          source={{
                            uri: item.mainImage,
                          }}
                          // source={{
                          //   uri: item.image,
                          // }}
                        />
                        <Text
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={(styles.item, {left: 20, top: 20})}>
                          {item.name}
                        </Text>

                        <Text
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={styles.item}>
                          {/* {catName.name} */}
                        </Text>

                        <Text style={(styles.item, [{left: 25, top: 20}])}>
                          ${item.price}
                        </Text>
                        {/* <View>
                              <AppIconButton
                                title="Edit"
                                // leftIcon={true}
                                iconKey={0}
                                width={-40}
                                iconAs="MaterialIcons"
                                name="edit"
                                buttonStyle={styles.iconInRow}
                                onPress={() => {
                                  console.log('___item____', item);

                                  // props?.navigation?.navigate('AdminProductForm', {
                                  //  item: item,
                                  //  });
                                  // setModalVisible(false);
                                }}
                                size={10}
                                iconColor={colors.default.white}
                                // marginX="3.5%"
                                marginY="5.5%"
                                borderRadius={10}
                                buttonStyle={styles.iconInRow}
                                buttonBgColor={colors.blue.blue400}
                                txtColor={colors.default.white}
                              />
                              <AppIconButton
                                title="Delete"
                                // leftIcon={true}
                                iconAs="MaterialIcons"
                                name="delete"
                                onPress={() => [
                                  // props.deleteProduct(item?.id),
                                  // setModalVisible(false),
                                ]}
                                width={-40}
                                size={10}
                                iconColor={colors.default.white}
                                // marginX="3.5%"
                                marginY="5.5%"
                                borderRadius={10}
                                buttonStyle={styles.iconInRow}
                                buttonBgColor={colors.rose.rose500}
                                txtColor={colors.default.white}
                              />
                            </View> */}
                      </List>
                    </ScrollView>
                  </>
                  <>
                    {modalVisible ? (
                      <>
                        {/* <Modal
                              Key={'ScreenModal'}
                              animationType="fade"
                              transparent={true}
                              modalVisible={modalVisible}
                              // onRequestClose={() => setModalVisible(false)}
                              style={styles.modalCenteredView}>
                              <View style={styles.modalView}>
                                <MaterialCommunityIcons
                                  style={styles.modalCloseStyle}
                                  name={'close'}
                                  size={30}
                                  onPress={() => {
                                    setModalVisible(false);
                                  }}
                                />

                                <AppIconButton
                                  title="Edit"
                                  // leftIcon={true}
                                  iconKey={0}
                                  iconAs="MaterialIcons"
                                  name="edit"
                                  buttonStyle={styles.iconInRow}
                                  onPress={() => {
                                    console.log('___item____', item);

                                    // props?.navigation?.navigate('AdminProductForm', {
                                    //  item: item,
                                    //  });
                                    setModalVisible(false);
                                  }}
                                  size={15}
                                  iconColor={colors.default.white}
                                  marginX="3.5%"
                                  marginY="7%"
                                  borderRadius={0}
                                  buttonStyle={styles.iconInRow}
                                  buttonBgColor={colors.blue.blue400}
                                  txtColor={colors.default.white}
                                />
                                <AppIconButton
                                  title="Delete"
                                  // leftIcon={true}
                                  iconAs="MaterialIcons"
                                  name="delete"
                                  onPress={() => [
                                    // props.deleteProduct(item?.id),
                                    // setModalVisible(false),
                                  ]}
                                  size={15}
                                  iconColor={colors.default.white}
                                  marginX="3.5%"
                                  marginY="7%"
                                  borderRadius={0}
                                  buttonStyle={styles.iconInRow}
                                  buttonBgColor={colors.rose.rose500}
                                  txtColor={colors.default.white}
                                />
                              </View>
                            </Modal>
                           */}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                </TouchableOpacity>
                <View
                  style={[
                    {
                      backgroundColor:
                        index % 2 == 0
                          ? colors.gray.trueGray300
                          : colors.indigopro.indigo300,
                    },
                  ]}>
                  <AppIconButton
                    leftIcon={true}
                    width={-55}
                    iconAs="MaterialIcons"
                    name="edit"
                    buttonStyle={styles.iconInRow}
                    onPress={() => {
                      props?.navigation?.navigate('AdminProductForm', {
                        item: item,
                      });
                      setModalVisible(false);
                    }}
                    IconStyle={{left: 3}}
                    size={25}
                    iconColor={colors.default.white}
                    marginY="5.5%"
                    borderRadius={10}
                    buttonBgColor={colors.blue.blue400}
                    txtColor={colors.default.white}
                  />
                  <AppIconButton
                    leftIcon={true}
                    iconAs="MaterialIcons"
                    name="delete"
                    onPress={() => [props.deleteProduct(item?.id)]}
                    width={-60}
                    size={25}
                    iconColor={colors.default.white}
                    marginY="5.5%"
                    borderRadius={10}
                    IconStyle={{left: 3}}
                    buttonStyle={styles.iconInRow}
                    buttonBgColor={colors.rose.rose500}
                    txtColor={colors.default.white}
                  />
                </View>
              </View>
            </>
          </>
        ) : (
          <>
            <>
              <View style={styles.center}>
                <Text>No products match with search criteria</Text>
              </View>
            </>
          </>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width / 1.135,
    padding: 5,
  },
  list: {flexDirection: 'row', borderWidth: 0, paddingVertical: 10},
  listH: {flexDirection: 'row', borderWidth: 1, paddingVertical: 10},
  image: {
    margin: 2,
    width: 200,
    height: 100,
  },
  iconInRow: {
    top: 10,
  },
  item: {
    flexWrap: 'wrap',
    marginHorizontal: 8,
    marginVertical: 4,
    width: width / 6,
    alignSelf: 'center',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    height: 200,
    padding: 25,
    alignItems: 'center',
    shadowOffset: {
      width: 0.2,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalCloseStyle: {
    alignItems: 'flex-end',
    position: 'relative',
    width: 40,
    height: 25,
    top: -18,
    left: 65,
  },
});

export default AdminProductListItem;
