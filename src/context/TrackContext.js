import createDataContext from './createDataContext';
import trackerApi from '../api/tracker'


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

const deleteTracks = dispatch => async ( name, locations ) => {
    await trackerApi.put('/tracks/_id', { name, locations })
}

export const { Provider, Context } =  createDataContext(
    trackReducer,
    { fetchTracks, createTracks, deleteTracks },
    []
)