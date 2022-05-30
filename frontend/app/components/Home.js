// import React from 'react';
import React, {useState, useEffect, useCallback } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Alert
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLogin } from '../context/LoginProvider';

const Home = ({ navigation, route }) => {
  const { profile } = useLogin();
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
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
    .then((res) => {
      if (res.length != 0) {
        console.log("Suntem aici", res)
        fetch(`http://localhost:2345/get-all-posts-following`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"},
          body: JSON.stringify(res),
        })
        .then((response) => {
            // console.log ("Response", response)
            return response.json()})
        .then((responseJson) => {
            setPosts(responseJson);
            return responseJson;
        })
      }
    })
    .catch((error) => {
        console.error(error);
    });
  }, [route?.params, navigation]);
  const ItemView = ({ item }) => {
    var icon_name = false;
   
    return (
        <View style={styles.mediaImageContainer}>
            <Text
                style={styles.itemStyle}
            // onPress={() => getItem(item)}
            >
                {item["text"]}

            </Text>
            <TouchableOpacity style={styles.buttonGPlusStyle} onPress={async () => {
                let found = false;
                console.log(icon_name);

                for (let i = 0; i < item["likesList"].length; i++) {
                    if (item["likesList"][i] === profile._id) {
                        found = true;
                        break;
                    }
                }
                if (found == false) {

                    const rest = await fetch(`http://localhost:2345/add-like/${item['_id']}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: profile._id,
                        })
                    })
                }
                else {
                    icon_name = true;
                }
                console.log(icon_name);
            }}>
                <View style={styles.likeButton}
                >
                    {icon_name === true ? <Ionicons name="thumbs-up" size={40} color="#DFD8C8"></Ionicons>
                        : <Ionicons name="thumbs-up-outline" size={40} color="#DFD8C8"></Ionicons>}

                </View>
            </TouchableOpacity>

            <Image source={
                item["photoLink"]}
                style={styles.image} resizeMode="cover"></Image>
        </View >
    );
};
 
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={{ marginTop: 80, alignItems: "center", justifyContent: "center"}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
},
mediaImageContainer: {
  width: 180,
  height: 200,
  borderRadius: 12,
  overflow: "hidden",
  marginHorizontal: 10
},
likeButton: {
  marginRight: 10
}
});

export default Home;