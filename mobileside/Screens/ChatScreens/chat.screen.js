import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Screen from '../../Component/Screen';
import {Linking} from 'react-native';
import {Platform} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import PushNotification from 'react-native-push-notification';

import AppIconButton from '../../Component/AppButtons/AppIconButton';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import MessageInput from '../../Component/MessageInput/MessageInput';
import colors from '../../config/colors';
import config from '../../config/config';
import axios from 'axios';
import {LogBox} from 'react-native';
import {Keyboard} from 'react-native';
import {AuthContext} from '../../navigator/AuthFireProvider';
import firestore from '@react-native-firebase/firestore';
const {width, height} = Dimensions.get('window');

async function getChat(conversation_id, userId) {
  // const url = `${config.server}api/message/getChat?conversationId=${conversation_id}&userId=${userId}&name=receiver`;
  const url = `${config.server}/message/getchat/${conversation_id}&userId=${userId}&name=receiver`;
  return fetch(url).then(data => data.json());
}
const formateToGiftedDate = date => {
  var m = new Date(date);
  var dateFormated =
    m.getFullYear() +
    '-' +
    ('0' + m.getDate()).slice(-2) +
    '-' +
    ('0' + (m.getMonth() + 1)).slice(-2) +
    ' ' +
    ('0' + m.getHours()).slice(-2) +
    ':' +
    ('0' + m.getMinutes()).slice(-2) +
    ':' +
    ('0' + m.getSeconds()).slice(-2);
  return date;
};

// function createMessage(message) {
//   if (message.message_type == 'image') {
//     if (message.mine == '1') {
//       return {
//         _id: message.id,
//         createdAt: message.created_ts,
//         image: message.message,
//         received: message.is_seen === '0' ? false : true,
//         sent: true,
//         pending: false,
//         user: {
//           _id: message.mine,
//         },
//       };
//     } else {
//       return {
//         _id: message.id,
//         createdAt: message.created_ts,
//         image: message.message,
//         user: {
//           _id: message.mine,
//         },
//       };
//     }
//   } else {
//     return {
//       _id: message.id,
//       text: message.message,
//       createdAt: formateToGiftedDate(message.created_ts),
//       received: message.is_seen === '0' ? false : true,
//       sent: true,
//       pending: false,
//       user: {
//         _id: message.mine,
//       },
//     };
//   }
// }

const ChatScreen = props => {
  const [messages, setMessages] = useState();
  // const {conversationId, receiverId, senderId, title, name, number, item} =
  //   props?.route?.params;
  const item = props?.route?.params?.item;
  const [isSeenData, setIsSeenData] = useState();
  const [chatRange, setChatRange] = useState(20);
  const [msgIds, setMsgIds] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const {user} = useContext(AuthContext);
  const getFurtherMessages = () => {
    // getChat(conversationId, senderId).then(data => {
    //   setMessages(
    //     data.map(item => {
    //       setShowSpinner(false);
    //       return createMessage(item);
    //     }),
    //   );
    // });
  };
  //----firebase firestore chat code start---///
  async function getAllMessages() {
    const docId =
      item.uid > user.uid
        ? user.uid + '-' + item.uid
        : item.uid + '-' + user.uid;
    const snapShot = await firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();

    const allMessages = snapShot?.docs?.map(snap => {
      return {
        ...snap.data(),
        createdAt: snap?.data()?.createdAt?.toDate(),
      };
    });
    setMessages(allMessages);
  }
  useEffect(() => {
    const docId =
      item.uid > user.uid
        ? user.uid + '-' + item.uid
        : item.uid + '-' + user.uid;
    const messageSnapShot = firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    messageSnapShot.onSnapshot(snapshot => {
      console.log('snapshot fires');
      const allMessages = snapshot?.docs?.map(snap => {
        const data = snap?.data();
        if (data?.createdAt) {
          return {
            ...snap.data(),
            createdAt: snap?.data()?.createdAt?.toDate(),
          };
        } else {
          return {
            ...snap.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allMessages);
    });

    //getAllMessages();
  }, []);
  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sendby: user?.uid,
      recievedby: item?.uid,
      createdAt: new Date(),
    };
    setMessages(
      (
        previousMessages, // GiftedChat.append(previousMessages, messages),
      ) => GiftedChat.append(previousMessages, mymsg),
    );
    const docId =
      item.uid > user.uid
        ? user.uid + '-' + item.uid
        : item.uid + '-' + user.uid;

    firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .add({
        ...mymsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  }, []);
  //----firebase firestore chat code end---///
  useEffect(() => {
    if (props?.route?.name === 'ChatScreen')
      PushNotification.removeAllDeliveredNotifications();
    if (messages) {
      // && isSeenData[0]?.is_seen) {
      // setMessages(
      //   messages.map((msg, i) => {
      //     return {
      //       ...msg,
      //       // received: isSeenData[i]?.is_seen === '1' ? true : false,
      //       sent: true,
      //       pending: false,
      //     };
      //   }),
      // );
    }
  }, [isSeenData]);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated.event now requires a second argument']);
    if (messages === undefined) {
      getFurtherMessages();
    }

    const interval = setInterval(() => {
      // const url =
      //   config.server +
      //   'api/message/getNewMessagesForChat?conversationId=' +
      //   conversationId +
      //   '&userId=' +
      //   senderId;
      // fetch(url)
      //   .then(data => data.json())
      //   .then(data => {
      //     // append new messages
      //     data.forEach(message => {
      //       // setMessages(previousMessages =>
      //       //   GiftedChat.append(previousMessages, createMessage(message)),
      //       // );
      //     });
      //   });
    }, 3000);

    const interval2 = setInterval(() => {
      // const seen_url =
      //   config.server +
      //   'api/message/getMessagesStatus?conversationId=' +
      //   conversationId +
      //   '&userId=' +
      //   senderId;
      // fetch(seen_url)
      //   .then(data => data.json())
      //   .then(data => {
      //     setIsSeenData(data);
      //   });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);
  // const onSend = useCallback((message = [], type) => {
  //   const url = config.server + 'api/message/sendMessage';
  //   var m = new Date();
  //   var created_ts =
  //     m.getFullYear() +
  //     '-' +
  //     ('0' + (m.getMonth() + 1)).slice(-2) +
  //     '-' +
  //     ('0' + m.getDate()).slice(-2) +
  //     ' ' +
  //     ('0' + m.getHours()).slice(-2) +
  //     ':' +
  //     ('0' + m.getMinutes()).slice(-2) +
  //     ':' +
  //     ('0' + m.getSeconds()).slice(-2);
  //   const confHeaders = {
  //     headers: {
  //       // Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   if (type == 'text') {
  //     const formdata = new FormData();
  //     // productImages.forEach(newImg => {
  //     //   let newImageURI = 'file:///' + newImg?.image?.split('file:/').join('');
  //     //   if (newImg.isNew) {
  //     //     let file = newImageURI.split('/').pop();
  //     //     formdata.append('images', {
  //     //       uri: newImageURI,
  //     //       type: mime.getType(newImageURI),
  //     //       name: file,
  //     //     });
  //     //   }
  //     // });
  //     formdata.append('name', name);
  //     formdata.append('sku', sku);
  //     formdata.append('conversationId', conversationId);
  //     formdata.append('userId', senderId);
  //     formdata.append('receiverId', receiverId);
  //     formdata.append('message', message);
  //     formdata.append('message_type', 'text');
  //     formdata.append('receiver_type', true);
  //     // axios
  //     //   .post(url, formdata, confHeaders)

  //     //   .then(response => {
  //     //     let result = JSON.parse(response.data);
  //     //     if (result?.status === '1') {
  //     //       //setMessages(previousMessages =>
  //     //       //  GiftedChat .append(previousMessages, {
  //     //       //     //_id: Math.round(Math.random() * 1000000),
  //     //       //     text: message,
  //     //       //     sent: false,
  //     //       //     received: false,
  //     //       //     pending: true,
  //     //       //     createdAt: formateToGiftedDate(created_ts),
  //     //       //     // user: {
  //     //       //     //   _id: '1',
  //     //       //     // },
  //     //       //   }),
  //     //       // );
  //     //     } else {
  //     //       Toast.show('❗ could not send');
  //     //     }
  //     //   })
  //     //   .catch(error => {
  //     //     Toast.show('Exception! could not send');
  //     //     console.error(error);
  //     //   });
  //   } else if (type == 'image') {
  //     Toast.show('sending...');
  //     const formdata = new FormData();
  //     const fileName = Date.now() + '-' + stats.filename;

  //     productImages.forEach(newImg => {
  //       let newImageURI = 'file:///' + newImg?.image?.split('file:/').join('');
  //       if (newImg.isNew) {
  //         let file = newImageURI.split('/').pop();
  //         formdata.append('images', {
  //           uri: newImageURI,
  //           type: mime.getType(newImageURI),
  //           name: file,
  //         });
  //       }
  //     });
  //     formdata.append('name', name);
  //     formdata.append('sku', sku);
  //     formdata.append('conversationId', conversationId);
  //     formdata.append('userId', senderId);
  //     formdata.append('receiverId', receiverId);
  //     formdata.append('message', message);
  //     formdata.append('message_type', 'text');
  //     formdata.append('receiver_type', true);
  //     // axios.post(url, formdata, confHeaders)
  //     // RNFetchBlob.fs
  //     //   .stat(message)
  //     //   .then(stats => {
  //     //     const fileName = Date.now() + '-' + stats.filename;
  //     //     RNFetchBlob.fetch(
  //     //       'POST',
  //     //       url,
  //     //       {
  //     //         'Content-Type': 'multipart/form-data',
  //     //       },
  //     //       [
  //     //         {
  //     //           name: 'file',
  //     //           filename: fileName,
  //     //           type: stats.type,
  //     //           data: RNFetchBlob.wrap(message),
  //     //         },
  //     //         {
  //     //           name: 'json',
  //     //           data: JSON.stringify({
  //     //             conversationId: conversationId,
  //     //             userId: senderId,
  //     //             receiverId: receiverId,
  //     //             message: fileName,
  //     //             message_type: 'image',
  //     //             receiver_type: true,
  //     //             date: created_ts,
  //     //           }),
  //     //         },
  //     //       ],
  //     //     )
  //     // .then(response => {
  //     //   let result = JSON.parse(response.data);
  //     //   if (result?.status === '1') {
  //     // setMessages(previousMessages =>
  //     //   GiftedChat.append(previousMessages, {
  //     //     //_id: Math.round(Math.random() * 1000000),
  //     //     image: message,
  //     //     createdAt: formateToGiftedDate(created_ts),
  //     //     sent: false,
  //     //     received: false,
  //     //     pending: true,
  //     //     // user: {
  //     //     //   _id: '1',
  //     //     // },
  //     //   }),
  //     // );
  //     // } else {
  //     //   Toast.show('❗ Image not send');
  //     // }
  //     // })
  //     // .catch(error => {
  //     //   Toast.show('❗ Image not send');
  //     //   console.error(error);
  //     // });

  //     // .catch(error => {
  //     //   Toast.show('❗ Image not send');
  //     //   console.error(error);
  //     // });
  //   }
  // }, []);
  const scrollToBottomComponent = () => {
    return (
      <AppIconButton
        leftIcon={true}
        iconAs="FontAwesome"
        name="angle-double-down"
        width={-45}
        height={23}
        size={40}
        size={30}
        buttonBgColor={colors.purplepro.purple500}
        iconColor={colors.purplepro.purple500}
        // onPress={() => props.navigation.goBack()}
      />
    );
  };
  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToTop = 80;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  };

  const deleteMessages = () => {
    const url =
      config.server +
      'api/message/deleteMessages/' +
      conversationId +
      '/receiver';

    // axios.get(url, msgIds).then(rsp => {
    //   if (rsp.data) {
    //     getFurtherMessages();
    //     setShowDelete(false);
    //     setMsgIds([]);
    //   }
    // });
  };
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#696969',
          },
          left: {
            color: '#696969',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            marginLeft: 10,
            paddingRight: 20,
          },
          right: {
            backgroundColor: '#69d7fa',
            marginRight: 10,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            paddingRight: 20,
          },
        }}
      />
    );
  };
  const sendMessage = () => {
    // onSend(value, 'text');
    setValue('');
    Keyboard.dismiss();
  };
  const renderSend = props => {
    console.log('rendeer send props', props.text);
    console.log('messages', messages);
    const {text} = props;
    return (
      <Send {...props}>
        <View>
          <AppIconButton
            leftIcon={true}
            iconAs="MaterialIcons"
            name="send"
            width={-55}
            IconStyle={{marginTop: 15, marginRight: 5}}
            size={22}
            onPress={() => {
              props?.onSend(props);
            }}
          />
        </View>
      </Send>
    );
  };
  return (
    <>
      <Screen>
        <View style={styles.header}>
          <AppIconButton
            leftIcon={true}
            iconAs="MaterialIcons"
            name="arrow-back"
            width={-45}
            height={23}
            size={40}
            txtColor={colors.default.white}
            //marginX="3.4%"
            //marginY="3%"
            // borderRadius={100}
            style={{
              right: 7,
            }}
            buttonStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
              top: 11,
            }}
            iconColor={colors.purplepro.purple500}
            onPress={() => props.navigation.goBack()}
          />
          <View style={styles.headingBox}>
            <Text style={styles.senderName}>{item?.name}</Text>
            {/* {name != '' ? (
              <Text style={styles.senderName}>{name}</Text>
            ) : ( */}
            {/* <Text style={styles.senderName}>
              {item?.userName || item?.name}
            </Text> */}
            {/* // <Text style={styles.senderName}>{number}</Text> */}
            {/* )} */}
            {/* <Text style={styles.subject}>{title}</Text> */}
          </View>
          <AppIconButton
            leftIcon={true}
            iconAs="FontAwesome"
            name="phone-alt"
            width={-30}
            height={21}
            size={33}
            marginX="3.4%"
            marginY="3%"
            buttonStyle={{
              alignSelf: 'center',
              top: 8,
              left: 3,
            }}
            iconColor={colors.lightBlue.lightBlue500}
            borderRadius={100}
            txtColor={colors.default.white}
            style={styles.imageContainer}
            onPress={e => {
              Linking.openURL(
                Platform.OS === 'android'
                  ? `tel:${number}`
                  : `telprompt:${number}`,
              );
            }}
          />
        </View>
        <View
          onTouchStart={() => {
            Keyboard.dismiss();
          }}
          style={{flex: 1, backgroundColor: '#f1f1f1', marginBottom: 55}}>
          {showDelete ? (
            <>
              <View style={styles.showDeleteView}>
                <AppIconButton
                  leftIcon={true}
                  iconAs="MaterialCommunityIcons"
                  name="cancel"
                  width={-45}
                  height={23}
                  size={22}
                  txtColor={colors.default.white}
                  style={[
                    styles.showDeletButton,
                    {backgroundColor: colors.indigopro.indigo700},
                  ]}
                  onPress={() => {
                    setMsgIds([]);
                    setShowDelete(false);
                  }}
                />

                <AppIconButton
                  leftIcon={true}
                  iconAs="AntDesign"
                  name="delete"
                  width={-45}
                  height={23}
                  size={22}
                  txtColor={colors.default.white}
                  style={[
                    styles.showDeletButton,
                    {backgroundColor: colors.dangerpro.danger600},
                  ]}
                  //onPress={() => deleteMessages()}
                />
              </View>
            </>
          ) : (
            <></>
          )}
          <View style={{height: height / 1.38}}>
            {messages ? (
              <>
                <GiftedChat
                  messages={messages}
                  onSend={messages => onSend(messages)}
                  renderBubble={renderBubble}
                  alwaysShowSend
                  //renderSend={renderSend}
                  scrollToBottom={true}
                  //scrollToBottomComponent={scrollToBottomComponent}
                  // renderAvatar={null}
                  user={{
                    //_id: '1',
                    _id: user.uid,
                  }}
                />
              </>
            ) : (
              <>
                <Text style={{marginTop: 20}}>Currently No Chat Available</Text>
              </>
            )}
          </View>
        </View>
      </Screen>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: 40,
    left: 15,
    // borderWidth: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    height: Dimensions.get('window').height / 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#767676',
    top: 2,
  },
  subject: {
    fontSize: 12,
    color: '#767676',
  },
  headingBox: {
    marginLeft: 11,
    flex: 1,
  },
  showDeleteView: {
    backgroundColor: colors.backgroud,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showDeletButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
