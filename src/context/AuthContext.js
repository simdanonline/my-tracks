import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import axios from "axios";
import { Toast } from "native-base";
import { displayError, getErrm } from "../Constants/misc";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload, isLoading: false };
    case "AUTH":
      return { errorMessage: "", token: action.payload, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: "" };
    case "LOG_OUT":
      return { token: "", errorMessage: "" };
    case "SET_LOADING":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "CLEAR_ERROR",
  });
};

const AutoLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "AUTH",
    });
    navigate("TrackList");
  } else {
    navigate("Signin");
  }
};

const signUp = (dispatch) => async ({
  email,
  password,
  name,
  phone,
  avatar,
}) => {
  dispatch({
    type: "SET_LOADING",
  });

  console.log(avatar);

  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("phone", phone);
  data.append("password", password);
  data.append("avatar", {
    type: "image/jpg",
    uri: avatar,
    name: "profilepic.jpg",
  });

  const config = {
    method: "post",
    url: "https://simdanonline-tracksapp.herokuapp.com/users/",
    data: data,
  };
  console.log(config);
  await axios(config)
    .then(async (res) => {
      console.log(res.data);
      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        await dispatch({
          type: "AUTH",
          payload: res.data.token,
        });
        navigate("TrackList");
      }
    })
    .catch((err) => {
      displayError(err)
      console.log(err.message);
      const errm = getErrm()
      dispatch({
        type: "ADD_ERROR",
        payload:
          errm,
      });
    });
  //make api request to sign up with that email and password
};

const signin = (dispatch) => async ({ email, password }) => {
  dispatch({
    type: "SET_LOADING",
  });
  try {
    const response = await trackerApi.post("/login", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "AUTH",
      payload: response.data.token,
    });

    navigate("TrackList");
  } catch (err) {
    let errm = err.message;
    if (err.response) {
      if (err.response.data) {
        if (err.response.data.error) {
          errm = err.response.data.error;
        }
      }
    }
    Toast.show({
      type: "danger",
      text: errm,
      duration: 3500,
    });
    dispatch({
      type: "ADD_ERROR",
      payload:
        errm,
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "LOG_OUT",
  });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signUp, signout, clearErrorMessage, AutoLogin },
  { token: null, errorMessage: "", isLoading: false }
);
