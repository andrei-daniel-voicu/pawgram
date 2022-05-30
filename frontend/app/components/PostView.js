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

import { DrawerActions } from '@react-navigation/native';

const PostView = (props) => {
    let icon_name = false;
    const item = props["item"]["item"];
    const profile = props["profile"];
    console.log("Props", props)
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
                setIconName(true);
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

const styles = StyleSheet.create({
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
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    likeButton: {
        marginRight: 10
    }
});

export default PostView;
