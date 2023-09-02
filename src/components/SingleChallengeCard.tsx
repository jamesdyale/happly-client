import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import { SleepingIcon } from "~assets";
import { CustomButton } from "~components";
import { ChallengeType } from "~types/ChallengeType";

interface SingleChallengesType {
  challenge: ChallengeType;
  handlePopupReminder: (challengeId: ChallengeType["id"]) => void;
}

export const SingleChallengeCard = ({
  challenge,
  handlePopupReminder
}: SingleChallengesType) => {
  const { theme } = useTheme();

  return (
    <View
      key={challenge.id}
      style={[
        styles.singleChallengeContainer,
        {
          backgroundColor: theme.CARD_BG
        }
      ]}
    >
      <View style={styles.hashtagsContainer}>
        <View style={{ flexDirection: "row" }}>
          {challenge.hashtags.map((hashtag, index) => (
            <Text
              key={index}
              style={[
                styles.hashtags,
                {
                  color: theme.MAIN_ACCENT_COLOR,
                  backgroundColor: theme.MAIN_ACCENT_COLOR + "20"
                }
              ]}
            >
              #{hashtag}{" "}
            </Text>
          ))}
        </View>

        <Text
          style={[
            styles.challengeMemberNumber,
            {
              color: theme.MAIN_ACCENT_COLOR,
              backgroundColor: theme.MAIN_ACCENT_COLOR + "20"
            }
          ]}
        >
          {challenge.numberOfParticipants > 1
            ? `${challenge.numberOfParticipants} members`
            : `${challenge.numberOfParticipants} member`}
        </Text>
      </View>
      <View style={styles.challengeInfo}>
        <View style={styles.challengeInfoTop}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "60%"
            }}
          >
            <Text
              style={[
                styles.challengeName,
                {
                  color: theme.MAIN_TEXT_COLOR
                }
              ]}
            >
              {challenge.name}
            </Text>
            <Text
              style={[
                styles.challengeDescription,
                {
                  color: theme.MAIN_TEXT_COLOR
                }
              ]}
            >
              {challenge.description}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <SleepingIcon />
          </View>
        </View>
        <View>
          <CustomButton
            bgColor={theme.MAIN_ACCENT_COLOR}
            color={theme.CONTRAST_MAIN_TEXT_COLOR}
            text='Join'
            onClick={() => handlePopupReminder(challenge.id)}
            disabled={false}
          />
        </View>
      </View>
    </View>
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
