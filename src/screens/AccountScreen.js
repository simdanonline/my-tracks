import React, { useContext} from 'react';
import {
    StyleSheet, 
    View
} from 'react-native';
import {  SafeAreaView  } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'

import {Text } from 'react-native-elements';
import { Button, Icon, Footer} from 'native-base';


const AccountScreen = () => {

    const { signout } = useContext(AuthContext);
    return ( 

        <SafeAreaView forceInset={{ top: 'always' }}>
                    <Text h2> Account Screen</Text>
                       
             
                                 
           
            
            <Button danger block iconLeft onPress={signout} >
                <Icon name='exit' />
                <Text>   </Text>
                <Text>Log out</Text>
            </Button>  
        </SafeAreaView>
            
    )
}

const style = StyleSheet.create({
    
})




export default AccountScreen;