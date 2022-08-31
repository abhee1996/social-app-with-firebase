import {StyleSheet, Text, View} from 'react-native';
import {Badge} from 'native-base';
import React from 'react';
import {connect} from 'react-redux';

const CartIcon = props => {
  let cartlength = 3;
  console.log(' cartItems length', props?.cartItems.length);
  return (
    <>
      {props.cartItems.length ? (
        // {cartlength ? (
        <>
          <Badge rounded="full" style={styles.badge}>
            <Text style={styles.text}>
              {props.cartItems.length || cartlength}
            </Text>
          </Badge>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapStateToProps = props => {
  const {cartItems} = props;
  return {
    cartItems: cartItems,
  };
};
// export default CartIcon;
export default connect(mapStateToProps, null)(CartIcon);

const styles = StyleSheet.create({
  badge: {
    width: 22,
    position: 'absolute',
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    top: -10,
    left: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    width: 100,
    left: 48,
  },
});
