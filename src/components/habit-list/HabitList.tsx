import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TimeOfDay } from "~types";
import { GetCurrentTimeOfDay } from "~utils/timeUtils";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";
import { HabitPeriod } from "./components/HabitPeriod";
import { HabitOfDay } from "./components/HabitOfDay";

export const HabitList = () => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale } = useMetric();
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDay>(
    TimeOfDay.All
  );

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
      <HabitPeriod currentTimeOfDay={currentTimeOfDay} />
      <HabitOfDay />
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
