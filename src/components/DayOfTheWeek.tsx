import { StyleSheet, Text, TouchableOpacity } from "react-native";
import moment from "moment/moment";
import { WeeklyCalendarDateType } from "~types";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

interface IDayOfTheWeek {
  day: WeeklyCalendarDateType;
  selectedDay: string;
  handleDayClick: (day: string) => void;
}

export const DayOfTheWeek = (props: IDayOfTheWeek) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const { day, handleDayClick, selectedDay } = props;
  const isSelected = day.date === selectedDay;
  const dayNumber = moment(day.date, "MMMM Do YYYY");

  return (
    <TouchableOpacity
      onPress={() => handleDayClick(day.date)}
      style={[
        styles.day,
        {
          backgroundColor: isSelected ? theme.MAIN_ACCENT_COLOR : theme.APP_WHITE,
          borderColor: isSelected ? theme.MAIN_ACCENT_COLOR : theme.APP_GRAY,
          borderRadius: moderateScale(10),
          width: horizontalScale(42),
          paddingTop: verticalScale(10),
          paddingBottom: verticalScale(10),
          paddingRight: horizontalScale(10),
          paddingLeft: horizontalScale(10)
        }
      ]}
    >
      <Text
        style={[
          styles.dayText,
          { fontSize: moderateScale(9), color: isSelected ? theme.APP_WHITE : theme.HABIT_OPTION }
        ]}
      >
        {day.day}
      </Text>
      <Text
        style={[
          styles.dayNumber,
          { fontSize: moderateScale(15), color: isSelected ? theme.APP_WHITE : theme.HABIT_OPTION }
        ]}
      >
        {moment(dayNumber).format("D")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  dayText: {
    fontFamily: "Inter_400Regular"
  },
  dayNumber: {
    fontFamily: "Inter_700Bold"
  }
});
