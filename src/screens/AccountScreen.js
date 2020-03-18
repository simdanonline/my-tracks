import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions, Image
} from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as ProfileContext } from '../context/ProfileContext'
import { Text, Header } from 'react-native-elements';
import {  List, ListItem, Button, Icon } from 'native-base';
import axios from 'axios'
import { AsyncStorage, ActivityIndicator } from "react-native";



const AccountScreen = () => {
    
    const { signout } = useContext(AuthContext);
    const { state, loggedin } = useContext(ProfileContext)
    const [ picture, setPicture] = useState(null)
    const token = async() => await AsyncStorage.getItem('token');

    const img = async() => {
        const token = async() => await AsyncStorage.getItem('token');
        return  console.log(token)
    }

    img()

    

   
    //     if(state.picture) {
    //         async() =>{
        
        
    //     const config = {
    //         method: 'get',
    //         url: ' https://simdan-tracks.herokuapp.com/' + state.picture,
    //         headers: { 'Authorization': 'Bearer ' + token },
    //     }
    //     console.log(config)
    //     await axios(config)
    //     .then(res => {
    //         setPicture(res.data.url)
    //         console.log(res.data)})
    //     .catch(err => console.log(err))}
    // }
    

    useEffect(() => {
        loggedin()
    }, [])

   // console.log('https://simdan-tracks.herokuapp.com/' + state.picture, token)
    console.log(state)

    const { height, width } = Dimensions.get('window')
    return (

        <View style={{ flex: 1 }} >
            <NavigationEvents onWillFocus={loggedin} />
            <Header
                centerComponent={{ text: 'My Account', style: { color: '#fff' } }}
            />


            {/* <Image source={{
                uri: 'https://simdan-tracks.herokuapp.com/' + state.picture,
                method: 'get',
                headers: { 'Authorization': 'Bearer ' + token }
                }}
                style={{width: 200, height: 200}}
             /> */}


  

            <List>
                
                <ListItem itemDivider style={{ backgroundColor: '#E5FBE5' }}>
                    <Text>username: </Text>
                </ListItem>
                <ListItem >
                    { state.username ? <Text> {state.username} </Text> : <ActivityIndicator/>}
                </ListItem>
                <ListItem itemDivider style={{ backgroundColor: '#E5FBE5' }}>
                    <Text >Email:</Text>
                </ListItem>
                <ListItem>
                    <Text> {state.email} </Text>
                </ListItem>

            </List>
 
  








            <Button style={{ backgroundColor: '#1C7ED7', position: 'absolute', bottom: 0, width: width }} block iconLeft onPress={signout} >
                <Icon name='exit' />
                <Text>   </Text>
                <Text>Log out</Text>
            </Button>
        </View>

    )
}

const style = StyleSheet.create({
    bottomBanner: {
        position: 'absolute',
        bottom: 0,
    }
})




export default AccountScreen;