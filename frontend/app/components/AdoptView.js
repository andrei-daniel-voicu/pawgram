import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

const AdoptView = (props) => {

  useEffect(() => {

    fetch(`http://localhost:2345/get-adoption-request/${props._id}`)

      .then((response) => response.json())

      .then((responseJson) => {

        setFilteredDataSource(responseJson);

        setMasterDataSource(responseJson);

      })

      .catch((error) => {

        console.error(error);

      });
    })

  return (
    <SafeAreaView>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
            {'First Name'}</Text>
      <TextInput
        style={styles.input}
        value={"text"}
        editable={false}
      />
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Last Name'}</Text>
      <TextInput
        style={styles.input}
        value={"text"}
        editable={false}
      />
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Address'}</Text>
      <TextInput
        style={styles.input}
        value={"text"}
        editable={false}
      />
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Phone'}</Text>
      <TextInput
        style={styles.input}
        value={"text"}
        editable={false}
      />
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15,  marginTop:5}}>
          {'Message'}</Text>
      <TextInput
        style={styles.input}
        value={"text"}
        editable={false}
      />
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
});

export default AdoptView;