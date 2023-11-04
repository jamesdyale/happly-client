import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useSetAtom, useAtomValue } from "jotai";
import { useToast } from "react-native-toast-notifications";
import { Habit, HabitType, Stats, Streak } from "~types";
import { progressAtom, selectedDayOfTheWeekAtom, selectedHabitAtom } from "~state";
import { ActionCreateOrUpdateStreak, ActionGetStreakByHabitIdQuery } from "~actions";
import { APP_GRAY, APP_GREEN, APP_WHITE } from "~styles";
import { checkIfChallengeIsCompleted, getMessageRelatedToStreakData, horizontalScale, markHabitAsDone, moderateScale, verticalScale } from "~utils";
import { useTheme } from "~hooks";
import { onSnapshot } from "firebase/firestore";

type HabitCardType = {
  habit: Habit;
  progress: Stats[];
};

export const HabitCard = ({ habit, progress }: HabitCardType) => {
  const toast = useToast();
  const { theme } = useTheme();

  const setHabitSelected = useSetAtom(selectedHabitAtom);
  const setProgress = useSetAtom(progressAtom);
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);

  const foundProgress = progress.find((stat) => stat.habitId === habit.id);

  const [streakCountMessage, setStreakCountMessage] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getHabitStreak();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleHabitClick = () => {
    if (habit) {
      setHabitSelected(habit);
    }
  };

  const handleCompletedHabit = async () => {
    const { message, stat } = await markHabitAsDone({
      habit,
      selectedDay,
      isHabitCard: true
    });

    if (!stat) {
      toast.show(message, {
        type: "danger",
        duration: 4000,
        placement: "bottom",
        icon: <Icon name='alert-circle' size={moderateScale(20)} color={theme.APP_WHITE} />
      });
      return;
    }

    await ActionCreateOrUpdateStreak(habit.id, habit.userId);

    setProgress((prev) => [...prev, stat]);

    getHabitStreak();

    if (habit.type === HabitType.REGULAR) {
      toast.show(message, {
        type: "success",
        duration: 4000,
        placement: "bottom",
        icon: <Icon name='trending-up' size={moderateScale(20)} color={theme.APP_WHITE} />
      });
    } else {
      const data = await checkIfChallengeIsCompleted({
        challengeId: habit.challengeId,
        habitId: habit.id
      });
      if (!data) {
        toast.show("Having trouble check if you have completed your challenge. Please try again!", {
          type: "success",
          duration: 4000,
          placement: "bottom",
          icon: <Icon name='trending-up' size={moderateScale(20)} color={theme.APP_WHITE} />
        });
      } else {
        const { streakCount, challengeDuration } = data;
        if (streakCount >= challengeDuration) {
          toast.show("Woooohooooo you have completed the challenge", {
            type: "success",
            duration: 4000,
            placement: "bottom",
            icon: <Icon name='trending-up' size={moderateScale(20)} color={theme.APP_WHITE} />
          });
        } else {
          toast.show(`You rock. You have ${challengeDuration - streakCount} day(s) left to complete the challenge`, {
            type: "success",
            duration: 4000,
            placement: "bottom",
            icon: <Icon name='trending-up' size={moderateScale(20)} color={theme.APP_WHITE} />
          });
        }
      }
    }
  };

  const getHabitStreak = async () => {
    if (!habit) {
      return;
    }

    const streakQuery = ActionGetStreakByHabitIdQuery(habit.id);

    const unsubscribe = onSnapshot(streakQuery, (querySnapshot) => {
      const streaks: Streak[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as unknown as Streak;
        streaks.push(data);
      });

      const streakCountMessage = getMessageRelatedToStreakData(streaks[0]);
      setStreakCountMessage(streakCountMessage);
    });

    return () => unsubscribe();
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: verticalScale(80),
          borderRadius: moderateScale(10),
          marginBottom: verticalScale(20),
          paddingVertical: verticalScale(20),
          paddingHorizontal: horizontalScale(20)
        }
      ]}
    >
      <TouchableOpacity
        onPress={handleHabitClick}
        style={[
          styles.habitNameContainer,
          {
            marginBottom: verticalScale(5)
          }
        ]}
      >
        <Text
          style={[
            styles.habitName,
            {
              fontSize: moderateScale(14)
            }
          ]}
        >
          {habit.name}
        </Text>
        {streakCountMessage && streakCountMessage !== "" ? (
          <Text
            style={[
              styles.habitInfo,
              {
                fontSize: moderateScale(10),
                lineHeight: verticalScale(12)
              }
            ]}
          >
            {streakCountMessage}
          </Text>
        ) : (
          <Text
            style={[
              styles.habitInfo,
              {
                fontSize: moderateScale(10),
                lineHeight: verticalScale(12)
              }
            ]}
          >
            {habit.description}
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={[
          styles.habitProgressContainer,
          {
            width: 70,
            height: 70,
            borderRadius: 35
          }
        ]}
      >
        <View
          style={[
            styles.habitProgress,
            {
              width: horizontalScale(60),
              height: verticalScale(60),
              borderRadius: moderateScale(30)
            }
          ]}
        >
          {foundProgress ? (
            <View
              style={{
                width: horizontalScale(50),
                height: verticalScale(50),
                borderRadius: moderateScale(25),
                backgroundColor: APP_GREEN,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
              }}
            >
              <Icon name='checkmark-sharp' size={moderateScale(50)} color={APP_WHITE} />
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.habitProgressInner,
                {
                  width: horizontalScale(50),
                  height: verticalScale(50),
                  borderRadius: moderateScale(25)
                }
              ]}
              onPress={handleCompletedHabit}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: APP_GRAY
  },
  habitNameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%"
  },
  habitName: {
    fontWeight: "bold",
    color: "#000"
  },
  habitProgressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  habitInfo: {
    backgroundColor: APP_GRAY
  },
  habitProgress: {
    backgroundColor: APP_GREEN,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  habitProgressInner: {
    backgroundColor: APP_WHITE
  }
});
