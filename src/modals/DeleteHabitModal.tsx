import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { APP_BLACK, APP_RED, APP_WHITE, GRAY_TEXT } from "~styles";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { loadingAtom, progressAtom, selectedHabitAtom, showDeleteModalAtom } from "~state";
import {
  ActionGetUserHabitById,
  ActionDeleteHabitById,
  ActionDeleteStatsById,
  ActionDeleteStreakByHabitId,
  ActionDeleteRemindersByHabitId
} from "~actions";
import Icon from "react-native-vector-icons/Ionicons";
import { useToast } from "react-native-toast-notifications";
import { ROUTES } from "../constants";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HabitType } from "~types";
import { horizontalScale, moderateScale, removeAUserFromAChallenge, verticalScale } from "~utils";

export const DeleteHabitModal = () => {
  const toast = useToast();
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const setDeleteModal = useSetAtom(showDeleteModalAtom);
  const isDeleteHabitModalOpen = useAtomValue(showDeleteModalAtom);

  const [progress, setProgress] = useAtom(progressAtom);
  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom);
  const setLoading = useSetAtom(loadingAtom);

  const handleOnPressDelete = async () => {
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

        navigate(ROUTES.MAIN_HOME);
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

  return (
    <View style={styles.container}>
      <Modal isVisible={isDeleteHabitModalOpen} onBackdropPress={() => setDeleteModal(false)}>
        <SafeAreaView
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            alignItems: "center"
          }}
        >
          <View style={styles.bodySectionContainer}>
            <View style={styles.bodySection}>
              <Text style={styles.mainBodyHeader}>Delete Habit?</Text>
            </View>
            <View style={styles.actionSection}>
              <TouchableOpacity
                style={{ ...styles.actionSectionButton, ...styles.exitBtn }}
                onPress={() => setDeleteModal(false)}
              >
                <Text style={{ color: APP_BLACK, ...styles.infoText }}>No, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.actionSectionButton,
                  ...styles.goForwardWithActionBtn
                }}
                onPress={handleOnPressDelete}
              >
                <Text style={{ color: APP_WHITE, ...styles.infoText }}>Yes, Delete</Text>
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
    width: "80%",
    marginTop: verticalScale(30),
    position: "absolute",
    bottom: 100,
    backgroundColor: APP_WHITE,
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(30),
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  bodySection: {},
  actionSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20)
  },
  actionSectionButton: {
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    width: "48%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mainBodyHeader: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: moderateScale(18),
    color: GRAY_TEXT
  },
  infoText: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: moderateScale(14),
    lineHeight: verticalScale(17)
  },
  exitBtn: {
    borderColor: "#B0C1CB",
    borderWidth: moderateScale(1)
  },
  goForwardWithActionBtn: {
    borderColor: APP_RED,
    backgroundColor: APP_RED,
    borderWidth: moderateScale(1)
  }
});
