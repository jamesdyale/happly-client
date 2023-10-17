import "react-native-gesture-handler";
import { ROUTES } from "~constants";
import { SettingsScreen } from "~screens";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

export const SettingStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
