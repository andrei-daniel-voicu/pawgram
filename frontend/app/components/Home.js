// import React from 'react';
import * as React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const Home = ({ navigation }) => {
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
