import React, { useState, useContext, useEffect } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, TextInput, Alert, ActivityIndicator, Dimensions } from "react-native";
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import Modal from "react-native-modal";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';





const SignupScreen = ({ navigation }) => {

    useEffect(() => {
        getPermissionAsync()
      }, [])
    const { state, signUp, clearErrorMessage, AutoLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CorrectEmail, setCorrect] = useState('')
    const [ username, setUsername ] = useState('')
    const { height, width } = Dimensions.get('window')
    const [file, setPic] = useState('')

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
            signUp({ email, password, username, file })
            //this.setState({ email: text })
            console.log("Email is Correct");
        }
    }

    const Button = ({ onPress, children }) => (
        <TouchableOpacity style={style.buttons} onPress={onPress}>
          <Text style={style.text}>{children}</Text>
        </TouchableOpacity>
      );

      const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

      

   

    const select = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 0.7
          });
      
          console.log(result);
      
          if (!result.cancelled) {
             setPic(result.uri);
          }
    }
    //  useEffect(()=> {AutoLogin()}, []);

    return (



        <ImageBackground source={require('../../assets/signup.jpg')} style={style.backgroundImage}>

            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <Modal isVisible={state.isLoading}
            >
                <View style={style.modalContent}>
                    <ActivityIndicator size={'large'} />
                    <Text> Getting user account... </Text>
                </View>
            </Modal>
            <Spacer></Spacer>

            <ScrollView style={style.viewStyle} >
                <Spacer>
                    <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20, fontStyle: 'italic', marginTop: height/10 }} > ...you're few steps away from recording your tracks</Text>


                </Spacer>
                <Spacer>

                    <View style={{ alignItems: 'center' }}>
                        <Image style={style.image} source={{ uri: file }} />
                        <View style={style.row}>
                            <Button onPress={select}>Set profile picture</Button>
                        </View>
                    </View>

                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="black"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={style.input} />

                    <TextInput
                        placeholder="Enter email address"
                        keyboardType={'email-address'}
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={style.input} />
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

                </Spacer>
                <Spacer>

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
                                Sign up
            </Text>
                        </View>
                    </TouchableOpacity>

                    {CorrectEmail ?
                        <View style={{ backgroundColor: 'red', padding: 10, marginHorizontal: width / 12, borderRadius: 35 }} >
                            <Text style={{ textAlign: 'center', color: 'white' }} >Please enter a valid email address</Text>
                        </View>
                        : null}

                    {state.errorMessage ?
                        <View style={{ backgroundColor: 'red', padding: 10, marginHorizontal: width / 12, borderRadius: 35 }} >
                            <Text style={{ textAlign: 'center', color: 'white' }}>{state.errorMessage}</Text>
                        </View>
                        : null}


                    <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate("Signin")}>
                        <View
                            style={{
                                ...style.button,
                                backgroundColor: "white",
                                marginTop: 10,
                                borderColor: 'blue',
                                borderWidth: 0.5
                            }}
                        >
                            <Text style={{ color: '#8E3223' }}  >Already registered? </Text>

                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
                                Login
            </Text>
                        </View>
                    </TouchableOpacity>

                </Spacer>
            </ScrollView>
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
        flex: 1,
        marginBottom: 20
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }, row: {
        flexDirection: "row"
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#ccc"
    },
    buttons: {
        padding: 13,
        margin: 15,
        backgroundColor: "#dddddd",
        borderRadius: 15
      },
      text: {
        fontSize: 21
      },
});

export default SignupScreen;
