import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator, BottomTabBar  } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider}  from './src/context/AuthContext';
import {setNavigator } from './src/navigationRef';
import EmptyScreen from './src/screens/emptyScreen'
import Ionicons from "@expo/vector-icons/Ionicons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Provider as LocationProvider }  from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext'
import { FontAwesome } from '@expo/vector-icons'



const TabBarComponent = props => <BottomTabBar {...props} />;

const trackListFlow = createStackNavigator({
  TrackList: {
    screen: TrackListScreen,
    navigationOptions: {
      title: "My Tracks"
    },
  },
  TrackDetails: {
    screen: TrackDetailScreen,
    navigationOptions: {
      title: "Track details"
    },
  }
})

trackListFlow.navigationOptions = {
  title: "My Tracks",
  tabBarIcon: <FontAwesome name="th-list" size={20} />,
  tabBarOptions: {
    activeTintColor: 'blue',
    
    }
}

const switchNavigator = createSwitchNavigator({
  Loader: EmptyScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
    
  }),
  mainFlow: createBottomTabNavigator({
    Tracks: trackListFlow,
    createTrack:  {
      screen: TrackCreateScreen,
      navigationOptions: {
      //  title: "Add New Track",
        tabBarLabel:"Add New Track",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={30} color="blue" />
        ),
        tabBarOptions: {
          activeTintColor: 'blue',
          showIcon: true,
          showLabel: true,
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: 'white',
          },
        }
      },
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarLabel:"My Account",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="account" size={30} color="blue" />
        ),
        tabBarOptions: {
          activeTintColor: 'blue',
          showIcon: true,
          showLabel: true,
          labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: 'white',
          },
        }
      },
    },
  })


});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const App= createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => {setNavigator(navigator)}} />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
    
  )
}
