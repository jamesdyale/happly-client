import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAtomValue } from "jotai";
import { NoHabitIcon } from "~assets";
import { dailyHabitsAtom, progressAtom } from "~state";
import { percentage, useMetric } from "~utils";
import { useTheme } from "~hooks";
import { CustomProgressBar } from "~components/CustomProgressBar";
import { HabitCard } from "~components/HabitCard";

export const HabitOfDay = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  const dailyHabit = useAtomValue(dailyHabitsAtom);
  const progress = useAtomValue(progressAtom);

  return (
    <>
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
    </>
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
  }
});
