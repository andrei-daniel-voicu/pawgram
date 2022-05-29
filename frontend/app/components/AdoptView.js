import React, {useState, useEffect} from 'react';
import { Button, View, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

const AdoptView = ({route}, {navigation}) => {

  const [adopt, setAdopt] = useState("");

  useEffect(() => {

    fetch(`http://localhost:2345/get-adoption-request/${route.params.id}`)

      .then((response) => response.json())

      .then((responseJson) => {

        setAdopt(responseJson);
        return responseJson;

      })

      .catch((error) => {

        console.error(error);

      });
    }, [route])

  return (
    <SafeAreaView>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
            {'First Name'}</Text>
      <Text style={styles.input}>
        {adopt['firstName']}</Text>

      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Last Name'}</Text>
      <Text style={styles.input}>
      {adopt['lastName']}</Text>

      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Address'}</Text>
      <Text style={styles.input}>
        {adopt['address']}</Text>

      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Phone'}</Text>
      <Text style={styles.input}>
        {adopt['phone']}</Text>

      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Message'}</Text>
      <Text style={styles.input}>{adopt['message']}</Text>

      <View style={styles.fixToText}>
        <Button
          color="#25d622"
          title="Accept"
          onPress={() => navigation.dispatch(DrawerActions.jumpTo('AdoptList'))}
        />
        <Button
          color="#f01e13"
          title="Reject"
          onPress={() => navigation.dispatch(DrawerActions.jumpTo('AdoptList'))}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default AdoptView;