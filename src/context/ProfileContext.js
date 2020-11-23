import createDataContext from './createDataContext';
import axios from 'axios'
import { AsyncStorage } from "react-native";



const ProfileReducer = (state, action) => {
    switch (action.type) {
    
    
        case "FETCH_USER":
            return action.payload;
            
        default:
            return state;
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({
      type: "CLEAR_ERROR"
    });
  }

const loggedin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
        method: 'get',
        url: ' https://simdanonline-tracksapp.herokuapp.com/users/me',
        headers: { 'Authorization': 'Bearer ' + token },
      }
     // console.log(config)
       await axios(config)
       .then(res => {
        // console.log(res)
            dispatch({
              type: "FETCH_USER",
              payload: res.data
            })
          })
          .catch(err => console.log(err))
  }


export const { Provider, Context} = createDataContext(
    ProfileReducer,
    { loggedin},
   []
)