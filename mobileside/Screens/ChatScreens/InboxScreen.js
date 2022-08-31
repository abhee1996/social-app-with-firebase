import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Messages} from '../../config/inbox_messages';
import colors from '../../config/colors';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import {useNavigation} from '@react-navigation/core';
const {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigator/AuthFireProvider';

const InboxScreen = props => {
  const usenavigation = useNavigation();
  const [users, setUsers] = useState();
  const context = useContext(AuthGlobal);
  const {user} = useContext(AuthContext);
  // console.log('fireAuthContext user', user);
  const ShopId = context?.shopValue?.shopId;
  // console.log('fireAuthContext.user.uid', user.uid);

  // console.log('props', props);
  async function getFireUsers() {
    const querySnap = await firestore()
      .collection('users')
      //.where('uid', '!=', user.uid)
      .get();
    const allUsers = await querySnap?.docs?.map(snap => {
      setUsers(snap.data());
      return snap.data();
    });
    console.log('allUsers', allUsers);
    setUsers(allUsers);
  }
  useEffect(() => {
    getFireUsers();
    console.log('users', users);
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: colors.voiletpro.violet500,
          alignItems: 'center',
          height: 55,
        }}>
        {/* <AppIconButton
          leftIcon={true}
          iconAs="MaterialIcons"
          name="arrow-back"
          width={-45}
          height={23}
          size={40}
          txtColor={colors.default.white}
          style={{
            right: 135,
          }}
          buttonStyle={{
            alignSelf: 'center',
            justifyContent: 'center',
            top: 10,
          }}
          iconColor={colors.default.white}
          onPress={() => props.navigation.goBack()}
        /> */}
        <Text style={{color: colors.default.white, fontSize: 25}}>Inbox</Text>
      </View>
      <View style={styles.container}>
        {ShopId ? (
          <>
            <FlatList
              data={Messages}
              keyExtractor={item => item.id}
              renderItem={({item}) => console.log('item', item)}
            />
          </>
        ) : (
          <>
            <FlatList
              //data={Messages}
              data={users}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <>
                  {/* {item.uid !== user.uid ? ( */}
                  <>
                    <TouchableOpacity
                      onPress={() => usenavigation.navigate('Chat', {item})}
                      style={styles.messageCard}>
                      <View style={styles.UserInfo}>
                        <View style={styles.UserImgWrapper}>
                          <Image
                            source={{
                              uri: `https://cdn.pixabay.com/photo/2020/04/30/03/26/rufous-5111261_960_720.jpg`,
                            }}
                            style={styles?.UserImg}
                          />
                        </View>
                        <View style={styles.TextSection}>
                          <View style={styles.UserInfoText}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.PostTime}>
                              {item?.messageTime || Date.now()}
                            </Text>
                          </View>
                          <Text style={styles.MessageText}>
                            {item?.messageText || 'hello world'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                  {/* ) : (
                    <></>
                  )} */}
                </>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: ' #ffffff',
    // borderWidth: 3,
    width: width,
    height: height,
  },
  messageCard: {width: '100%'},
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserImgWrapper: {paddingTop: 15, paddingBottom: 15},
  UserImg: {width: 50, height: 50, borderRadius: 25},
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  UserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  UserName: {fontSize: 14, fontWeight: 'bold', fontFamily: 'Lato-Regular'},
  PostTime: {fontSize: 12, color: '#666', fontFamily: 'Lato-Regular'},
  MessageText: {fontSize: 14, color: '#333333'},
});
