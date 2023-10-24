import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "~hooks";
import moment from "moment";
import { Message } from "~types";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const ReceiverMessage = (message: Message) => {
  const { theme } = useTheme();

  return (
    <View key={message.id} style={styles.messageContainer}>
      <View
        style={[
          styles.messageInfo,
          {
            backgroundColor: theme.CONTRAST_MAIN_TEXT_COLOR
          }
        ]}
      >
        <Text
          style={[
            styles.message,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          {message.message}
        </Text>
        <Text style={styles.messageTime}>{moment(message.messageTime).format("hh:mm A")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
    width: "80%",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20)
  },
  messageInfo: {
    width: "100%",
    flexDirection: "column",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(10)
  },
  message: {
    fontSize: moderateScale(14),
    fontFamily: "Inter_400Regular",
    lineHeight: verticalScale(20),
    fontStyle: "normal",
    color: "#333",
    marginBottom: verticalScale(5)
  },
  messageTime: {
    fontSize: moderateScale(12),
    fontFamily: "Inter_400Regular",
    lineHeight: verticalScale(16),
    fontStyle: "normal",
    color: "#999"
  }
});
