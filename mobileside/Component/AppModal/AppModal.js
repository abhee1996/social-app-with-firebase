import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
const AppModal = ({
  children,
  style,
  Key,
  animationType,
  transparent,
  modalVisible,
  onRequestClose,
}) => {
  return (
    <Modal
      key={Key}
      animationType={animationType}
      transparent={transparent}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <SafeAreaView key={'ScreenModalSafeView'} style={[styles.screen, style]}>
        <View key={'ScreenModalSafeViewView'}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default AppModal;
