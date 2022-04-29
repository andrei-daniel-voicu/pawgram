import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/Landing'
import RegisterScreen from './components/Register'

import { initializeApp } from 'firebase/app';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGEAmLiUGqrbD7Yid-QHPhElA6rEyiP40",
  authDomain: "pawgram-b637d.firebaseapp.com",
  projectId: "pawgram-b637d",
  storageBucket: "pawgram-b637d.appspot.com",
  messagingSenderId: "941226273861",
  appId: "1:941226273861:web:780e0b73ffec92a4ac072c"

};

const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App