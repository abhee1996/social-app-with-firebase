import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Posts from './Posts';
const PostList = () => {
  const [title, setTitle] = useState('Post List');
  const [text, setText] = useState('');
  const [posts, setPosts] = useState(['welcome List']);
  const {postListStyle, postListTextStyle, postListTextInput} = styles;
  const addpostItem = () => {
    const updatedpost = posts;
    updatedpost.push(text);
    setPosts(updatedpost);
    setText('');
  };
  //DELETE POST
  const deletePost = index => {
    const delPost = posts.filter(post => post !== index);
    setPosts(delPost);
  };
  return (
    <View style={postListStyle}>
      <Text style={postListTextStyle}>{title}</Text>
      <ScrollView>
        {posts.map((post, i) => {
          return (
            <Posts key={i} item={post} index={i} deletePost={deletePost} />
          );
        })}
      </ScrollView>

      <View>
        <TextInput
          style={postListTextInput}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button title="click post" onPress={addpostItem} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  postListStyle: {
    width: '80%',
    marginBottom: 60,
  },
  postListTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  postListTextInput: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 8,
    marginVertical: '2%',
    padding: 8,
  },
});
export default PostList;
