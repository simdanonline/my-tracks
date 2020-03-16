import React, {useContext} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View
} from 'react-native';
import { NavigationEvents, FlatList } from 'react-navigation'
import { Context as TrackContext } from '../context/TrackContext';
import { ListItem } from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons'




const TrackListScreen = ({ navigation }) => {

    const { state, fetchTracks } = useContext(TrackContext);
  //  console.log(state)
    return ( 
        <>
        <NavigationEvents onWillFocus={fetchTracks}/>
        
        <FlatList
            data={state}
            keyExtractor={item => item._id}
            renderItem={( {item} ) => {
                return (
                    <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                    
                    <ListItem
                        chevron
                        title={item.name}
                        onPress={() => navigation.navigate('TrackDetails', { _id: item._id }) }
                    />
                    

                    </View>
                )
            }}
         
        />

        </>
    )
}

TrackListScreen.navigationOptions = {
    title: "Tracks"

}

const style = StyleSheet.create({})




export default TrackListScreen;