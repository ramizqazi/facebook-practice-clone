import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from '../auth/screens/AuthStack';
import HomeScreen from '../home/screens/HomeScreen';
import ProfileScreen from '../profile/screens/ProfileScreen';
import * as Colors from '../config/colors';

import { getUser } from '../auth/redux/selectors';
import { changeAuthState as changeAuthStateAction } from '../auth/redux/actions';

const Stack = createNativeStackNavigator();

const ProfileCollection = firestore().collection('profiles');

const AppNavigation = ({ changeAuthState, authenticated  }) => {
  const [initialization, setInitialization] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(async (user)  => {
        if(user) {
          const jsonUser = user.toJSON()
          const profile = await ProfileCollection.where('userId', "==", auth().currentUser.uid).get();
          const userProfile =  profile.docs[0].data();
          changeAuthState({jsonUser, userProfile});
        }
    });
    setInitialization(false);
  }, []);

  if (initialization) {
    return null;
  }

  return (
    <NavigationContainer theme={THEME}>
      <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {authenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
  </NavigationContainer>
  );
};

const THEME = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.background,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.accent,
  },
};

const mapStateToProps = (state) => ({ 
  authenticated: getUser(state),
});

const mapDispatchToProps = {
  changeAuthState: changeAuthStateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
