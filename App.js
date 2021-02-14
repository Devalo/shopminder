import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from './firebase';

import ShopmindersTab from './screens/ShopmindersTab';
import SettingsTab from './screens/SettingsTab';

import LoginScreen from './screens/sessions/LoginScreen';
import RegisterScreen from './screens/sessions/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
      backgroundColor: 'transparent',
    },
  });

  return (
      <NavigationContainer theme={DefaultTheme}>
        {signedIn
          ? (
            <SafeAreaView style={{flex: 1, backgroundColor: '#29434e'}}>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    if (route.name === 'shopminders') {
                      return (
                        <FontAwesome 
                        name='list-ul'
                        size={size}
                        color={color}
                        />
                      )
                    }
                    if (route.name === 'settings') {
                      return (
                        <FontAwesome 
                          name="cogs"
                          size={size}
                          color={color}
                        />
                      )
                    }
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'white',
                  inactiveTintColor: '#819ca9',
                  style: {
                    backgroundColor: '#29434e'
                  }
                }}
              >
                <Tab.Screen 
                  name="shopminders"
                  component={ShopmindersTab}
                  options={{
                    title: 'Shopminders'
                  }}
                />
                <Tab.Screen 
                  name="settings"
                  component={SettingsTab}
                  options={{
                    title: 'Settings'
                  }}
                />
              </Tab.Navigator>
            </SafeAreaView>
          ) : (
            <>
              <StatusBar style="light" />
              <Stack.Navigator
              mode="card"
              screenOptions={{
              }}
              >
                <Stack.Screen
                  name="signIn"
                  component={LoginScreen}
                  options={{
                    title: 'Sign in',
                    headerStyle: {
                      backgroundColor: '#29434e',
                      borderBottomColor: '#29434e',
                    },
                    cardStyleInterpolator: forFade,
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="register"
                  component={RegisterScreen}
                  options={{
                    title: 'Register',
                    headerStyle: {
                      backgroundColor: '#29434e',
                      borderBottomColor: '#29434e',
                    },
                    cardStyleInterpolator: forFade,
                    headerTintColor: '#fff',
                  }}
                />
              </Stack.Navigator>
            </>
          )}
      </NavigationContainer>
  );
}
