import * as Location from 'expo-location';

const tenMeterWithDegress = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 1000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 3.3792 + increment * tenMeterWithDegress,
            latitude: 6.5244 + increment * tenMeterWithDegress
        }
    }
}

let counter = 0;

setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);

export default tenMeterWithDegress;