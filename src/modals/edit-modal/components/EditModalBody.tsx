import { View, Text, StyleSheet } from "react-native";
import { useAtom, useAtomValue } from "jotai";
import { selectedHabitAtom } from "~state";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import moment from "moment/moment";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const EditModalBody = () => {
  const { theme } = useTheme();

  const habitSelected = useAtomValue(selectedHabitAtom);

  return (
    <>
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
        <Icon
          style={styles.icon}
          name='options-outline'
          size={moderateScale(25)}
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
            {habitSelected.description.length > 0
              ? habitSelected.description
              : "None"}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bodySection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9"
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
  }
});
