import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import colors from "../config/colors";

function Screen({children, style, otherprops}) {
  return (
    <SafeAreaView key={'ScreenSafeView'} style={[styles.screen, style]}>
      <View key={'ScreenSafeViewView'} style={style}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // backgroundColor: colors.backgroud,
    flex: 1,
  },
});

export default Screen;
