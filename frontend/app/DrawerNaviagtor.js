import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './components/Home';
import SearchList from './components/SearchList';
import UserProfile from './components/UserProfile';
import Post from './components/Post';
import AdoptForm from './components/AdoptForm';
import Example from './components/Example';
import ForeignUserProfile from './components/ForeignUserProfile'
import { useLogin } from './context/LoginProvider';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props, { navigation }) => {
  const { profile } = useLogin();
  const { state, ...rest } = props;
  const newState = { ...state }  //copy from state before applying any filter. do not change original state
  newState.routes = newState.routes.filter(item => !['Post', 'Adoption', 'UserProfile', 'Example'].includes(item.name)) //replace "Login' with your route name

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.fullname}</Text>
            <Text>{profile.email}</Text>
          </View>
          {/* <TouchableOpacity style={styles.buttonGPlusStyle}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Profile'))}> */}
          <Image
            source={{
              uri:
                profile.avatar ||
                'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />

          {/* </TouchableOpacity> */}
        </View>
        <DrawerItemList state={newState} {...rest} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const visibleItems = ['Home', 'Profile', 'SearchList'];


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={Home} name='Home' />
      <Drawer.Screen component={UserProfile} name='Profile' />
      <Drawer.Screen component={ForeignUserProfile} name='ForeignProfile' />
      <Drawer.Screen component={SearchList} name='Search' />
      <Drawer.Screen component={Post} name='Post' />
      <Drawer.Screen component={AdoptForm} name='Adoption' />
      <Drawer.Screen component={Example} name='Example' />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  }
});

export default DrawerNavigator;
