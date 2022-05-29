// import React from 'react';
import React, {useState, useEffect, useCallback } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';

const Home = ({ navigation }) => {
  const { profile } = useLogin();
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // fetch(`http://localhost:2345/get-all-posts-following`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"}
    // })
    // .then((response) => {
    //     // console.log ("Response", response)
    //     return response.json()})
    // .then((responseJson) => {
    //     setPosts(responseJson);
    //     return responseJson;
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
    fetch(`http://localhost:2345/get-following/${profile._id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"}
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      setFollowing(responseJson);
      return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
  }, [profile]);

  
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Create Post"
        onPress={() => navigation.dispatch(DrawerActions.jumpTo('Post'))}
      />
      <Button
        title="Jump to Profile"
        onPress={() => navigation.dispatch(DrawerActions.jumpTo('Profile'))}
      />

      <Button
        title="Example"
        onPress={() => navigation.dispatch(DrawerActions.jumpTo('Example'))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
