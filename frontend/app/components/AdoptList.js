// Searching using Search Bar Filter in React Native List View

// https://aboutreact.com/react-native-search-bar-filter-on-listview/

 

// import React in our code

import React, {useState, useEffect} from 'react';
import { useLogin } from '../context/LoginProvider';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

// import all the components we are going to use

import {

  SafeAreaView,

  Text,

  StyleSheet,

  View,

  FlatList,

  TextInput,

} from 'react-native';

 

const AdoptList = () => {

  const { setIsLoggedIn, profile } = useLogin();

  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {

    fetch(`http://localhost:2345/get-adoption-list/${profile._id}`)

      .then((response) => response.json())

      .then((responseJson) => {

        setFilteredDataSource(responseJson);

        setMasterDataSource(responseJson);

      })

      .catch((error) => {

        console.error(error);

      });

  }, []);

 

  const adoptionFilter = (text) => {

    // Check if searched text is not blank

    if (text) {

      // Inserted text is not blank

      // Filter the masterDataSource

      // Update FilteredDataSource

      const newData = masterDataSource.filter(

        function (item) {

          const itemData = item['_id']

            ? item['_id'].toUpperCase()

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

 

  const ItemView = ({item}) => {

    return (

      // Flat List Item

      <Text

        style={styles.itemStyle}

        onPress={() => getItem(item)}>


        {item['firstName'].toUpperCase()}

        {' '}

        {item['lastName'].toUpperCase()}

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

    navigation.dispatch(DrawerActions.jumpTo('AdoptView', item));

  };

 

  return (

    <SafeAreaView style={{flex: 1}}>

      <View style={styles.container}>

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

 

export default AdoptList;