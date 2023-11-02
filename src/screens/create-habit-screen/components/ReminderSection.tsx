import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import { ActionGetUserByUID, ActionUpdateUser } from "~actions";
import { registerForPushNotificationsAsync } from "~services";
import { getData, useMetric } from "~utils";
import { ASYNC_STORAGE_KEYS } from "~constants";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useAtomValue } from "jotai";
import { userAtom } from "~state";
import { User } from "~types";

export const ReminderSection = ({
  setShowNotificationModal,
  removeReminder,
  reminderAt
}) => {
  const user = useAtomValue(userAtom);

  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const checkIfUserHasEnabledPushNotification = async () => {
    const token = await getData(ASYNC_STORAGE_KEYS.PUSH_TOKEN);

    if (token) {
      setShowNotificationModal(true);
      checkIfUserHasPushTokenPresentAndSaveIfNot(token);
    } else {
      registerForPushNotificationsAsync().then((token) => {
        if (token) {
          setShowNotificationModal(true);
          checkIfUserHasPushTokenPresentAndSaveIfNot(token);
        } else {
          Alert.alert("Please enable push notifications in your settings");
        }
      });
    }
  };

  const checkIfUserHasPushTokenPresentAndSaveIfNot = async (token) => {
    const userResponse = await ActionGetUserByUID(user.id);

    if (userResponse) {
      const user = userResponse.data() as User;

      if (user.pushToken === "") {
        const newUser: User = {
          ...user,
          pushToken: token
        };

        await ActionUpdateUser(newUser);
      }
    }
  };

  return (
    <View
      style={[
        styles.sectionContainer,
        {
          marginBottom: verticalScale(20)
        }
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: verticalScale(10)
        }}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: moderateScale(18),
              lineHeight: verticalScale(22),
              marginBottom: verticalScale(10)
            }
          ]}
        >
          Should we remind you?
        </Text>
      </View>

      <View style={styles.reminderContainer}>
        <View
          style={[
            styles.reminderTimeContainer,
            {
              backgroundColor: theme.APP_GRAY,
              borderTopRightRadius: moderateScale(6),
              borderTopLeftRadius: moderateScale(6)
            }
          ]}
        >
          {reminderAt.map((reminder, index) => (
            <View
              key={index}
              style={[
                styles.reminderWrapper,
                {
                  borderBottomColor: theme.APP_LIGHT_GRAY,
                  borderBottomWidth: moderateScale(1),
                  paddingHorizontal: horizontalScale(10)
                }
              ]}
            >
              <View
                style={[
                  styles.reminderTextContainer,
                  {
                    paddingVertical: verticalScale(10)
                  }
                ]}
              >
                <Icon
                  name='alarm-outline'
                  size={moderateScale(20)}
                  color={theme.APP_BLACK}
                  style={{ marginRight: horizontalScale(5) }}
                />
                <Text
                  style={[
                    styles.reminderText,
                    {
                      color: theme.APP_BLACK,
                      fontSize: moderateScale(16),
                      lineHeight: verticalScale(19),
                      marginLeft: horizontalScale(5)
                    }
                  ]}
                >
                  {moment(reminder).format("h:mm a")}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeReminder(reminder)}>
                <Icon
                  name='ios-close-circle-outline'
                  size={moderateScale(20)}
                  color={theme.APP_BLACK}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.reminderTime,
            {
              backgroundColor: theme.APP_GRAY,
              borderBottomLeftRadius: moderateScale(6),
              borderBottomRightRadius: moderateScale(6),
              height: verticalScale(40),
              paddingHorizontal: horizontalScale(10)
            }
          ]}
          onPress={() => checkIfUserHasEnabledPushNotification()}
        >
          <Icon
            name='ios-add-circle-sharp'
            size={moderateScale(20)}
            color={theme.APP_BLACK}
            style={{ marginRight: horizontalScale(5) }}
          />
          <Text
            style={[
              styles.periodOptionTitle,
              {
                color: theme.GRAY_TEXT,
                fontSize: moderateScale(14),
                lineHeight: verticalScale(22)
              }
            ]}
          >
            {reminderAt.length < 1 ? "Add a reminder" : "Add another reminder"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
  sectionTitle: {
    fontFamily: "Inter_600SemiBold"
  },
  reminderTimeContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  reminderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  reminderTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%"
  },
  reminderText: {
    fontFamily: "Inter_400Regular"
  },
  reminderContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  reminderTime: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  periodOptionTitle: {
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    display: "flex"
  }
});
