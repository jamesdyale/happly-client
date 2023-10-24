import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { selectedHabitAtom } from "~state";
import { APP_WHITE, MAIN_ACCENT_COLOR } from "~styles";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { findClosestReminder } from "~utils/timeUtils";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const EditModalTitle = () => {
  const { theme } = useTheme();

  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom);

  const handleOnPressCloseIcon = () => {
    setSelectedHabit(null);
  };

  return (
    <View style={styles.titleSection}>
      <View>
        <Text
          style={[
            styles.habitTitle,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          {habitSelected.name}
        </Text>
        <Text
          style={[
            styles.highlightText,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          {habitSelected.reminderAt.length > 0 &&
            `Closest Reminder is at ${findClosestReminder(
              habitSelected.reminderAt
            )}`}
          {habitSelected.reminderAt.length < 1 && "No Reminders Set"}
        </Text>
      </View>
      <TouchableOpacity onPress={handleOnPressCloseIcon}>
        <Icon
          style={styles.closeIcon}
          name='close'
          size={moderateScale(25)}
          color={theme.MAIN_TEXT_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    paddingBottom: verticalScale(15)
  },
  actionSectionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(100)
  },
  habitTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(3)
  },
  highlightText: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(10),
    lineHeight: verticalScale(12)
  },
  closeIcon: {
    backgroundColor: MAIN_ACCENT_COLOR,
    width: horizontalScale(30),
    height: verticalScale(30),
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    paddingLeft: horizontalScale(2),
    paddingRight: horizontalScale(2),
    display: "flex",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(15),
    color: APP_WHITE
  }
});
