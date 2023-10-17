import "react-native-gesture-handler";
import { ROUTES } from "~constants";
import { HomeScreen, SettingsScreen } from "~screens";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

export const HomeStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={ROUTES.MAIN_HOME} component={HomeScreen} />
      <Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Navigator>
  );
};
