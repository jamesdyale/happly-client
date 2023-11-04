import { Dimensions, Text, View, StyleSheet } from "react-native";
import React from "react";
import { OnboardScreenFiveIcon } from "~assets";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

const { width } = Dimensions.get("window");

export const OnboardScreenFive = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <>
      <View
        style={[
          styles.OnboardScreen_Icon,
          {
            marginBottom: verticalScale(50)
          }
        ]}
      >
        <OnboardScreenFiveIcon />
      </View>

      <View style={styles.OnboardInformation}>
        <Text
          style={[
            styles.OnboardInformation_Title,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(30) : moderateScale(25),
              lineHeight: width === 820 ? verticalScale(60) : verticalScale(55),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          Feeling motivated already?
        </Text>
        <Text
          style={[
            styles.OnboardInformation_Text,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(16) : moderateScale(16),
              lineHeight: moderateScale(24),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          “If you get better 1% every day for one year you will end up 37 times better by the time you are done”
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  OnboardScreen_Container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  OnboardScreen_Icon: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    height: "50%",
    paddingTop: 50
  },
  OnboardInformation: {},
  OnboardInformation_Title: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",

    textAlign: "center"
  },
  OnboardInformation_Text: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center"
  },
  OnboardInformation_ActionBtn_NextBtn: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600"
  }
});
