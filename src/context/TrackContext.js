import createDataContext from './createDataContext';
import trackerApi from '../api/tracker'
import axios from 'axios'
import { AsyncStorage } from "react-native";
import { navigate } from '../navigationRef';


const trackReducer = (state, action)  => {
    switch (action.type) {
        case "FETCH_TRACKS":
            return action.payload;          s    
        default:
            return state;
    }
}



const fetchTracks = dispatch => async() => {
    const response = await trackerApi.get('/tracks');
    dispatch({
        type: "FETCH_TRACKS",
        payload: response.data
    })
}

const createTracks = dispatch => async (name, locations) => {
    await trackerApi.post('/tracks', { name, locations })
}

const deleteTracks = dispatch => async ( id ) => {
    const token = await AsyncStorage.getItem('token');
    const config = {
        method: 'delete',
        url: `https://simdanonline-tracksapp.herokuapp.com/tracks/${id}`,
        headers: { 'Authorization': 'Bearer ' + token },
      }
      await axios(config).then(() => {
        navigate('TrackList');
      })
      .catch((e) => {
          console.log(e.message)
      })
     
   
}

export const { Provider, Context } =  createDataContext(
    trackReducer,
    { fetchTracks, createTracks, deleteTracks },
    []
)