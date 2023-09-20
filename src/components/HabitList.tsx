import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { NoHabitIcon } from "~assets";
import { dailyHabitsAtom, progressAtom, selectedTimeOfDayAtom } from "~state";
import { CustomProgressBar } from "./CustomProgressBar";
import { HabitCard } from "./HabitCard";
import Icon from "react-native-vector-icons/Ionicons";
import { TimeOfDay } from "~types";
import { GetCurrentTimeOfDay } from "~utils/timeUtils";
import { percentage, useMetric } from "~utils";
import { useTheme } from "~hooks";

export const HabitList = () => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const dailyHabit = useAtomValue(dailyHabitsAtom);
  const progress = useAtomValue(progressAtom);
  const [timeOfDay, setTimeOfDay] = useAtom(selectedTimeOfDayAtom);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDay>(TimeOfDay.All);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setCurrentTimeOfDay(GetCurrentTimeOfDay());
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: verticalScale(20),
          paddingLeft: horizontalScale(20),
          paddingRight: horizontalScale(20),
          paddingBottom: verticalScale(20),
          backgroundColor: theme.MAIN_BG_COLOR
        }
      ]}
    >
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
            name={
              currentTimeOfDay === TimeOfDay.Morning
                ? "ios-partly-sunny-sharp"
                : currentTimeOfDay === TimeOfDay.Afternoon
                ? "ios-sunny-sharp"
                : "ios-moon-sharp"
            }
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

      {dailyHabit.length === 0 && (
        <View style={styles.noHabitIconContainer}>
          <View
            style={{
              marginTop: verticalScale(80),
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <NoHabitIcon />
            <View style={{ marginTop: verticalScale(20) }}>
              <Text
                style={[
                  styles.noHabitMessage,
                  {
                    color: theme.HABIT_OPTION,
                    fontSize: moderateScale(12),
                    lineHeight: verticalScale(15)
                  }
                ]}
              >
                “The most important step of all is the first step”{" "}
              </Text>
              <Text
                style={[
                  styles.noHabitMessageMessenger,
                  {
                    color: theme.MAIN_ACCENT_COLOR,
                    fontSize: moderateScale(10),
                    lineHeight: verticalScale(12),
                    marginTop: verticalScale(10)
                  }
                ]}
              >
                – Blake Mycoskie
              </Text>
            </View>
          </View>
        </View>
      )}

      {dailyHabit.length > 0 && (
        <>
          <View
            style={{
              borderBottomWidth: 1,
              marginBottom: verticalScale(15),
              borderBottomColor: theme.APP_GRAY,
              paddingBottom: verticalScale(15)
            }}
          >
            <CustomProgressBar progress={percentage(progress, dailyHabit)} />
          </View>
          <ScrollView style={{ marginBottom: verticalScale(40) }}>
            {dailyHabit.map((habit) => (
              <HabitCard key={habit.id} habit={habit} progress={progress} />
            ))}
          </ScrollView>
        </>
      )}
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
  noHabitIconContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%"
  },
  noHabitMessage: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    textAlign: "center",
    opacity: 0.5
  },
  noHabitMessageMessenger: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "right",
    opacity: 0.5
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
