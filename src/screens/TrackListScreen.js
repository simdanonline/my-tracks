import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { NavigationEvents, FlatList } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem, Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";

import Keys from "../Constants/Keys";

const TrackListScreen = ({ navigation }) => {
  const Interstitial = async () => {
    AdMobInterstitial.setAdUnitID(Keys.testIntersitial);
    //AdMobInterstitial.setAdUnitID('ca-app-pub-1728295148749127/2949407179');
    // Test ID, Replace with your-admob-unit-id
    //AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  };
  const initAds = async () => {
    await setTestDeviceIDAsync("EMULATOR");
  };

  useEffect(() => {
    // Interstitial();
    initAds();
  }, []);

  const { state, fetchTracks } = useContext(TrackContext);
  const { height } = Dimensions.get("window");

  const bannerError = () => {
    console.log("Couldnt load ad");
  };

  const showInterstitial = async () => {
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  };

  // console.log(state)
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={fetchTracks} />

      <FlatList
        data={state}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: height / 2.5,
            }}
          >
            <Text style={{ color: "black", fontSize: 30 }}>
              {" "}
              No tracks found!{" "}
            </Text>
            <Button
              title="Add new track"
              onPress={() => {
                navigation.navigate("createTrack");
              }}
            />
          </View>
        }
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={{ justifyContent: "center", flexDirection: "column" }}>
              <ListItem
                chevron
                title={item.name}
                onPress={() => {
                  // showInterstitial();
                  navigation.navigate("TrackDetails", { _id: item._id });
                }}
              />
            </View>
          );
        }}
      />

      {/* <AdMobBanner
                //style={style.bottomBanner}
                bannerSize="fullBanner"
                adUnitID=""
                servePersonalizedAds={true}
                testDeviceID="EMULATOR"
                didFailToReceiveAdWithError={bannerError}
            /> */}

      <AdMobBanner
        style={style.bottomBanner}
        bannerSize="fullBanner"
        adUnitID={Keys.testBanner} // Test ID, Replace with your-admob-unit-id ca-app-pub-1728295148749127/5864179270
        //  testDeviceID="EMULATOR"
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
};

const style = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
});

export default TrackListScreen;
