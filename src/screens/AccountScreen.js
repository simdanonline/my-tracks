import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ProfileContext } from "../context/ProfileContext";
import { Text, Header } from "react-native-elements";
import { List, ListItem, Button, Icon } from "native-base";
import { ActivityIndicator } from "react-native";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const { state, loggedin } = useContext(ProfileContext);

  useEffect(() => {
    loggedin();
  }, []);

  // console.log('https://simdan-tracks.herokuapp.com/' + state.picture, token)
  // console.log(state)

  const { height, width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={loggedin} />
      <Header
        centerComponent={{ text: "My Account", style: { color: "#fff" } }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Image
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            backgroundColor: "#ccc",
          }}
          source={{
            uri: `https://simdanonline-tracksapp.herokuapp.com/users/${state._id}/avatar`,
          }}
        />
      </View>

      <List>
        <ListItem itemDivider style={{ backgroundColor: "#E5FBE5" }}>
          <Text>username: </Text>
        </ListItem>
        <ListItem>
          {state.name ? <Text> {state.name} </Text> : <ActivityIndicator />}
        </ListItem>
        <ListItem itemDivider style={{ backgroundColor: "#E5FBE5" }}>
          <Text>Email:</Text>
        </ListItem>
        <ListItem>
          <Text> {state.email} </Text>
        </ListItem>
        <ListItem itemDivider style={{ backgroundColor: "#E5FBE5" }}>
          <Text>Phone:</Text>
        </ListItem>
        <ListItem>
          <Text> 0{state.phone} </Text>
        </ListItem>
      </List>

      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <Text style={{textAlign:"center", marginVertical: 20}} >Powered By Simdan Online</Text>
        <Button
          style={{
            backgroundColor: "#1C7ED7",
            width: width,
          }}
          block
          iconLeft
          onPress={signout}
        >
          <Icon name="exit" />
          <Text> </Text>
          <Text>Log out</Text>
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
});

export default AccountScreen;
