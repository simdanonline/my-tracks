import React, { useEffect, useState, useContext } from 'react';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native'
import { Context as LocationContext } from '../context/LocationContext'


const Map = () => {

  const { state: { currentLocation, locations } } = useContext(LocationContext);

  //  console.log(locations)


  if (!currentLocation) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }



  return <MapView
    style={styles.mapStyle}
    initialRegion={{
      ...currentLocation.coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }}


  >
    <Circle
      center={currentLocation.coords}
      radius={30}
      strokeColor="rgba(158, 158, 255, 1.0)"
      fillColor="rgba(158, 158, 255, 0.3)"
    />

    <Polyline coordinates={locations.map(loc => loc.coords)} />
  </MapView>

}



const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.2
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})



export default Map;