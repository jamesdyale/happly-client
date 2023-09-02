import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "~hooks";
import Icon from "react-native-vector-icons/Ionicons";

import { SingleChallengeCard } from "~components";
import { ChallengeType } from "~types/ChallengeType";
import { ActionAddUserToChallenge, ActionGetChallenges } from "~actions";
import { onSnapshot } from "firebase/firestore";
import { useAtom, useAtomValue } from "jotai";
import { challengesAtom, userAtom } from "~state";
import { NotificationModal } from "~modals";
import moment from "moment";

export const ChallengesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const [challenges, setChallenges] = useAtom(challengesAtom);
  const user = useAtomValue(userAtom);
  const [showNotificationModal, setShowNotificationModal] = useState(true);
  const [reminderAt, setReminderAt] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getChallenges();
    }
  }, []);

  const getChallenges = async () => {
    const dataDocumentSnapshotQuery = ActionGetChallenges();

    const unsubscribe = onSnapshot(
      dataDocumentSnapshotQuery,
      (querySnapshot) => {
        const challenges: ChallengeType[] = [];
        querySnapshot.forEach((doc) => {
          const challenge = doc.data() as ChallengeType;
          challenges.push(challenge);
        });

        setChallenges(challenges);
      }
    );

    return () => unsubscribe();
  };

  const addUserToChallenge = async (challengeId: ChallengeType["id"]) => {
    // console.log("Joining challenge");
    // Alert.alert("Challenge feature is not available yet");
    if (!challengeId) {
      // TODO: Error handling here
    }

    const challenge = challenges.filter((c) => c.id === challengeId);

    if (!challenge) {
      // TODO: Error handling here
    }

    await ActionAddUserToChallenge(challenge[0], user.id);
  };

  const handlePopupReminder = async () => {};

  const handleTimeSelected = (selectedDate: Date) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DDTHH:mm:ss");

    const doesExist = reminderAt.includes(formattedDate);

    if (!doesExist) {
      setReminderAt([...reminderAt, formattedDate]);
    } else {
      Alert.alert("Time has been previously selected");
    }
    setShowNotificationModal(false);
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.MAIN_BG_COLOR
          }
        ]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={[
                styles.headerText,
                {
                  color: theme.MAIN_TEXT_COLOR
                }
              ]}
            >
              Challenge
            </Text>
            <TouchableOpacity onPress={() => console.log("searching")}>
              <Icon name='search' size={30} color={theme.MAIN_TEXT_COLOR} />
            </TouchableOpacity>
          </View>
          {/*
          TODO: Down the line I should have a list of challenges created by the
          user and some popular challenges that are trending. For now, I'll just
          have a list of popular challenges.
          Popular Challenges depends on the amount of member in the challenge.
        */}
          {/* {challenges && challenges.length > 0 && (
          <View>
            <Text>This user does not have any challenges</Text>
          </View>
        )} */}

          {challenges && challenges.length === 0 && (
            <View
              style={{
                display: "flex"
              }}
            >
              <Text>No challenge created</Text>
            </View>
          )}
          {challenges && challenges.length > 0 && (
            <ScrollView style={{ marginBottom: 70 }}>
              {challenges.map((challenge, index) => (
                <SingleChallengeCard
                  key={index}
                  challenge={challenge}
                  handlePopupReminder={handlePopupReminder}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
      {showNotificationModal && (
        <NotificationModal
          handleTimeSelected={handleTimeSelected}
          closeNotificationModal={() => setShowNotificationModal(false)}
          reminderBody='What time should we remind you to do this challenge?'
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    padding: 20,
    marginBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  headerText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 36,
    display: "flex"
  },
  noHabitsContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  noHabitTextMain: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontSize: 24,
    lineHeight: 36
  },
  noHabitTextSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 18
  },
  singleChallengeContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10
  },
  hashtagsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  hashtags: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    marginRight: 10,
    padding: 5
  },
  challengeInfo: {},
  challengeInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  challengeName: {
    fontStyle: "normal",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5
  },
  challengeDescription: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 5
  },
  challengeMemberNumber: {
    fontStyle: "normal",
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    lineHeight: 18,
    marginRight: 10,
    padding: 5
  }
});
