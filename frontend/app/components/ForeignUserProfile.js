import React, { useState, useEffect, useCallback } from 'react';
import {
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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLogin } from '../context/LoginProvider';
// import { PostView } from '../components/PostView'

const PostView = (props) => {
  // const { setIsLoggedIn, profile } = useLogin();

  // const posts = GetUserPosts();
  console.log("ce naiba", props.photo)

  return (
    <View style={styles.mediaImageContainer}>
      <Image source={{ uri: 'https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTA2dHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMjAl/MkYwMyUyRjAyJTJGMTE2NjIxN18xMTY2/MjE3X25hcy1jYWluZS1HZXR0eUltYWdl/cy04MzY3MTY3OTYuanBnJnc9NzgwJmg9/NDQwJmhhc2g9NDk5ZTg5Yzk4NzhlZjlmODhhN2NmOGE1Y2EzZGUyOTk=.thumb.jpg' }}
      // style={styles.image} 
      // resizeMode="cover"
      ></Image>
    </View>
  );
};


const ForeignUserProfile = ({ route }) => {
  const [posts, setPosts] = useState("");
  // let posts = [];
  const list = [];
  const [user, setUser] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    console.log(route.params.username);
    fetch("http://localhost:2345/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "name": route.params.username }),
    })
      .then((response) => response.json())

      .then((responseJson) => {
        setUser(responseJson);
        return responseJson;
      }).then((responseJson) => {
        fetch(`http://localhost:2345/get-all-posts/${responseJson._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            // console.log ("Response", response)
            return response.json()
          })
          .then((responseJson) => {
            setPosts(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      }).then((responseJson) => {
        fetch(`http://localhost:2345/get-followers/${responseJson._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            // console.log ("Response", response)
            return response.json()
          })
          .then((responseJson) => {
            setFollowers(responseJson);
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
      }).then((responseJson) => {
        fetch(`http://localhost:2345/get-following/${responseJson._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            // console.log ("Response", response)
            return response.json()
          })
          .then((responseJson) => {
            setFollowing(responseJson);
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
      })

      .catch((error) => {

        console.error(error);

      });

  }, [route]);



  const ItemView = ({ item }) => {
    return (
      <View style={styles.mediaImageContainer}>
        <Text
          style={styles.itemStyle}
        // onPress={() => getItem(item)}
        >
          {item["text"]}

        </Text>
        <Image source={
          item["photoLink"]}
          style={styles.image} resizeMode="cover"></Image>
      </View>
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

  const handlePatreon = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    try {
      const supported = await Linking.canOpenURL(user['patreonLink']);
      if (!supported) {
        Alert.alert(`Don't know how to open this URL: ${user['patreonLink']}`);
      }
    } catch (e) {
      console.log(e);
    }
  }, [user['patreonLink']]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={{
              uri:
                user['avatar'] ||
                'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg',
            }}
              style={styles.image} resizeMode="center"></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user['fullname']}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user['username']}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#f6f6f6',
          marginTop: 20,
          marginHorizontal: 100
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f6f6f6',
              padding: 20,
            }}
          >
            <Text>{posts.length} Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#f6f6f6',
              padding: 20,
            }}
          // onPress={() => follow(false)}
          >
            <Text>{followers.length} Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#f6f6f6',
              padding: 20,
            }}
          // onPress={() => setIsLoggedIn(false)}
          >
            <Text>{following.length} Following</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center", marginTop: 16 }}>
          <TouchableOpacity style={styles.buttonGPlusStyle}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Post'))}>
            <View style={styles.add}>
              <Ionicons name="ios-add" size={40} color="#DFD8C8"></Ionicons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGPlusStyle}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Adoption'))}>
            <View style={styles.chat}>
              <MaterialIcons name="chat" size={40} color="#DFD8C8"></MaterialIcons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGPlusStyle}
            onPress={handlePatreon}>
            <View style={styles.donate}>
              <Ionicons name="cash-outline" size={40} color="#DFD8C8"></Ionicons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGPlusStyle}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Adoption'))}>
            <View style={styles.adopt}>
              <Ionicons name="clipboard-outline" size={40} color="#DFD8C8"></Ionicons>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 80, alignItems: "center", justifyContent: "center" }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 120,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  chat: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 60,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  donate: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 60,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  adopt: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 120,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  }
});

export default ForeignUserProfile;
