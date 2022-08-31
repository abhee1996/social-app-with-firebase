import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useToast} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import Error from '../../Component/Error';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import config from '../../config/config';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import {getUserProfile, userlogout} from '../../Redux/actions/Auth.Action';
import {DevSettings} from 'react-native';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {AuthContext} from '../../navigator/AuthFireProvider';
const {width, height} = Dimensions.get('window');
const Register = props => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [userProfile, setuserProfile] = useState();
  const [loading, setLoading] = useState(true);
  // const context = useContext(AuthGlobal);
  const context = useContext(AuthContext);
  console.log('context.user', context?.user?.uid);
  const User = context?.user;
  // const UserId = context?.userValue?.userId;
  // const isUser = context?.userValue?.isUser;
  //request.auth.uid != null;
  const toast = useToast();
  // async function fireStoreCreateuser(em, pass) {
  //   let user = {
  //     email: em,
  //     password: pass,
  //     // uid: auth().currentUser.uid,
  //   };

  //   await firestore().collection('users').add(user);
  //   await context?.register(em, pass);
  // }

  //let registerURL = `${config.server}/users/auth/register`;
  // const register = () => {
  //   if (name === '' || username === '' || email === '' || password === '') {
  //     setError('Please fill all credientials to register');
  //   } else {
  //     let user = {
  //       name: name,
  //       username: username,
  //       email: email,
  //       password: password,
  //     };

  //     axios
  //       .post(registerURL, user)
  //       .then(res => {
  //         if (res.status == 200) {
  //           toast.show({
  //             title: 'Registeration Successfully',
  //             placement: 'top-right',
  //             color: 'white',
  //             bgColor: 'green.300',
  //           });
  //           setTimeout(() => {
  //             props.navigation.navigate('Login');
  //           }, 500);
  //         }
  //       })
  //       .catch(err => {
  //         console.warn('error in registeration', err);
  //         toast.show({
  //           title: 'Registeration failed',
  //           placement: 'top-right',
  //         });
  //       });
  //   }
  // };
  // const updateUser = () => {
  //   if (
  //     (name === '' || username === '' || email === '' || password === '',
  //     phone === '',
  //     city === '',
  //     address === '',
  //     country === '')
  //   ) {
  //     setError('Please fill all credientials to save user profile');
  //   } else {
  //     let user = {
  //       name: name,
  //       username: username,
  //       phone: phone,
  //       email: email,
  //       city: city,
  //       address: address,
  //       zipcode: zipcode,
  //       country: country,
  //     };
  //     let updateUserURL = `${config.server}/users/auth/userdetail/update/${props?.userProfile?.id}`;

  //     axios
  //       .put(updateUserURL, user)
  //       .then(res => {
  //         if (res.status == 200) {
  //           console.log('res', res);
  //           toast.show({
  //             title: 'Update User Successfully',
  //             placement: 'top-right',
  //             color: 'white',
  //             bgColor: 'green.300',
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         console.warn('error in User Update', err);
  //         toast.show({
  //           title: 'User Update failed',
  //           placement: 'top-right',
  //         });
  //       });
  //   }
  // };
  useEffect(() => {
    // if (!isUser) {
    //   setLoading(false);
    // }
    // getUserProfile(UserId).then(_res => {
    //   setuserProfile(_res);
    //   if (isUser) {
    //     setName(_res.name);
    //     setUserName(_res.username);
    //     setEmail(_res.email);
    //fireStoreCreateuser();
    //setEmail(User.email);
    //     setPhone(_res.phone);
    setLoading(false);
    //   }
    // });
  }, []);

  return (
    <>
      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          {/* {props?.isUser ? ( */}
          {context?.user ? (
            <>
              <View>
                <Text
                  style={{
                    marginVertical: 15,
                  }}>
                  {User?.email}
                </Text>
                <View>
                  <AppIconButton
                    title="logout"
                    size={25}
                    width={25}
                    height={4}
                    marginX="3%"
                    marginY="1%"
                    borderRadius={0}
                    buttonBgColor={colors.warningpro.warning500}
                    txtColor={colors.default.white}
                    onPress={() => {
                      // props.navigation.navigate('Login')
                      context?.logout();
                      // userlogout(props?.context?.dispatch);
                      // DevSettings.reload();
                    }}
                  />
                </View>
              </View>
              {/* <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                // extraHeight={20}
                enableOnAndroid={true}>
                <FormContainer title="User Profile">
                  <InputField
                    placeholder="Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                  />
                   <InputField
                    placeholder="Phone Number"
                    name="phone"
                    id={'phone'}
                    value={phone}
                    keyboardType={'numeric'}
                    onChangeText={text => setPhone(text)}
                  />
                  <InputField
                    placeholder="User Name"
                    name="username"
                    value={username}
                    id={'username'}
                    onChangeText={text => setUserName(text)}
                  />
                 
                  <InputField
                    placeholder="Email"
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                  />
                  {/* <InputField
                placeholder="Password"
                name="password"
                value={password}
                id={'password'}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              /> 
                  <InputField
                    placeholder="City"
                    name="city"
                    value={city}
                    id={'city'}
                    // secureTextEntry={true}
                    onChangeText={text => setCity(text)}
                  />
                  <InputField
                    placeholder="Address"
                    name="address"
                    id={'address'}
                    value={address}
                    // secureTextEntry={true}
                    onChangeText={text => setAddress(text)}
                  />
                  <InputField
                    placeholder="Zipcode"
                    name="zipcode"
                    id={'zipcode'}
                    value={zipcode}
                    keyboardType={'numeric'}
                    // secureTextEntry={true}
                    onChangeText={text => setZipcode(text)}
                  />
                  <InputField
                    placeholder="Country"
                    name="country"
                    value={country}
                    id={'country'}
                    // secureTextEntry={true}
                    onChangeText={text => setCountry(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View>
                    <AppIconButton
                      title="save"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={() => updateUser()}
                    />
                  </View>
                  <View>
                    <AppIconButton
                      title="logout"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.warningpro.warning500}
                      txtColor={colors.default.white}
                      onPress={() => {
                        // props.navigation.navigate('Login')
                        userlogout(props?.context?.dispatch);
                        DevSettings.reload();
                      }}
                    />
                  </View>
                </FormContainer>
              </KeyboardAwareScrollView> */}
            </>
          ) : (
            <>
              <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}>
                <FormContainer title="Create Account">
                  <InputField
                    placeholder="Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                  />

                  <InputField
                    placeholder="Email"
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                  />
                  <InputField
                    placeholder="Password"
                    name="password"
                    value={password}
                    id={'password'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View>
                    <AppIconButton
                      title="Register"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={
                        () =>
                          //   {
                          //   let user = {
                          //     email: email,
                          //     password: password,
                          //   };
                          //   firestore()?.collection('users').add(user);
                          context?.register(name, email, password)
                        // }
                        //fireStoreCreateuser(email, password)
                      }
                    />
                  </View>
                  <View>
                    <AppIconButton
                      title="Back To Login"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.warningpro.warning500}
                      txtColor={colors.default.white}
                      onPress={() => props.navigation.navigate('Login')}
                    />
                  </View>
                </FormContainer>
              </KeyboardAwareScrollView>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
});
