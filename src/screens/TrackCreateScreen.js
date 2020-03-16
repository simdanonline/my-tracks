import React, { useContext, useCallback } from 'react';
import { Font } from 'expo';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
    
} from 'react-native';
import {SafeAreaView, NavigationEvents, withNavigationFocus}  from 'react-navigation'
import {Text} from 'react-native-elements'
import Map from '../components/Map';
//import '../_mockLocation';
import { Header, Left, Button,Icon, Title, Body, Right } from 'native-base';
import { Context as LocationContext  } from '../context/LocationContext'
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';




const TrackCreateScreen = ({ isFocused }) => {

  

  const { state:{ recording }, addLocation } = useContext(LocationContext)

  const callback = useCallback(location => {
    addLocation(location, recording)
  }, [recording])

  const [err] = useLocation(isFocused || recording , callback)    
  //console.log(isFocused)

    

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
          <Text h3>Create a new track</Text>

        
        <Map />
        {err ? <Text>Please enable location services</Text>  :  null}
        <TrackForm />
        
        
        
        </SafeAreaView>
    )
}



TrackCreateScreen.navigationOptions =  {
    
        title: 'Create a new track',
        headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
    
}





export default withNavigationFocus (TrackCreateScreen);