import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '~/screens/HomeScreen';
import WeahterScreen from '~/screens/WeatherScreen';

export type RootStackParamList = {
  Home: undefined;
  Weather: {latitude: number; longitude: number};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Weather" component={WeahterScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
