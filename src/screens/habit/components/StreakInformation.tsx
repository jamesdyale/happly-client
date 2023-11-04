import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";

export const StreakInformation = ({ streak }) => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <View style={styles.streakVSLongestStreak}>
      <View>
        <Text
          style={[
            styles.streakDay,
            {
              color: theme.MAIN_ACCENT_COLOR,
              fontSize: verticalScale(40),
              lineHeight: verticalScale(48)
            }
          ]}
        >
          {streak?.count} {streak?.count > 1 ? "DAYS" : "DAY"}
        </Text>
        <Text
          style={[
            styles.streakLabel,
            {
              color: theme.MAIN_ACCENT_COLOR,
              fontSize: moderateScale(14),
              lineHeight: verticalScale(17)
            }
          ]}
        >
          Your Current Streak
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.longestStreak,
            {
              color: theme.MAIN_ACCENT_COLOR,
              fontSize: moderateScale(12),
              lineHeight: verticalScale(15)
            }
          ]}
        >
          {streak?.longestStreak} {streak?.longestStreak > 1 ? "days" : "day"}
        </Text>
        <Text
          style={[
            styles.longestStreakLabel,
            {
              color: theme.MAIN_ACCENT_COLOR,
              fontSize: moderateScale(12),
              lineHeight: verticalScale(15)
            }
          ]}
        >
          Your longest streak
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  streakVSLongestStreak: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  streakDay: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500"
  },
  streakLabel: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    opacity: 0.7
  },
  longestStreak: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500"
  },
  longestStreakLabel: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    opacity: 0.7
  }
});
