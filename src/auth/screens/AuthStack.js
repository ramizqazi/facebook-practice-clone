import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

/* =============================================================================
<AuthStack />
============================================================================= */
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
