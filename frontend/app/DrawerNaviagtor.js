import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './components/Home';
import SearchList from './components/SearchList';
import UserProfile from './components/UserProfile';
import Post from './components/Post';
import AdoptForm from './components/AdoptForm'
import AdoptList from './components/AdoptList'
import AdoptView from './components/AdoptView'
import { useLogin } from './context/LoginProvider';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  // const { state, ...rest } = props;
  // const newState = { ...state}
  const { setIsLoggedIn, profile } = useLogin();
  // const getVisible = item => item.name.contains(item.key, visibleItems);
  // newState.routes = newState.routes.filter(getVisible, props)
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
          <Image
            source={{
              uri:
                profile.avatar ||
                'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props}/>
         {/* state={newState} {...rest} */}
          {/* <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            top: 10,
            backgroundColor: '#f6f6f6',
            padding: 20,
          }}
          onPress={() =>}
        >
          <Text>Add Post</Text>
        </TouchableOpacity> */}
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

const visibleItems = ['Home', 'Profile', 'Search'];


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
      <Drawer.Screen component={SearchList} name='Search' />
      <Drawer.Screen component={Post} name='Post' />
      <Drawer.Screen component={AdoptForm} name='Add Adoption Request' />
      <Drawer.Screen component={AdoptList} name='AdoptList' />
      <Drawer.Screen component={AdoptView} name='AdoptView' />
    </Drawer.Navigator>
  );
};




export default DrawerNavigator;
