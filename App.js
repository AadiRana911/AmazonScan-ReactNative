/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './src/Screens/SignIn';
import OTPScreen from './src/Screens/OTPScreen';
import HomeScreen from './src/Screens/HomeScreen';
import ResultsShowScreen from './src/Screens/ResultsShowScreen';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options = {{title: "Sign In", headerShown: false}}/>
        <Stack.Screen name="OTP" component={OTPScreen} options = {{title: "OTP", headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options = {{title: "Home", headerShown: false}}/>
        <Stack.Screen name="ResultsShow" component={ResultsShowScreen} options = {{title: "Results", headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;