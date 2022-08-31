import {StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import Screen from './Screen';
const {width, height} = Dimensions.get('window');
const FormContainer = props => {
  return (
    <Screen>
      <ScrollView
        style={[props.style]}
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        {props.children}
      </ScrollView>
    </Screen>
  );
};

export default FormContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
    width: width,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});
