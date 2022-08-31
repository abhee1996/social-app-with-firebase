import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Heading, List, Radio, Select, useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import InputField from '../../../Component/InputField';
import Error from '../../../Component/Error';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import config from '../../../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIconButton from '../../../Component/AppButtons/AppIconButton';
import colors from '../../../config/colors';
import Screen from '../../../Component/Screen';
import AppPicker from '../../../Component/AppPicker/AppPicker';
import * as RNImagePicker from 'react-native-image-picker';
import mime from 'mime';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
const paymentMethod = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Credit/Debit Card Payment', value: 3},
];
const cardPaymentMethod = [
  {name: 'Wallets', id: 1},
  {name: 'VISA', id: 2},
  {name: 'MasterCard', id: 3},
  {name: 'Other', id: 4},
];
const Payments = props => {
  const order = props?.route;
  console.log('Payment props order', props);
  const [selected, setSelected] = useState();
  const [paymentCard, setPaymentCard] = useState();
  const [paymentCardMethod, setPaymentCardMethod] = useState();
  let ptotal = props?.route ? props?.route?.params?.total : '';

  useEffect(() => {}, []);

  return (
    <>
      <Screen>
        <Heading alignSelf={'center'} marginY="5">
          <Text>Choose your payment methods</Text>
        </Heading>
        <View>
          {paymentMethod.map((item, index) => {
            return (
              <>
                <List
                  style={styles.list}
                  onTouchStart={() => setSelected(item.value)}>
                  <List.Item key={index} style={styles.listItem}>
                    <Radio.Group
                      // style={{marginTop: 25}}
                      name="myRadioGroup"
                      accessibilityLabel="pick an option"
                      value={selected}
                      onChange={val => {
                        setSelected(val);
                        paymentMethod.filter(e => {
                          if (selected === e.value) {
                            console.log('e', e);
                            setPaymentCardMethod(e);
                          }
                        });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: width - 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                        <Radio
                          name="myRadioGroup"
                          accessibilityLabel="pick an option"
                          colorScheme="green"
                          value={item.value}
                        />
                      </View>
                    </Radio.Group>
                  </List.Item>
                </List>
              </>
            );
          })}

          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 10,
              marginVertical: 10,
            }}>
            {selected == 3 ? (
              <>
                <View style={styles.picker}>
                  <AppPicker
                    selectedValue={paymentCard}
                    prickerItemStyle={styles.pickerItem}
                    onValueChange={item => {
                      setPaymentCard(item);
                    }}
                    dataArray={cardPaymentMethod}
                    placeholder={'Select card '}
                    pickerWidth={370}
                  />
                </View>
              </>
            ) : null}
            <View>
              <AppIconButton
                title="Confirm"
                size={25}
                width={25}
                height={4}
                marginX="3%"
                marginY="1%"
                borderRadius={0}
                buttonBgColor={colors.successpro.success500}
                txtColor={colors.default.white}
                onPress={() =>
                  props.navigation.navigate('Confirms', {
                    order,
                    selected: selected,
                    ptotal,
                  })
                }
              />
            </View>
          </View>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
  },
  list: {
    backgroundColor: '#fff',
  },
  picker: {
    padding: 2,
    borderWidth: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  prickerItem: {
    padding: 2,
    fontSize: 20,
    fontWeight: 600,
    borderWidth: 0,
  },
});
export default Payments;
