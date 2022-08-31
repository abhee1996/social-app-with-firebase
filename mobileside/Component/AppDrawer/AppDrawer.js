import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon, Select} from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';

const AppDrawer = ({
  selectedValue,
  onValueChange,
  placeholder,
  pickerWidth,
  pickerStyle,
  prickerItemStyle,
  dataArray,
  refRBSheet,
  children,
}) => {
  return (
    <View
    //   placeholder={placeholder}
    //   style={pickerStyle}
    //   ViewedValue={ViewedValue}
    //   width={pickerWidth}
    //   onValueChange={onValueChange}
    >
      <RBSheet
        ref={refRBSheet}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        {children}
      </RBSheet>
    </View>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({});
