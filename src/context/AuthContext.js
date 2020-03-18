import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from '../navigationRef';
import axios from 'axios'


const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload, isLoading: false };
    case "AUTH":
      return { errorMessage: "", token: action.payload, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: "" }
    case "LOG_OUT":
      return { token: "", errorMessage: "" }
    case "SET_LOADING":
      return { ...state, isLoading: true }
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({
    type: "CLEAR_ERROR"
  });
}

const AutoLogin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "AUTH"
    })
    navigate('TrackList');
  } else {
    navigate('Signin')
  }
}


const signUp = dispatch => async ({ email, password, username, file }) => {
  dispatch({
    type: "SET_LOADING"
  })
  const data = new FormData();

  data.append('email', email);
  data.append('username', username);
  data.append('password', password);
  data.append('file', {
    type: 'image/jpg',
    uri: file,
    name: 'profilepic.jpg'
  });

  const config = {
    method: 'post',
    url: ' https://simdan-tracks.herokuapp.com/signup',
    data: data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }
  //make api request to sign up with that email and password

    await axios(config)
    .then( async(res) =>{
      console.log(res.data)
      if(res.data.token){
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({
          type: "AUTH",
          payload: res.data.token
        });
    
        navigate('TrackList');
      }
    })
    .catch( err => {
      console.log(err)
      dispatch({
        type: "ADD_ERROR",
        payload: "Something went wrong with sign up, try again with another email"
      });
    })
     
    
  


};

const signin = dispatch => async ({ email, password }) => {

  dispatch({
    type: "SET_LOADING"
  })
  try {

    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "AUTH",
      payload: response.data.token
    });

    navigate('TrackList');




  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: "Something went wrong while signing in, please check you've enter correct  details"
    })

  }
};


const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "LOG_OUT"
  });
  navigate('loginFlow')

};


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signUp, signout, clearErrorMessage, AutoLogin },
  { token: null, errorMessage: "", isLoading: false }
);
