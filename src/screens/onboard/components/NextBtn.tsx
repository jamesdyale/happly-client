import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";
import { screens } from "./ListOfScreens";

export const NextBtn = ({ handleNext, currentScreen }) => {
  const { theme } = useTheme();
  const { moderateScale } = useMetric();

  return (
    <TouchableOpacity onPress={handleNext}>
      <Text
        style={[
          styles.OnboardInformation_ActionBtn_NextBtn,
          {
            color: theme.MAIN_ACCENT_COLOR,
            fontSize: moderateScale(13),
            lineHeight: moderateScale(16)
          }
        ]}
      >
        {currentScreen < screens.length - 1 ? "Next" : "Get Started"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  OnboardInformation_ActionBtn_NextBtn: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600"
  }
});
