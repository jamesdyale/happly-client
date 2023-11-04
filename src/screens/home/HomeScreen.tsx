import { SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { HabitList, UserProfile, WeekCalendar } from "~components";
import { EditHabitModal } from "~modals";
import { dailyHabitsAtom, progressAtom, selectedDayOfTheWeekAtom, selectedTimeOfDayAtom, userAtom } from "~state";
import { Habit, Stats, User } from "~types";
import { ActionGetUserHabitsByUserId, ActionGetCompletedStatForDay } from "~actions";
import { onSnapshot } from "firebase/firestore";
import moment from "moment/moment";
import { useTheme } from "~hooks";
import { getData } from "~utils";
import { ASYNC_STORAGE_KEYS } from "~constants";

export const HomeScreen = () => {
  const timeOfDay = useAtomValue(selectedTimeOfDayAtom);
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);
  const user = useAtomValue(userAtom);
  const setDailyHabit = useSetAtom(dailyHabitsAtom);
  const setProgress = useSetAtom(progressAtom);

  const [loadingHabits, setLoadingHabits] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getCurrentDay();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getHabitsForTheDay();
      getCompletedHabitForDay();
    }

    return () => {
      isMounted = false;
    };
  }, [selectedDay, timeOfDay]);

  const getHabitsForTheDay = async () => {
    if (!user) {
      console.log("no user");
      return;
    }

    const dailyHabitsQuery = ActionGetUserHabitsByUserId(user.id, timeOfDay);

    const unsubscribe = onSnapshot(dailyHabitsQuery, (querySnapshot) => {
      const habits: Habit[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as unknown as Habit;
        if (moment(data.createdAt, "MMMM Do YYYY").isSameOrBefore(moment(selectedDay, "MMMM Do YYYY"), "day")) {
          if (data.frequencyOption === "Daily") {
            habits.push(data);
          } else if (data.frequencyOption === "Weekly") {
            if (data.selectedDays.includes(moment(selectedDay, "MMMM Do YYYY").format("dddd"))) {
              habits.push(data);
            }
          }
        }
      });

      setDailyHabit(habits);
      setLoadingHabits(false);
    });

    return () => unsubscribe();
  };

  const getCompletedHabitForDay = async () => {
    console.log("getCompletedHabitForDay");
    const userId = (await getData(ASYNC_STORAGE_KEYS.USER_ID)) as User["id"];

    if (!userId) {
      console.log("no user");
      return;
    }

    const completedHabitQuery = ActionGetCompletedStatForDay(userId, selectedDay);

    const unsubscribe = onSnapshot(completedHabitQuery, (querySnapshot) => {
      const progress: Stats[] = [];
      progress.filter(() => {
        return false;
      });

      querySnapshot.forEach((doc) => {
        const data = doc.data() as unknown as Stats;
        progress.push(data);
      });

      setProgress(progress);
      setLoadingStats(false);
    });

    return () => unsubscribe();
  };

  const getCurrentDay = () => {
    console.log("getCurrentDay");
    const today = moment().format("dddd");
    console.log(today);
  };

  if (loadingHabits && loadingStats) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.MAIN_BG_COLOR }}>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.MAIN_BG_COLOR }}>
      <UserProfile />
      <WeekCalendar />
      <HabitList />
      <EditHabitModal />
    </SafeAreaView>
  );
};
