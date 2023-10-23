import { View, Text, StyleSheet } from "react-native";
import { selectedDayOfTheWeekAtom } from "~state";
import moment from "moment/moment";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";
import { useAtomValue } from "jotai";

export const MonthAndYear = () => {
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);
  const monthNumber = moment(selectedDay, "MMMM Do YYYY").month();
  const year = moment(selectedDay, "MMMM Do YYYY").year();
  const month = moment.months(monthNumber);
  const { horizontalScale, moderateScale, verticalScale } = useMetric();
  const { theme } = useTheme();

  return (
    <View
      style={{
        paddingLeft: horizontalScale(20),
        paddingBottom: verticalScale(10)
      }}
    >
      <Text
        style={[
          styles.monthAndYearText,
          {
            color: theme.MAIN_TEXT_COLOR_2,
            fontSize: moderateScale(15),
            lineHeight: moderateScale(19),
            marginRight: horizontalScale(5)
          }
        ]}
      >
        {month} {year}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  monthAndYearText: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    opacity: 0.5
  }
});
