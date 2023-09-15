import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Habit } from "~types";
import { getLast7Days, horizontalScale, moderateScale, verticalScale } from "~utils";
import { APP_BLACK } from "~styles";
import { ROUTES } from "~constants";
import { CalendarStreakWeek } from "~components/CalendarStreakWeek";
import { useSetAtom } from "jotai";
import { selectedHabitAtom } from "~state";
import { useTheme } from "~hooks";

export const CalendarWeekView = ({ habit }: { habit: Habit }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const setSelectedHabit = useSetAtom(selectedHabitAtom);

  const week = getLast7Days().reverse();

  const handleNavigationToHabitScreen = () => {
    setSelectedHabit(habit);
    navigate(ROUTES.HABIT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.habitTitleContainer}>
        <View>
          <Text
            style={[
              styles.title,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            {habit.name}
          </Text>
          {/* TODO: Add label for frequency later in the future */}
          {/*<View style={styles.labelContainer}>*/}
          {/*  <Text style={styles.label}>Everyday</Text>*/}
          {/*</View>*/}
        </View>
        <Icon
          name='calendar-outline'
          size={moderateScale(25)}
          color={theme.MAIN_TEXT_COLOR}
          onPress={handleNavigationToHabitScreen}
        />
      </View>
      <View style={styles.footer}>
        {week.map((day, index) => {
          return <CalendarStreakWeek key={index} day={day} habitId={habit.id} />;
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(35)
  },
  habitTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10)
  },

  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: moderateScale(14),
    lineHeight: verticalScale(18)
  },
  labelContainer: {
    paddingVertical: verticalScale(2),
    paddingHorizontal: horizontalScale(4),
    backgroundColor: "#FDE3FF",
    borderRadius: moderateScale(4),
    marginTop: verticalScale(5)
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: moderateScale(10),
    lineHeight: verticalScale(15),
    color: APP_BLACK
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
