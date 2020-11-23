import React, { useContext, useCallback } from "react";
import { Font } from "expo";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import {
  SafeAreaView,
  NavigationEvents,
  withNavigationFocus,
} from "react-navigation";
import { Text, Header } from "react-native-elements";
import Map from "../components/Map";
//import '../_mockLocation';
import { Left, Button, Icon, Title, Body, Right } from "native-base";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { AdMobBanner } from "expo-ads-admob";
import Keys from "../Constants/Keys";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);
  //console.log(isFocused)

  const bannerError = () => {
    console.log("Couldnt load ad");
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        centerComponent={{
          text: "Create a new track",
          style: { color: "#fff", fontSize: 20 },
        }}
      />

      <KeyboardAwareScrollView>
        <Map />
        {err ? <Text>Please enable location services</Text> : null}
        <TrackForm />
      </KeyboardAwareScrollView>

      <AdMobBanner
        style={style.bottomBanner}
        bannerSize="fullBanner"
        adUnitID={Keys.testBanner} // Test ID, Replace with your-admob-unit-id ca-app-pub-1728295148749127/5864179270
        // testDeviceID="EMULATOR"
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Create a new track",
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const style = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
});

export default withNavigationFocus(TrackCreateScreen);
