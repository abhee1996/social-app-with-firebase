import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './Login';

const UserScreen = props => {
  return (
    <>
      <Login data={props} />
    </>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
