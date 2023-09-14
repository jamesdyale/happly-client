import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Modal from "react-native-modal";
import { useAtom, useSetAtom } from "jotai";
import {
  editHabitAtom,
  loadingAtom,
  progressAtom,
  selectedDayOfTheWeekAtom,
  selectedHabitAtom,
  showDeleteModalAtom
} from "~state";
import { APP_WHITE, MAIN_ACCENT_COLOR } from "~styles";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { ROUTES } from "../constants";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ActionGetUserHabitById,
  ActionDeleteHabitById,
  ActionDeleteStatsById,
  ActionDeleteStreakByHabitId,
  ActionDeleteRemindersByHabitId
} from "~actions";
import moment from "moment/moment";
import { findClosestReminder } from "~utils/timeUtils";
import { useAtomValue } from "jotai";
import { HabitType } from "~types";
import { useTheme } from "~hooks";
import {
  checkIfChallengeIsCompleted,
  horizontalScale,
  markHabitAsDone,
  moderateScale,
  removeAUserFromAChallenge,
  verticalScale
} from "~utils";

export const EditHabitModal = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast();
  const { theme } = useTheme();

  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const setEditHabit = useSetAtom(editHabitAtom);
  const setDeleteModal = useSetAtom(showDeleteModalAtom);
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);

  const setLoading = useSetAtom(loadingAtom);

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

  const handleOnPressCloseIcon = () => {
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

  if (habitSelected === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={!!habitSelected}
        key={habitSelected.id}
        style={{ padding: 0, margin: 0 }}
        onBackdropPress={() => setSelectedHabit(null)}
        hideModalContentWhileAnimating={true}
      >
        <SafeAreaView
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            alignItems: "center"
          }}
        >
          <View
            style={[
              styles.bodySectionContainer,
              {
                backgroundColor: theme.MAIN_BG_COLOR
              }
            ]}
          >
            <View style={styles.titleSection}>
              <View>
                <Text
                  style={[
                    styles.habitTitle,
                    {
                      color: theme.MAIN_TEXT_COLOR
                    }
                  ]}
                >
                  {habitSelected.name}
                </Text>
                <Text
                  style={[
                    styles.highlightText,
                    {
                      color: theme.MAIN_TEXT_COLOR
                    }
                  ]}
                >
                  {habitSelected.reminderAt.length > 0 &&
                    `Closest Reminder is at ${findClosestReminder(habitSelected.reminderAt)}`}
                  {habitSelected.reminderAt.length < 1 && "No Reminders Set"}
                </Text>
              </View>
              <TouchableOpacity onPress={handleOnPressCloseIcon}>
                <Icon style={styles.closeIcon} name='close' size={moderateScale(25)} color={theme.MAIN_TEXT_COLOR} />
              </TouchableOpacity>
            </View>

            <View style={styles.bodySection}>
              <Icon
                style={styles.icon}
                name='notifications-outline'
                size={moderateScale(20)}
                color={theme.MAIN_TEXT_COLOR}
              />
              <View>
                <Text
                  style={[
                    styles.highlightText,
                    {
                      color: theme.MAIN_TEXT_COLOR
                    }
                  ]}
                >
                  Reminders
                </Text>
                {habitSelected.reminderAt.length > 0 &&
                  habitSelected.reminderAt.map((reminder, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.infoText,
                        {
                          color: theme.MAIN_TEXT_COLOR
                        }
                      ]}
                    >
                      {moment(reminder).format("h:mm a")}
                    </Text>
                  ))}
                {habitSelected.reminderAt.length === 0 && (
                  <Text
                    style={[
                      styles.infoText,
                      {
                        color: theme.MAIN_TEXT_COLOR
                      }
                    ]}
                  >
                    None
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.bodySection}>
              <Icon style={styles.icon} name='options-outline' size={moderateScale(25)} color={theme.MAIN_TEXT_COLOR} />
              <View>
                <Text
                  style={[
                    styles.highlightText,
                    {
                      color: theme.MAIN_TEXT_COLOR
                    }
                  ]}
                >
                  Description
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.MAIN_TEXT_COLOR
                    }
                  ]}
                >
                  {habitSelected.description.length > 0 ? habitSelected.description : "None"}
                </Text>
              </View>
            </View>

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
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bodySectionContainer: {
    width: "100%",
    marginTop: verticalScale(30),
    position: "absolute",
    bottom: 0,
    borderRadius: moderateScale(20),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    paddingLeft: horizontalScale(30),
    paddingRight: horizontalScale(30),
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  titleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    paddingBottom: verticalScale(15)
  },
  bodySection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9"
  },
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
  habitTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(3)
  },
  highlightText: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(10),
    lineHeight: verticalScale(12)
  },
  infoText: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(15),
    marginTop: verticalScale(3)
  },
  icon: {
    marginRight: horizontalScale(15)
  },
  closeIcon: {
    backgroundColor: MAIN_ACCENT_COLOR,
    width: horizontalScale(30),
    height: verticalScale(30),
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    paddingLeft: horizontalScale(2),
    paddingRight: horizontalScale(2),
    display: "flex",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(15),
    color: APP_WHITE
  }
});
