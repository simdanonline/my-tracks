import React, {useState, useContext, useEffect} from 'react';
import Spacer from '../components/Spacer';
import { Text, Input, Button } from "react-native-elements";
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';


import {
    View,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';


const SigninScreen = ({ navigation }) => {

   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, signin, clearErrorMessage, AutoLogin } = useContext(AuthContext);
    useEffect(()=> {AutoLogin()}, []);



    return ( 
        <ImageBackground source={require('../../assets/login.jpg')} style={style.backgroundImage}>
            
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />    
            <View style={style.viewStyle}>   
            <Spacer>
            
            <Text h3>Sign in to your account</Text>
            </Spacer>
            <Spacer>
            <Input 
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false} />
            </Spacer>
            <Spacer>
            <Input 
                    value={password}
                    onChangeText={setPassword}
                    label="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry />
            </Spacer>
            <Spacer>
            {state.errorMessage ? <Text style={style.errorMessage}>{state.errorMessage}</Text> : null}
            <Button title="Login" onPress={() =>signin({ email, password })} />
            </Spacer>

            <Spacer />
            <Text style={style.loginn} onPress={() => navigation.navigate('Signup')}>Don't have an account? Register</Text>
             
            
            </View>   
    </ImageBackground>
    )
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const style = StyleSheet.create({
    loginn: {
        textDecorationLine: 'underline',
        fontSize: 17,
        color: 'red',
        marginTop: 20,
        marginLeft: 80,
        fontWeight: 'bold'
    },
  
    errorMessage: {
        fontSize: 16,
        color: 'red'
    },
    backgroundImage: {
       // resizeMode: 'cover',
        alignSelf: 'stretch',
        flex: 1,
        height: null,
        width: null // or 'stretch'
      },
    viewStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 2,
        marginBottom: 135
    },
})




export default SigninScreen;