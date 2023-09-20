import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { DayOfTheWeek } from "~types";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

type DayPickerType = {
  selectedDays: string[];
  handleSelectDay: (day: string) => void;
};

export const DayPicker = ({ selectedDays, handleSelectDay }: DayPickerType) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const days = Object.keys(DayOfTheWeek);

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: verticalScale(5),
          paddingHorizontal: horizontalScale(5)
        }
      ]}
    >
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.day,
            {
              borderWidth: moderateScale(1),
              borderRadius: moderateScale(6),
              width: horizontalScale(40),
              height: verticalScale(40),
              backgroundColor: selectedDays.includes(day)
                ? theme.MAIN_TEXT_COLOR
                : theme.HABIT_OPTION,
              borderColor: selectedDays.includes(day) ? theme.MAIN_TEXT_COLOR : theme.HABIT_OPTION
            }
          ]}
          onPress={() => handleSelectDay(day)}
        >
          <Text
            style={{
              color: selectedDays.includes(day) ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.APP_GRAY
            }}
          >
            {day.substring(0, 3)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  day: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
