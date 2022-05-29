import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLogin } from '../context/LoginProvider';
// import { PostView } from '../components/PostView'

const PostView = (props) => {
    // const { setIsLoggedIn, profile } = useLogin();
    
    // const posts = GetUserPosts();
    console.log("ce naiba", props.photo)
    
    return (
        <View style={styles.mediaImageContainer}>
            <Image source={{uri:'https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTA2dHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMjAl/MkYwMyUyRjAyJTJGMTE2NjIxN18xMTY2/MjE3X25hcy1jYWluZS1HZXR0eUltYWdl/cy04MzY3MTY3OTYuanBnJnc9NzgwJmg9/NDQwJmhhc2g9NDk5ZTg5Yzk4NzhlZjlmODhhN2NmOGE1Y2EzZGUyOTk=.thumb.jpg'}} 
            // style={styles.image} 
            // resizeMode="cover"
            ></Image>
        </View>
  );
};


const UserProfile = () => {
    const { setIsLoggedIn, profile } = useLogin();
    const [posts, setPosts] = useState("");
    // let posts = [];
    const list = [];

    useEffect(() => {
        const GetUserPosts = async() => {
            try {
                const res = await fetch(`http://localhost:2345/get-all-posts/${profile._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                //   body: JSON.stringify({
                //     email: resu["user"]["email"],
                //     password: values.password
                //   })
                })
                // console.log("Postari", res);
                const read = res.body
                .pipeThrough(new TextDecoderStream())
                .getReader();

                let data1 = '';
                while (true) {
                    const { value, done } = await read.read();
                    if (done) break;
                        data1 = value;
                }
                let data = JSON.parse(data1);
                // setPosts(JSON.parse(data1));
                // posts = res.body;
                // console.log("Posts", data);
                // Promise.all[posts].then(post => )
                data = data.sort((a, b) => a.date < b.date ? 1 : -1);

                setPosts(data);
                // for (const a of posts) {
                // // posts.foreach( a => 
                //     list.push(
                //     <View style={styles.mediaImageContainer}>,
                //         <Image source={require("../../assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>,
                //         {/* <Image source={{uri: a["photoLink"]}} style={styles.image} resizeMode="cover"></Image> */}
                //     </View>)
                //     // console.log(a["photoLink"])
                // }
                console.log("The big list", posts["0"], posts["0"]["photoLink"])
                return data;
            } catch (e) {
                console.log(e);
            }
        };

        GetUserPosts();

    },[posts])
    // const posts = GetUserPosts();

    console.log("De aici", posts);
    return (
    <SafeAreaView style={styles.container}>
            {/* <Button
                title="Go somewhere"
                onPress={() => {
                    // Navigate using the `navigation` prop that you received
                    navigation.navigate('SomeScreen');
                }}
            /> */}
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{
                            uri:
                                profile.avatar ||
                                'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg',
                            }}
                         style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{profile.fullname}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{profile.username}</Text>
                </View>

                <View style={{  alignSelf: "center", marginTop: 16 }}>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={40} color="#DFD8C8"></Ionicons>
                    </View>
                    <View style={styles.chat}>
                        <MaterialIcons name="chat" size={40} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.donate}>
                        <Ionicons name="cash-outline" size={40} color="#DFD8C8"></Ionicons>
                    </View>
                    <View style={styles.adopt}>
                        <Ionicons name="clipboard-outline" size={40} color="#DFD8C8"></Ionicons>
                    </View>
                </View>

                <View style={{ marginTop: 80 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* <View>{list["0"]}</View> */}
                        {/* {posts["0"]} */}
                        <View style={styles.mediaImageContainer}>
                            <Image source={{uri: 
                                 'https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTA2dHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMjAl/MkYwMyUyRjAyJTJGMTE2NjIxN18xMTY2/MjE3X25hcy1jYWluZS1HZXR0eUltYWdl/cy04MzY3MTY3OTYuanBnJnc9NzgwJmg9/NDQwJmhhc2g9NDk5ZTg5Yzk4NzhlZjlmODhhN2NmOGE1Y2EzZGUyOTk=.thumb.jpg'
                                // posts ? undefined : 'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg'
                                // posts["0"]["photoLink"]
                                }} style={styles.image} resizeMode="cover"></Image>
                        </View>

                    </ScrollView>
                    {/* <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View> */}
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
// active: {
//     backgroundColor: "#34FFB9",
//     position: "relative",
//     bottom: 28,
//     left: 10,
//     padding: 4,
//     height: 20,
//     width: 20,
//     borderRadius: 10
// },
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

export default UserProfile;
