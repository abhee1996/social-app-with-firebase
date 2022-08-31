import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext();

export const AuthFireProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (error) {
              console.log('fire auth login error', error);
            }
          },
          register: async (name, email, password) => {
            try {
              const res = await auth().createUserWithEmailAndPassword(
                email,
                password,
              ); //
              await firestore().collection('users').doc(res.user.uid).set({
                name: name,
                email: res.user.email,
                uid: res.user.uid,
              });
            } catch (error) {
              console.log('fire auth register error', error);
            }
          },
          logout: async () => {
            try {
              await auth().signOut();
            } catch (error) {
              console.log('fire auth signout error', error);
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
