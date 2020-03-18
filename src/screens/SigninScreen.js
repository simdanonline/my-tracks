import React, { useState, useContext, useEffect } from 'react';
import Spacer from '../components/Spacer';
import { Input, Button } from "react-native-elements";
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import Modal from "react-native-modal";


import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    ActivityIndicator,
    Alert,
    TextInput,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';


const SigninScreen = ({ navigation }) => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CorrectEmail, setCorrect] = useState('')
    const { height, width } = Dimensions.get('window')
    const { state, signin, clearErrorMessage, AutoLogin } = useContext(AuthContext);
    useEffect(() => { AutoLogin() }, []);


    const checkForm = () => {
        if (!email || !password) {
            return Alert.alert('Please enter email address and password')
        }
        clearErrorMessage()
        setCorrect('')
        validate(email, password)


    }

    const validate = (email, password) => {
        console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
            return setCorrect('Please enter a valid email address');
        }
        else {
            signin({ email, password })
            //this.setState({ email: text })
            console.log("Email is Correct");
        }
    }



    return (
        <ImageBackground source={require('../../assets/login.jpg')} style={style.backgroundImage}>

            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <View style={style.viewStyle}>
                <Spacer>

                    <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20, fontStyle: 'italic' }} > ...you're few steps away from recording your tracks</Text>
                </Spacer>
                <Spacer>
                    <TextInput
                        placeholder="Enter email address"
                        keyboardType={'email-address'}
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={style.input} />
                </Spacer>
                <Spacer>

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={style.input} />
                </Spacer>
                <Spacer>
                    {state.errorMessage ? <Text style={style.errorMessage}>{state.errorMessage}</Text> : null}

                    <TouchableOpacity
                        onPress={() => {
                            checkForm()
                        }}
                        activeOpacity={.8}
                    >
                        <View
                            style={{
                                ...style.button,
                                backgroundColor: "#0D5581",
                                marginTop: 10
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                                Login
            </Text>
                        </View>
                    </TouchableOpacity>

                    {CorrectEmail ?
                        <View style={{ backgroundColor: 'red', padding: 10, marginHorizontal: width / 12, borderRadius: 35 }} >
                            <Text style={{ textAlign: 'center', color: 'white' }} >Please enter a valid email address</Text>
                        </View>
                        : null}



                    <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate("Signup")}>
                        <View
                            style={{
                                ...style.button,
                                backgroundColor: "white",
                                marginTop: 10,
                                borderColor: 'blue',
                                borderWidth: 0.5
                            }}
                        >
                            <Text style={{ color: '#8E3223' }}  >Don't have an account?</Text>

                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
                                Register
            </Text>
                        </View>
                    </TouchableOpacity>
                </Spacer>

                <Spacer />


            </View>

            <Modal isVisible={state.isLoading}
            >
                <View style={style.modalContent}>
                    <ActivityIndicator size={'large'} />
                    <Text> Getting user account... </Text>
                </View>
            </Modal>

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
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    input: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: "blue",
        backgroundColor: "#ccc",
        opacity: 0.6
    },
    button: {
        backgroundColor: "white",
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    }
})




export default SigninScreen;