import React, { useContext } from 'react';
import { Input, Button, Text } from 'react-native-elements'
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack';
import { Alert } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync
} from 'expo-ads-admob';



const TrackForm = () => {

    const { state: { name, recording, locations },
        startRecording, stopRecording, changeName } = useContext(LocationContext);

    const [saveTrack] = useSaveTrack()

    const showInterstitial = async() => {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
      }




    return (
        <>
            <Input placeholder="Enter track name" value={name} onChangeText={changeName} />
            <Spacer />
            {recording ? (<Button title="Stop" onPress={stopRecording} />) : (
                <>
                    <Button title="Start Recording" onPress={name ? () => startRecording() : () => Alert.alert('Enter a track name')} />

                </>)}
            <Spacer />
            {!recording && locations.length && name != '' ? <Button title="Save recording" onPress={() => {
                showInterstitial()
                saveTrack()}} /> : null}
            <KeyboardSpacer topSpacing={50} />

        </>
    );
}

export default TrackForm;