import React, {useState, useContext, useEffect} from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet, ImageBackground } from "react-native";
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';



const SignupScreen = ({ navigation }) => {
    const { state, signUp, clearErrorMessage, AutoLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  //  useEffect(()=> {AutoLogin()}, []);

    

   
  return (
    


    <ImageBackground  source={require('../../assets/signup.jpg')} style={style.backgroundImage}>
        
        <NavigationEvents
                onWillBlur={clearErrorMessage}
            />      
            <Spacer></Spacer>
    
        <View style={style.viewStyle} >
        <Spacer>
        <Text h3>Sign up for tracker</Text>
        </Spacer>
        <Spacer>
        <Input 
            label="Email" 
            value={email} 
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
        />
        </Spacer>
        <Spacer>
        <Input 
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
        />
        </Spacer>
        <Spacer>
            {state.errorMessage ? <Text style={style.errorMessage}>{state.errorMessage}</Text> : null}
        <Button 
            title="Sign up"
            onPress={() => signUp({ email, password })}
        />
        <Text style={style.loginn} onPress={() => navigation.navigate('Signin')}>Already registered? Login</Text>
        
        </Spacer>
        </View>
        </ImageBackground>
  );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const style = StyleSheet.create({
    loginn: {
        textDecorationLine: 'underline',
        fontSize: 17,
        color: 'red',
        marginTop: 20,
        marginLeft: 80
    },
    viewStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom: 135
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
       }
});

export default SignupScreen;
