import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import { findClosestReminder } from "~utils/timeUtils";

export const ClosestReminder = ({ habit }) => {
  const { theme } = useTheme();

  return (
    <View>
      <Text
        style={[
          styles.closestReminderLabel,
          {
            color: theme.MAIN_TEXT_COLOR
          }
        ]}
      >
        Closest Remind:
      </Text>
      <Text
        style={[
          styles.reminderAt_Text,
          {
            color: theme.MAIN_TEXT_COLOR
          }
        ]}
      >
        {habit?.reminderAt.length > 0 && findClosestReminder(habit?.reminderAt)}
        {habit?.reminderAt.length < 1 && "None"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  closestReminderLabel: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center"
  },
  reminderAt_Text: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center"
  }
});
