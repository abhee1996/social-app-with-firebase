import React, {useEffect, useReducer, useState} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducer from '../reducers/Auth.reducer';
import AuthGlobal from './AuthGlobal';
import {
  createStore,
  configureStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import AuthShopReducer from '../reducers/AuthShop.reducer';
import {setCurrentUser} from '../actions/Auth.Action';
import {setCurrentShop} from '../actions/ShopAuth.action';
const Auth = props => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
    isShopAuthenticated: null,
    shop: {},
  });
  const [showChild, setShowChild] = useState(false);
  const {userValue, shopValue} = props;
  useEffect(() => {
    setShowChild(true);
    // AsyncStorage.
    if (AsyncStorage.user_login_Jwt_Token) {
      // AsyncStorage.setItem(`stateUser`, stateUser);

      const decoded = AsyncStorage.user_login_Jwt_Token
        ? AsyncStorage.user_login_Jwt_Token
        : '';
      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }
    // Shop //
    else if (AsyncStorage.shop_jwt) {
      console.log('shop_jwt', AsyncStorage.shop_jwt);

      const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';

      if (showShopChild === true) {
        dispatch(setCurrentShop(jwt_decode(decoded)));
      }
    }
    return () => {
      setShowChild(false);
    };
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          stateShop,
          dispatch,
          dispatchShop,
          userValue,
          shopValue,
        }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};
export default Auth;

// import React, {useEffect, useReducer, useState} from 'react';
// import jwt_decode from 'jwt-decode';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   createStore,
//   configureStore,
//   combineReducers,
//   applyMiddleware,
// } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
// import AuthReducer from '../reducers/Auth.reducer';
// import AuthShopReducer from '../reducers/AuthShop.reducer';
// import AuthGlobal from './AuthGlobal';
// import {setCurrentUser} from '../actions/Auth.Action';
// import {setCurrentShop} from '../actions/ShopAuth.action';
// const reducers = combineReducers({
//   Auth: AuthReducer,
//   AuthShop: AuthShopReducer,
// });
// const Auth = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunkMiddleware)),
// );
// export default Auth;
// const Auth = props => {
//   const [stateAuth, dispatch] = useReducer(AuthReducer, {
//     userAuth: {
//       isAuthenticated: null,
//       user: {},
//     },
//     shopAuth: {
//       isShopAuthenticated: null,
//       shop: {},
//     },
//   });
//   // const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
//   //   isShopAuthenticated: null,
//   //   shop: {},
//   // });

//   const [showChild, setShowChild] = useState(false);
//   const [showShopChild, setShowShopChild] = useState(false);

//   useEffect(() => {
//     setShowChild(true);
//     setShowShopChild(true);
//     // AsyncStorage. //User//
//     if (AsyncStorage.user_login_Jwt_Token) {
//       const decoded = AsyncStorage.user_login_Jwt_Token
//         ? AsyncStorage.user_login_Jwt_Token
//         : '';
//       if (setShowChild) {
//         dispatch(setCurrentUser(jwt_decode(decoded)));
//       }
//     }
//     // Shop //
//     if (AsyncStorage.shop_jwt) {
//       console.log('shop_jwt');
//       const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';
//       if (showShopChild === true) {
//         dispatch(setCurrentShop(jwt_decode(decoded)));
//       }
//     }

//     return () => {
//       setShowChild(false);
//       setShowShopChild(false);
//     };
//   }, []);
//   // if (!showChild) {
//   //   return null;
//   // }
//   // else {
//   //   return (
//   //     <AuthGlobal.Provider
//   //       value={{
//   //         stateUser,
//   //         stateShop,
//   //         dispatch,
//   //       }}>
//   //       {props.children}
//   //     </AuthGlobal.Provider>
//   //   );
//   // }
//   if (!showChild && !showShopChild) {
//     return null;
//   } else if (showChild) {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   } else {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           // stateUser,
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   }
// };

// export default Auth;

//// ///////////////
//               //
// auth store 1   //
//                //
////////////////////
// const Auth = props => {
//   const [stateAuth, dispatch] = useReducer(AuthReducer, {
//     userAuth: {
//       isAuthenticated: null,
//       user: {},
//     },
//     shopAuth: {
//       isShopAuthenticated: null,
//       shop: {},
//     },
//   });
//   // const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
//   //   isShopAuthenticated: null,
//   //   shop: {},
//   // });

//   const [showChild, setShowChild] = useState(false);
//   const [showShopChild, setShowShopChild] = useState(false);

//   useEffect(() => {
//     setShowChild(true);
//     setShowShopChild(true);
//     // AsyncStorage. //User//
//     if (AsyncStorage.user_login_Jwt_Token) {
//       const decoded = AsyncStorage.user_login_Jwt_Token
//         ? AsyncStorage.user_login_Jwt_Token
//         : '';
//       if (setShowChild) {
//         dispatch(setCurrentUser(jwt_decode(decoded)));
//       }
//     }
//     // Shop //
//     if (AsyncStorage.shop_jwt) {
//       console.log('shop_jwt');
//       const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';
//       if (showShopChild === true) {
//         dispatch(setCurrentShop(jwt_decode(decoded)));
//       }
//     }

//     return () => {
//       setShowChild(false);
//       setShowShopChild(false);
//     };
//   }, []);
//   // if (!showChild) {
//   //   return null;
//   // }
//   // else {
//   //   return (
//   //     <AuthGlobal.Provider
//   //       value={{
//   //         stateUser,
//   //         stateShop,
//   //         dispatch,
//   //       }}>
//   //       {props.children}
//   //     </AuthGlobal.Provider>
//   //   );
//   // }
//   if (!showChild && !showShopChild) {
//     return null;
//   } else if (showChild) {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   } else {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           // stateUser,
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   }
// };
//// ///////////////
//               //
// auth store 2   //
//                //
////////////////////
// const Auth = props => {
//   const [stateUser, dispatch] = useReducer(AuthReducer, {
//     isAuthenticated: null,
//     user: {},
//   });
//   const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
//     isShopAuthenticated: null,
//     shop: {},
//   });
//   const reducers = combineReducers({
//     Auth: AuthReducer,
//     AuthShop: AuthShopReducer,
//   });
//   const [showChild, setShowChild] = useState(false);
//   const [showShopChild, setShowShopChild] = useState(false);
//   const store = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(thunkMiddleware)),
//   );
//   useEffect(() => {
//     setShowChild(true);
//     setShowShopChild(true);
//     // AsyncStorage. //User//
//     if (AsyncStorage.user_login_Jwt_Token) {
//       const decoded = AsyncStorage.user_login_Jwt_Token
//         ? AsyncStorage.user_login_Jwt_Token
//         : '';
//       if (setShowChild) {
//         dispatch(setCurrentUser(jwt_decode(decoded)));
//       }
//     }
//     // Shop //
//     if (AsyncStorage.shop_jwt) {
//       console.log('shop_jwt');
//       const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';
//       if (showShopChild === true) {
//         dispatchShop(setCurrentShop(jwt_decode(decoded)));
//       }
//     }

//     return () => {
//       setShowChild(false);
//       setShowShopChild(false);
//     };
//   }, []);
//   // if (!showChild) {
//   //   return null;
//   // }
//   // else {
//   //   return (
//   //     <AuthGlobal.Provider
//   //       value={{
//   //         stateUser,
//   //         stateShop,
//   //         dispatch,
//   //       }}>
//   //       {props.children}
//   //     </AuthGlobal.Provider>
//   //   );
//   // }
//   if (!showChild && !showShopChild) {
//     return null;
//   } else if (showChild) {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           stateUser,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   } else {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           // stateUser,
//           stateShop,
//           dispatchShop,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   }
// };
