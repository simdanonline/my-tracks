import React, { useContext, useEffect } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { StyleSheet, Button } from "react-native";
import { Text } from "react-native-elements";
import MapView, { Polyline } from "react-native-maps";
import {
  AdMobBanner,
  AdMobInterstitial,
} from "expo-ads-admob";
import axios from "axios";
import { AsyncStorage } from "react-native";
import Keys from "../Constants/Keys";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("_id");
  const track = state.find((trace) => trace._id == _id);
  const initialRegion = track.locations[0].coords;

  useEffect(() => {
    showInterstitial();
  }, []);

  const showInterstitial = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(Keys.testIntersitial);
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTracks = async (id) => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      method: "delete",
      url: `https://simdanonline-tracksapp.herokuapp.com/tracks/${id}`,
      headers: { Authorization: "Bearer " + token },
    };
    navigation.navigate("TrackList");
    await axios(config);
  };

  const bannerError = () => {
    console.log("Couldnt load ad");
  };
  return (
    <>
      <Text style={style.title}> {track.name}</Text>
      <MapView
        style={style.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialRegion,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>

      <Button title="Delete" onPress={() => deleteTracks(_id)} />

      <AdMobBanner
        style={style.bottomBanner}
        bannerSize="fullBanner"
        adUnitID={Keys.testBanner} // Test ID, Replace with your-admob-unit-id ca-app-pub-1728295148749127/5864179270
        //  testDeviceID="EMULATOR"
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={bannerError}
      />
    </>
  );
};

const style = StyleSheet.create({
  map: {
    height: 450,
  },
  title: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 30,
    color: "blue",
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
});

export default TrackDetailScreen;
