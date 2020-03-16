import React, {useEffect, useContext} from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';


const EmptyScreen = () => {

    const { AutoLogin } = useContext(AuthContext);

    useEffect (() => {
        AutoLogin();
    }, [])
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        
    )
    
}

const styles = StyleSheet.create({
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



export default EmptyScreen;
