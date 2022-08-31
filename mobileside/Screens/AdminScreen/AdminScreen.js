import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import React, {useState} from 'react';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../config/colors';
const {width, height} = Dimensions.get('window');
const AdminScreen = props => {
  const [loading, setLoading] = useState(true);
  return (
    <View>
      {/* {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : ( */}
      <>
        {/* <View style={styles.admin}>
          <Text style={{fontSize: 24, fontWeight: '500'}}>Admin Screen</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: colors.voiletpro.violet500,
            alignItems: 'center',
            height: 55,
            width: width,
          }}>
          {/* <AppIconButton
            leftIcon={true}
            iconAs="MaterialIcons"
            name="arrow-back"
            width={-45}
            height={23}
            size={40}
            style={{
              right: 80,
            }}
            buttonStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
              top: 9,
            }}
            iconColor={colors.default.white}
            onPress={() => props.navigation.goBack()}
          /> */}
          <Text style={{color: colors.default.white, right: 4, fontSize: 30}}>
            Admin Screen
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <AppIconButton
            title="My Products"
            leftIcon={true}
            iconAs="FontAwesome"
            name="shopping-bag"
            iconColor={colors.default.orange}
            size={65}
            width={40}
            height={114}
            marginX="3%"
            marginY="1%"
            borderRadius={10}
            buttonBgColor={colors.indigopro.indigo600}
            txtColor={colors.default.white}
            onPress={() => props.navigation.navigate('AdminProducts')}
          />
          <View>
            <AppIconButton
              title="Orders"
              leftIcon={true}
              iconAs="FontAwesome"
              name="shopping-cart"
              onPress={() => props.navigation.navigate('AdminOrders')}
              size={65}
              iconColor={colors.rose.rose800}
              width={40}
              height={114}
              marginX="3%"
              marginY="1%"
              borderRadius={10}
              buttonBgColor={colors.primarypro.primary500}
              txtColor={colors.default.white}
              textStyle={{
                flexDirection: 'row',
                alignSelf: 'center',
                // borderWidth: 2,
              }}
            />
          </View>

          <AppIconButton
            title="Products"
            leftIcon={true}
            iconAs="FontAwesome"
            name="plus"
            onPress={() => props.navigation.navigate('AdminProductForm')}
            size={65}
            iconColor={colors.greenteal.teal800}
            width={40}
            height={114}
            marginX="3%"
            marginY="1%"
            borderRadius={10}
            buttonBgColor={colors.primarypro.primary500}
            txtColor={colors.default.white}
          />
          <AppIconButton
            title="Inbox"
            leftIcon={true}
            iconAs="MaterialCommunityIcons"
            name="android-messages"
            onPress={() => {
              props.navigation.navigate('InboxScreen');
            }}
            size={75}
            iconColor={colors.amber.amber400}
            width={40}
            height={114}
            marginX="3%"
            marginY="1%"
            borderRadius={10}
            buttonBgColor={colors.indigopro.indigo600}
            textStyle={{
              flexDirection: 'row',
              alignSelf: 'center',
              // borderWidth: 2,
            }}
            txtColor={colors.default.white}
          />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  admin: {
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  orderDubbleIconStyle: {
    margin: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MarkIconStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 42,
    right: 10,
  },
});
export default AdminScreen;
