import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { APP_WHITE, MAIN_ACCENT_COLOR } from "~styles";
import Modal from "react-native-modal";
import { CustomButton } from "~components";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const NotificationModal = ({
  handleTimeSelected,
  closeNotificationModal,
  isReminderHasBody = "false",
  reminderBody = ""
}) => {
  const [time, setTime] = React.useState(new Date());

  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Modal isVisible={true}>
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
              styles.container,
              {
                backgroundColor: theme.MAIN_BG_COLOR
              }
            ]}
          >
            <View
              style={[
                styles.heading,
                {
                  borderBottomColor: theme.BORDER_COLOR
                }
              ]}
            >
              <Text
                style={[
                  styles.titleSection,
                  {
                    color: theme.MAIN_TEXT_COLOR
                  }
                ]}
              >
                New reminder
              </Text>
              <TouchableOpacity onPress={closeNotificationModal}>
                <Icon
                  name='close'
                  size={moderateScale(25)}
                  color={theme.MAIN_TEXT_COLOR}
                />
              </TouchableOpacity>
            </View>
            {isReminderHasBody && (
              <Text
                style={[
                  styles.titleSection,
                  {
                    color: theme.MAIN_TEXT_COLOR,
                    fontSize: moderateScale(14)
                  }
                ]}
              >
                {reminderBody}
              </Text>
            )}
            <View style={styles.timePickerWrapper}>
              <DateTimePicker
                testID='dateTimePicker'
                value={time}
                mode='time'
                onChange={(e, selectedTime) => setTime(selectedTime)}
                display='spinner'
                is24Hour={true}
                textColor={theme.MAIN_TEXT_COLOR}
              />
            </View>
            <View>
              <CustomButton
                bgColor={theme.MAIN_ACCENT_COLOR}
                color={theme.CONTRAST_MAIN_TEXT_COLOR}
                text='Add reminder'
                onClick={() => handleTimeSelected(time)}
                disabled={false}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red"
  },
  container: {
    width: "100%",
    marginTop: verticalScale(30),
    position: "absolute",
    bottom: 0,
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
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: moderateScale(1),
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(10)
  },
  timePickerWrapper: {
    marginBottom: verticalScale(10)
  },
  titleSection: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(16),
    color: "red"
  },
  addReminderBtn: {
    backgroundColor: MAIN_ACCENT_COLOR,
    color: APP_WHITE,
    borderRadius: moderateScale(6),
    width: "100%",
    height: verticalScale(40),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  addReminderBtnText: {
    color: APP_WHITE,
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(14)
  }
});
