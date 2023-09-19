import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import { SleepingIcon } from "~assets";
import { CustomButton } from "./CustomButton";
import { ChallengeType } from "~types/ChallengeType";
import { useAtomValue } from "jotai";
import { userAtom } from "~state";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

interface SingleChallengesType {
  challenge: ChallengeType;
  handlePopupReminder: (challengeId: ChallengeType["id"]) => void;
  isUserPartOfChallenge;
}

export const SingleChallengeCard = ({
  challenge,
  handlePopupReminder,
  isUserPartOfChallenge
}: SingleChallengesType) => {
  const user = useAtomValue(userAtom);
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
          {challenge.hashtags.length > 0 &&
            challenge.hashtags.map((hashtag, index) => (
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
          {challenge.participants.length === 0
            ? `0 member`
            : challenge.participants.length > 1
            ? `${challenge.participants.length} members`
            : `1 member`}
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
          {!isUserPartOfChallenge ? (
            <CustomButton
              bgColor={theme.MAIN_ACCENT_COLOR}
              color={theme.CONTRAST_MAIN_TEXT_COLOR}
              text='Join'
              onClick={() => handlePopupReminder(challenge.id)}
              disabled={false}
            />
          ) : (
            <CustomButton
              bgColor={theme.MAIN_BG_COLOR}
              color={theme.MAIN_ACCENT_COLOR}
              text='You are already a part of this challenge'
              onClick={() => console.log("You cannot join")}
              disabled={false}
            />
          )}
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
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(20)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20)
  },
  headerText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: moderateScale(30),
    lineHeight: verticalScale(36),
    display: "flex"
  },
  noHabitsContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20)
  },
  noHabitTextMain: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontSize: moderateScale(24),
    lineHeight: verticalScale(36)
  },
  noHabitTextSub: {
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(14),
    fontStyle: "normal",
    lineHeight: verticalScale(18)
  },
  singleChallengeContainer: {
    marginBottom: verticalScale(20),
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(10)
  },
  hashtagsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20)
  },
  hashtags: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
    marginRight: horizontalScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5)
  },
  challengeInfo: {},
  challengeInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10)
  },
  challengeName: {
    fontStyle: "normal",
    fontFamily: "Inter_700Bold",
    fontSize: moderateScale(16),
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(5)
  },
  challengeDescription: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(13),
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(5)
  },
  challengeMemberNumber: {
    fontStyle: "normal",
    fontFamily: "Inter_700Bold",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18),
    marginRight: horizontalScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5)
  }
});
