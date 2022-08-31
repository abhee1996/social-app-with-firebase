import {StyleSheet, View, Text, TextInput} from 'react-native';
import React from 'react';
import {placeholder} from '@babel/types';

const InputField = props => {
  const {
    placeholder,
    name,
    id,
    value,
    autoCorrect,
    onChangeText,
    onFocus,
    secureTextEntry,
    keyBoardType,
    borderRadius,
    islabel,
    label,
    labelStyle,
    height,
    width,
  } = props;
  var bdRad = 5 + borderRadius || 5;
  var inputHight = 50 + height || 50;
  var inputWidth = width || `80%`;
  return (
    <>
      {islabel == true ? (
        <>
          <View style={labelStyle}>
            <Text>{label}</Text>
          </View>
        </>
      ) : null}
      <TextInput
        style={[
          styles.input,
          {borderRadius: bdRad, height: inputHight, width: inputWidth},
        ]}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        keyBoardType={keyBoardType}
      />
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
  },
});
export default InputField;
