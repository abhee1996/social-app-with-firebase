import React from 'react';
import {ScrollView, StyleSheet, Button, Text, View} from 'react-native';

const Posts = props => {
  return (
    <View key={props.index} style={styles.item}>
      <Text>{props.item}</Text>
      <Button title=" delete" onPress={() => props.deletePost(props.item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'whitesmoke',
    width: '100%',
    marginVertical: '3%',
    textAlign: 'left',
    padding: 8,
  },
});
export default Posts;
