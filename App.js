import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import CameraScreen from "./screens/CameraScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    CameraScreen: { screen: CameraScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#b83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
