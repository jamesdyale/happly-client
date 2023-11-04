import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";
import { OnboardScreenOne } from "./OnboardScreenOne";
import { OnboardScreenTwo } from "./OnboardScreenTwo";
import { OnboardScreenThree } from "./OnboardScreenThree";
import { OnboardScreenFour } from "./OnboardScreenFour";
import { OnboardScreenFive } from "./OnboardScreenFive";

export const screens = [
  {
    id: 1,
    component: <OnboardScreenOne />
  },
  {
    id: 2,
    component: <OnboardScreenTwo />
  },
  {
    id: 3,
    component: <OnboardScreenThree />
  },
  {
    id: 4,
    component: <OnboardScreenFour />
  },
  {
    id: 5,
    component: <OnboardScreenFive />
  }
];
