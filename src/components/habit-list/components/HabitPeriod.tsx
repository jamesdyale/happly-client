import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { selectedTimeOfDayAtom } from "~state";
import Icon from "react-native-vector-icons/Ionicons";
import { TimeOfDay } from "~types";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";

export const HabitPeriod = ({ currentTimeOfDay }: { currentTimeOfDay: TimeOfDay }) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom);

  return (
    <View
      style={[
        styles.periodContainer,
        {
          marginBottom: verticalScale(20)
        }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.periodOption,
          {
            backgroundColor: timeOfDay === TimeOfDay.All ? theme.APP_BLUE : theme.APP_GRAY,
            borderRadius: moderateScale(10),
            height: verticalScale(40)
          }
        ]}
        onPress={() => setTimeOfDay(TimeOfDay.All)}
      >
        <Icon
          name='file-tray-full-sharp'
          size={moderateScale(18)}
          color={timeOfDay === TimeOfDay.All ? theme.APP_WHITE : theme.APP_BLACK}
          style={{ marginRight: horizontalScale(8) }}
        />
        <Text
          style={[
            styles.periodOptionTitle,
            {
              color: timeOfDay === TimeOfDay.All ? theme.APP_WHITE : theme.APP_BLACK,
              fontSize: moderateScale(14),
              lineHeight: verticalScale(22)
            }
          ]}
        >
          All Habits
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.periodOption,
          {
            backgroundColor: timeOfDay === currentTimeOfDay ? theme.APP_BLUE : theme.APP_GRAY,
            borderRadius: moderateScale(10)
          }
        ]}
        onPress={() => setTimeOfDay(currentTimeOfDay)}
      >
        <Icon
          name={currentTimeOfDay === TimeOfDay.Morning ? "ios-partly-sunny-sharp" : currentTimeOfDay === TimeOfDay.Afternoon ? "ios-sunny-sharp" : "ios-moon-sharp"}
          size={moderateScale(15)}
          color={timeOfDay === currentTimeOfDay ? theme.APP_WHITE : theme.APP_BLACK}
          style={{ marginRight: horizontalScale(8) }}
        />
        <Text
          style={[
            styles.periodOptionTitle,
            {
              color: timeOfDay === currentTimeOfDay ? theme.APP_WHITE : theme.APP_BLACK,
              fontSize: moderateScale(14),
              lineHeight: verticalScale(22)
            }
          ]}
        >
          {currentTimeOfDay}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  periodContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  periodOption: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  periodOptionTitle: {
    fontFamily: "Inter_600SemiBold"
  }
});
