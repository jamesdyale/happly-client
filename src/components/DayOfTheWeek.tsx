import { StyleSheet, Text, TouchableOpacity } from "react-native";
import moment from "moment/moment";
import { WeeklyCalendarDateType } from "~types";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

interface IDayOfTheWeek {
  day: WeeklyCalendarDateType;
  selectedDay: string;
  handleDayClick: (day: string) => void;
}

export const DayOfTheWeek = (props: IDayOfTheWeek) => {
  const { theme } = useTheme();

  const { day, handleDayClick, selectedDay } = props;
  const isSelected = day.date === selectedDay;
  const dayNumber = moment(day.date, "MMMM Do YYYY");

  return (
    <TouchableOpacity
      onPress={() => handleDayClick(day.date)}
      style={[
        styles.day,
        {
          backgroundColor: isSelected
            ? theme.MAIN_ACCENT_COLOR
            : theme.APP_WHITE,
          borderColor: isSelected ? theme.MAIN_ACCENT_COLOR : theme.APP_GRAY
        }
      ]}
    >
      <Text
        style={[
          styles.dayText,
          { color: isSelected ? theme.APP_WHITE : theme.HABIT_OPTION }
        ]}
      >
        {day.day}
      </Text>
      <Text
        style={[
          styles.dayNumber,
          { color: isSelected ? theme.APP_WHITE : theme.HABIT_OPTION }
        ]}
      >
        {moment(dayNumber).format("D")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    width: horizontalScale(42),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
    borderWidth: 1,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    paddingRight: horizontalScale(10),
    paddingLeft: horizontalScale(10)
  },
  dayText: {
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(9)
  },
  dayNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: moderateScale(15)
  }
});
