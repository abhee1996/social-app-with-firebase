import {StyleSheet, Text, View, Button, Dimensions, Chec} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import Error from '../../Component/Error';
import {Checkbox, Radio, useToast} from 'native-base';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {loginUser} from '../../Redux/actions/Auth.Action';
import {loginShop} from '../../Redux/actions/ShopAuth.action';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import {DevSettings} from 'react-native';

import colors from '../../config/colors';
import {AuthContext} from '../../navigator/AuthFireProvider';
import SocialButton from '../../Component/SocialButton/SocialButton';
const {width} = Dimensions.get('window');
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShop, setIsShop] = useState(false);
  const {login} = useContext(AuthContext);

  // const ShopId = context?.contextValue?.authContext?.shopId;

  // const UserId = context?.stateUser?.user?.userId;
  // const isAuthenticated = context.stateUser.isAuthenticated;
  // const isShopAuthenticated = context.stateShop.isShopAuthenticated;

  const {navigation} = props;
  const toast = useToast();
  useEffect(() => {
    // if (context.stateUser.isAuthenticated === true) {
    //   props.navigation.navigate('UserProfile');
    // } else {
    //   props.navigation.navigate('Admin');
    // }
  }, []);

  // const handleSubmit = async () => {
  //   const user = {
  //     email,
  //     password,
  //   };
  //   if (email === '' || password === '') {
  //     setError('please fill your empty credientials');
  //   } else if (email === '' && password === '') {
  //     setError('Your email and password fields are empty');
  //   } else {
  //     if (isShop !== true) {
  //       const result = await loginUser(user, context.dispatch);
  //       if (result.isloggedIn) {
  //         DevSettings.reload();
  //       }
  //     } else {
  //       console.log(' login as Shop');

  //       const shopResult = await loginShop(user, context.dispatchShop);
  //       if (shopResult?.isloggedIn) {
  //         DevSettings.reload();
  //         props.navigation.navigate('Home');
  //       }
  //     }
  //   }
  //   // hamza01
  // };
  return (
    <FormContainer title="Login">
      <View
        style={{
          width: width,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <InputField
          placeholder="Enter Email address"
          borderRadius={5}
          height={2}
          name="email"
          id="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View
        style={{
          width: width,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <InputField
          placeholder="Enter Password"
          borderRadius={5}
          height={2}
          name="password"
          id="password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        {/* <Checkbox
          value="success"
          colorScheme="success"
          style={{
            fontSize: 15,
            // marginHorizontal: 10,
            marginVertical: 10,
            fontWeight: '800',
          }}
          wrapperRef={myRef}
          onChange={state => {
            if (state) {
              setIsShop(true);
            } else {
              setIsShop(false);
            }
          }}>
          login as shop
        </Checkbox> */}
        {/* {error ? <Error message={error} /> : null} */}
      </View>
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}

        <AppIconButton
          title="Login"
          size={25}
          width={1}
          height={4}
          marginX="3%"
          marginY="1%"
          borderRadius={0}
          buttonBgColor={colors.primarypro.primary500}
          txtColor={colors.default.white}
          onPress={() => login(email, password)}
        />
        <SocialButton
          buttonTitle="Sign In with Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => {}}
        />

        <SocialButton
          buttonTitle="Sign In with Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {}}
        />
      </View>
      <View
        style={
          (styles.buttonGroup,
          {
            marginTop: 10,
          })
        }>
        <Text
          style={
            (styles.middleText,
            {fontSize: 14, fontWeight: '800', alignSelf: 'center'})
          }>
          Don't have an account yet?
        </Text>
        {/* <Text
          style={
            (styles.middleText,
            [
              {
                fontSize: 25,
                fontWeight: '800',
                marginHorizontal: 27,
                marginVertical: 2,
              },
            ])
          }></Text> */}
        <AppIconButton
          title="Register"
          leftIcon={true}
          size={15}
          height={4}
          marginX="3%"
          marginY="7%"
          borderRadius={0}
          buttonBgColor={colors.rose.rose500}
          txtColor={colors.default.white}
          onPress={() => navigation.navigate('Register')}
        />
        {/* <AppIconButton
          title="Register as Shop"
          leftIcon={true}
          size={25}
          width={25}
          height={6}
          marginX="3%"
          marginY="1%"
          borderRadius={0}
          buttonBgColor={colors.warningpro.warning500}
          txtColor={colors.default.white}
          onPress={() => navigation.navigate('RegisterShop')}
        /> */}
      </View>
    </FormContainer>
  );
};
// const mapStateToProps = state => {
//   const {AuthShop, Auth} = state;
//   return {
//     userAuth: Auth,
//     AuthShop: AuthShop,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     loginUser: () => dispatch(loginUser),
//     loginShop: item => dispatch(loginShop),
//   };
// };
// export default connect()(Login);
export default Login;

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
