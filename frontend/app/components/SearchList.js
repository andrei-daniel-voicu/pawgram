// Searching using Search Bar Filter in React Native List View

// https://aboutreact.com/react-native-search-bar-filter-on-listview/



// import React in our code

import React, { useState, useEffect } from 'react';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeNavigator } from '@react-navigation/drawer';
// import all the components we are going to use

import {

  SafeAreaView,

  Text,

  StyleSheet,

  View,

  FlatList,

  TextInput,

} from 'react-native';



const SearchList = ({ navigation }) => {

  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [masterDataSource, setMasterDataSource] = useState([]);
  useEffect(() => {

    fetch('http://localhost:2345/get-all-users')

      .then((response) => response.json())

      .then((responseJson) => {
        console.log(responseJson);
        setFilteredDataSource(responseJson);

        setMasterDataSource(responseJson);

      })

      .catch((error) => {

        console.error(error);

      });

  }, []);



  const searchFilterFunction = (text) => {

    // Check if searched text is not blank

    if (text) {

      // Inserted text is not blank

      // Filter the masterDataSource

      // Update FilteredDataSource

      const newData = masterDataSource.filter(

        function (item) {

          const itemData = item['username']

            ? item['username'].toUpperCase()

            : ''.toUpperCase();

          const textData = text.toUpperCase();

          return itemData.indexOf(textData) > -1;

        });

      setFilteredDataSource(newData);

      setSearch(text);

    } else {

      // Inserted text is blank

      // Update FilteredDataSource with masterDataSource

      setFilteredDataSource(masterDataSource);

      setSearch(text);

    }

  };



  const ItemView = ({ item }) => {

    return (

      // Flat List Item

      <Text

        style={styles.itemStyle}

        onPress={() => getItem(item)}>

        {item.id}

        {'.'}

        {item['username'].toUpperCase()}

      </Text>

    );

  };



  const ItemSeparatorView = () => {

    return (

      // Flat List Item Separator

      <View

        style={{

          height: 0.5,

          width: '100%',

          backgroundColor: '#C8C8C8',

        }}

      />

    );

  };



  const getItem = (item) => {

    // Function for click on an item

    navigation.dispatch(DrawerActions.jumpTo('ForeignProfile'));
  };



  return (

    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        <TextInput

          style={styles.textInputStyle}

          onChangeText={(text) => searchFilterFunction(text)}

          value={search}

          underlineColorAndroid="transparent"

          placeholder="Search Here"

        />

        <FlatList

          data={filteredDataSource}

          keyExtractor={(item, index) => index.toString()}

          ItemSeparatorComponent={ItemSeparatorView}

          renderItem={ItemView}

        />

      </View>

    </SafeAreaView>

  );

};



const styles = StyleSheet.create({

  container: {

    backgroundColor: 'white',

  },

  itemStyle: {

    padding: 10,

  },

  textInputStyle: {

    height: 40,

    borderWidth: 1,

    paddingLeft: 20,

    margin: 5,

    borderColor: '#009688',

    backgroundColor: '#FFFFFF',

  },

});



export default SearchList;