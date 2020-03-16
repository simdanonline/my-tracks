import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
    switch (action.type) {
    
    
        case "ADD_CURRENT_LOCATION":
            return{  ...state, currentLocation: action.payload};
        case "START_RECORDING":
            return { ...state, recording: true}
        case "STOP_RECORDING":
            return { ...state, recording: false}
        case "ADD_LOCATION":
            return { ...state, locations:[...state.locations, action.payload] }
        case "NAME":
            return { ...state, name: action.payload }
        case "RESET":
            return {...state, name: '', locations: [] }
            
        default:
            return state;
    }
}

const changeName = dispatch => (name) => {
    dispatch({
        type: "NAME",
        payload: name
    })
}

const reset = dispatch => () =>{
    dispatch({
        type: "RESET"
    })
}


const startRecording = dispatch => () => {
    dispatch({
        type: "START_RECORDING"
    })
}

const stopRecording = dispatch => () =>{
    dispatch({
        type: "STOP_RECORDING"
    })
}

const addLocation = dispatch => (location, recording) => {
    dispatch({
        type: "ADD_CURRENT_LOCATION",
        payload: location
    })
    if(recording){
        dispatch({
            type: "ADD_LOCATION",
            payload: location
        })
    }
}


const deleteLocation = dispatch => () => {
    dispatch({
        type: "DELETE_LOCATION"
    })
}


export const { Context, Provider} = createDataContext(
    locationReducer,
    { changeName, startRecording, stopRecording, addLocation, reset, deleteLocation },
    { name: '', recording: false, locations: [], currentLocation: null }
)