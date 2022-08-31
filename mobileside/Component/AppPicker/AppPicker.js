import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon, Select} from 'native-base';

const AppPicker = ({
  selectedValue,
  onValueChange,
  placeholder,
  pickerWidth,
  pickerStyle,
  prickerItemStyle,
  dataArray,
}) => {
  return (
    <Select
      placeholder={placeholder}
      style={pickerStyle}
      selectedValue={selectedValue}
      width={pickerWidth}
      onValueChange={onValueChange}>
      {dataArray.map((item, index) => {
        return (
          <Select.Item
            style={prickerItemStyle}
            label={item.name}
            key={item.id}
            value={item.id}
          />
        );
      })}
    </Select>
  );
};

export default AppPicker;

const styles = StyleSheet.create({});
