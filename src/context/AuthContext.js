import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "AUTH":
      return { errorMessage: "", token: action.payload };
      case "CLEAR_ERROR":
          return {...state, errorMessage: ""}
      case "LOG_OUT":
        return { token: "", errorMessage: ""}
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () =>{
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

const signUp = dispatch => async ({ email, password }) => {
  //make api request to sign up with that email and password
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "AUTH",
      payload: response.data.token
    });

    navigate('TrackList');

    // await AsyncStorage.getItem("token");
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: "Something went wrong with sign up, try again with another email"
    });
  }


};

const signin = dispatch => async ({ email, password }) => {
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


const signout = dispatch => async() => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "LOG_OUT"
  });
  navigate('loginFlow')
    
  };


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signUp, signout, clearErrorMessage, AutoLogin },
  { token: null, errorMessage: "" }
);
