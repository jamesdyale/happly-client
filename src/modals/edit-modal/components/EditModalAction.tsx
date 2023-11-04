import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useAtom, useSetAtom } from "jotai";
import { editHabitAtom, loadingAtom, progressAtom, selectedDayOfTheWeekAtom, selectedHabitAtom, showDeleteModalAtom, userAtom } from "~state";
import { APP_WHITE } from "~styles";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActionGetUserHabitById, ActionDeleteHabitById, ActionDeleteStatsById, ActionDeleteStreakByHabitId, ActionDeleteRemindersByHabitId, ActionCreateUser } from "~actions";
import { useAtomValue } from "jotai";
import { HabitType } from "~types";
import { useTheme } from "~hooks";
import { checkIfChallengeIsCompleted, horizontalScale, markHabitAsDone, moderateScale, removeAUserFromAChallenge, verticalScale } from "~utils";
import { ROUTES } from "~constants";
import momentTime from "moment-timezone";

export const EditModalAction = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const { theme } = useTheme();

  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const setEditHabit = useSetAtom(editHabitAtom);
  const setDeleteModal = useSetAtom(showDeleteModalAtom);
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [user, setUser] = useAtom(userAtom);

  const deleteHabit = async () => {
    setLoading(true);

    const dataDocumentSnapshot = await ActionGetUserHabitById(habitSelected.id);

    if (dataDocumentSnapshot.exists()) {
      try {
        const habitStat = progress.find((stat) => stat.habitId === habitSelected.id);

        if (habitStat) {
          await ActionDeleteStatsById(habitStat.id);
          setProgress((prev) => prev.filter((stat) => stat.id !== habitStat.id));
        }

        await ActionDeleteStreakByHabitId(habitSelected.id);

        await ActionDeleteRemindersByHabitId(habitSelected.id);

        await ActionDeleteHabitById(habitSelected.id);

        if (habitSelected.type === HabitType.CHALLENGE) {
          await removeAUserFromAChallenge(habitSelected.challengeId, habitSelected.userId);
        }

        setSelectedHabit(null);
        setDeleteModal(false);

        toast.show("Habit Deleted", {
          type: "danger",
          duration: 4000,
          placement: "bottom",
          icon: <Icon name='trash' size={moderateScale(20)} color={APP_WHITE} />
        });
      } catch (e) {
        toast.show("An error happened when deleting your habit. Please try again!", {
          type: "danger",
          duration: 4000,
          placement: "bottom",
          icon: <Icon name='alert-circle' size={moderateScale(20)} color={APP_WHITE} />
        });
      } finally {
        setLoading(false);
      }
    }

    setLoading(false);
    setSelectedHabit(null);
  };

  const handleOnPressDelete = () => {
    Alert.alert(
      "",
      "Are you sure you want to delete this habit?",
      [
        {
          text: "Yes",
          onPress: () => deleteHabit(),
          style: "destructive"
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const handleOnPressEdit = () => {
    setEditHabit(habitSelected);
    setSelectedHabit(null);
    navigate(ROUTES.CREATE_HABIT);
  };

  const handleOnPressMarkAsDone = async () => {
    setLoading(true);

    const userTimezone = momentTime.tz.guess();

    if (user && !user.timezone) {
      const updatedUser = {
        ...user,
        timezone: userTimezone
      };

      await ActionCreateUser(updatedUser, updatedUser.id);
      setUser(updatedUser);
    }

    const { message, stat } = await markHabitAsDone({
      habit: habitSelected,
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
    if (habitSelected.type === HabitType.REGULAR) {
      toast.show(message, {
        type: "success",
        duration: 4000,
        placement: "bottom",
        icon: <Icon name='trending-up' size={moderateScale(20)} color={theme.APP_WHITE} />
      });
    } else {
      const data = await checkIfChallengeIsCompleted({
        challengeId: habitSelected.challengeId,
        habitId: habitSelected.id
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
          toast.show("Woooohhooooo you have completed the challenge", {
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

    setLoading(false);
  };

  return (
    <View style={styles.actionSection}>
      <TouchableOpacity style={styles.actionSectionButton} onPress={handleOnPressDelete}>
        <Icon name='trash' size={moderateScale(25)} color={theme.MAIN_TEXT_COLOR} />
        <Text
          style={[
            styles.infoText,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          Delete
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionSectionButton} onPress={handleOnPressEdit}>
        <Icon name='create-outline' size={moderateScale(25)} color={theme.MAIN_TEXT_COLOR} />
        <Text
          style={[
            styles.infoText,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionSectionButton} onPress={handleOnPressMarkAsDone}>
        <Icon name='checkbox-outline' size={moderateScale(25)} color={theme.MAIN_TEXT_COLOR} />
        <Text
          style={[
            styles.infoText,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          Mark as done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10)
  },
  actionSectionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(100)
  },
  infoText: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(15),
    marginTop: verticalScale(3)
  },
  icon: {
    marginRight: horizontalScale(15)
  }
});
