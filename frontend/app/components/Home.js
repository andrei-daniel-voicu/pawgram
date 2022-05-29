import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Post from './Post';

const Home = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {/* <Button
        onPress={() =>
          navigate('Profile', { names: ['Brent', 'Satya', 'Michaś'] })
        }
        title="Create Post"
      /> */}
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
