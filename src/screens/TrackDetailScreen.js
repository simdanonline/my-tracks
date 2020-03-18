import React, { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import { Text } from 'react-native-elements';
import MapView, { Polyline } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext'
import useDeleteTrack from '../hooks/useDeleteTrack';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';



const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext)
    const { deleteLocation } = useContext(LocationContext)
    const _id = navigation.getParam('_id');
    const track = state.find(trace => trace._id == _id)
    const initialRegion = track.locations[0].coords;


    const bannerError = () => {
        console.log('Couldnt load ad');
    }
    return (
        <>
            <Text style={style.title}> {track.name}</Text>
            <MapView style={style.map}
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialRegion

                }}>
                <Polyline
                    coordinates={track.locations.map(loc => loc.coords)}
                />
            </MapView>



            <AdMobBanner
                style={style.bottomBanner}
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-1728295148749127/8418965164" // Test ID, Replace with your-admob-unit-id ca-app-pub-1728295148749127/5864179270
                //  testDeviceID="EMULATOR"
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={bannerError} />

        </>
    )
}

const style = StyleSheet.create({
    map: {
        height: 450
    },
    title: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 30,
        color: 'blue'
    },
    bottomBanner: {
        position: 'absolute',
        bottom: 0,
    }
})





export default TrackDetailScreen;