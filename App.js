import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { setNavigator, navigate } from "./src/navigationRef";
import EmptyScreen from "./src/screens/emptyScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { Provider as ProfileProvider } from "./src/context/ProfileContext";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Icon, Root } from "native-base";
import ForgotPassword from "./src/screens/ForgotPassword";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => {
  const signout = async () => {
    await AsyncStorage.removeItem("token");

    navigate("loginFlow");
  };

  const trackListFlow = createStackNavigator({
    TrackList: {
      screen: TrackListScreen,
      navigationOptions: {
        title: "My Tracks",
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={() => signout()}>
            <View style={{ marginRight: 20 }}>
              <AntDesign name="logout" size={20} color="white" />
            </View>
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: "#1C7ED7" },
        headerTitleAlign: "center",
        headerTitleStyle: { color: "white" },
      },
    },
    TrackDetails: {
      screen: TrackDetailScreen,
      navigationOptions: {
        title: "Track details",
      },
    },
  });

  trackListFlow.navigationOptions = {
    title: "My Tracks",
    tabBarIcon: <FontAwesome name="th-list" size={20} color="#ccc" />,
    tabBarOptions: {
      activeTintColor: "blue",
      activeBackgroundColor: "#1C7ED7",
      inactiveBackgroundColor: "#EFF7FD",
    },
  };

  const switchNavigator = createSwitchNavigator({
    Loader: EmptyScreen,
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      Signup: SignupScreen,
      forgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
          title: "Forgot Password",
        },
      },
    }),
    mainFlow: createBottomTabNavigator({
      Tracks: {
        screen: trackListFlow,
        navigationOptions: {
          headerShown: false,
        },
      },
      createTrack: {
        screen: TrackCreateScreen,
        navigationOptions: {
          //  title: "Add New Track",
          tabBarLabel: "Add New Track",
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-add" size={30} color="#ccc" />
          ),
          tabBarOptions: {
            activeBackgroundColor: "#1C7ED7",
            inactiveBackgroundColor: "#EFF7FD",
            activeTintColor: "blue",
            showIcon: true,
            showLabel: true,
            labelStyle: {
              fontSize: 12,
            },
            style: {
              backgroundColor: "white",
            },
          },
        },
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: {
          tabBarLabel: "My Account",
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="account" size={30} color="#ccc" />
          ),
          tabBarOptions: {
            activeTintColor: "blue",
            activeBackgroundColor: "#1C7ED7",
            inactiveBackgroundColor: "#EFF7FD",
            showIcon: true,
            showLabel: true,
            labelStyle: {
              fontSize: 12,
              fontWeight: "bold",
            },
            style: {
              backgroundColor: "white",
            },
          },
        },
      },
    }),
  });
  const App = createAppContainer(switchNavigator);

  return (
    <ProfileProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <Root>
              <App
                ref={(navigator) => {
                  setNavigator(navigator);
                }}
              />
            </Root>
          </AuthProvider>
        </LocationProvider>
      </TrackProvider>
    </ProfileProvider>
  );
};
