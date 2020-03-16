import {useContext} from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context  as LocationContext} from '../context/LocationContext';
import { Context as AuthContext } from '../context/AuthContext';
import { navigate } from '../navigationRef';

export default () => {
    const  { deleteTracks } = useContext(TrackContext)
    const { state: {locations, name}  } = useContext(LocationContext)

    const deleteTrack = async() => {
       await deleteTracks(name, locations);
       navigate('TrackList')
    }

    return [deleteTrack]
}