import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

export const SingleRoomCard = ({ item }) => {
  const { horizontalScale, moderateScale, verticalScale } = useMetric();
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // Fetch the message from the database based on the room id
      // Get the last message and display it
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert("Challenge feature is not available yet");
        return;
        // navigate(ROUTES.SINGLE_ROOM, { roomID: item.id });
      }}
      style={[
        styles.singleItemHolder,
        {
          backgroundColor: theme.CARD_BG,
          marginBottom: verticalScale(20),
          borderRadius: moderateScale(10),
          paddingVertical: verticalScale(20),
          paddingHorizontal: horizontalScale(20)
        }
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          {
            width: horizontalScale(50),
            height: verticalScale(50),
            borderRadius: moderateScale(50),
            marginRight: horizontalScale(20)
          }
        ]}
      >
        {item.avatar ? (
          <Image style={styles.image} source={{ uri: item.avatar }} />
        ) : (
          <View
            style={[
              styles.makeUpStyleImage,
              {
                backgroundColor: theme.MAIN_ACCENT_COLOR
              }
            ]}
          >
            <Text
              style={[
                styles.makeUpStyleImageText,
                {
                  color: theme.MAIN_TEXT_COLOR,
                  fontSize: moderateScale(20)
                }
              ]}
            >
              {item.name[0]}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.itemText}>
        <Text
          style={[
            styles.itemTextName,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: moderateScale(14),
              lineHeight: verticalScale(24),
              marginBottom: horizontalScale(5)
            }
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.itemTextLastMessage,
            {
              color: theme.MAIN_TEXT_COLOR + "80",
              fontSize: moderateScale(12),
              lineHeight: verticalScale(18)
            }
          ]}
        >
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.timeDetails}>
        <Text
          style={[
            styles.timeDetailsTimeSent,
            {
              color: theme.MAIN_TEXT_COLOR + "80",
              fontSize: moderateScale(12),
              lineHeight: horizontalScale(18),
              marginBottom: verticalScale(5)
            }
          ]}
        >
          {item.timeSent}
        </Text>
        {item.unread > 0 && (
          <View
            style={[
              styles.timeDetailsUnread,
              {
                backgroundColor: theme.MAIN_ACCENT_COLOR,
                width: horizontalScale(20),
                height: verticalScale(20),
                borderRadius: moderateScale(20)
              }
            ]}
          >
            <Text
              style={[
                styles.timeDetailsUnreadText,
                {
                  color: theme.CONTRAST_MAIN_TEXT_COLOR,
                  fontSize: moderateScale(12),
                  lineHeight: verticalScale(18)
                }
              ]}
            >
              {item.unread}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  singleItemHolder: {
    flexDirection: "row",
    alignItems: "center"
  },
  imageContainer: {
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  makeUpStyleImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  makeUpStyleImageText: {
    fontWeight: "700"
  },
  itemText: {
    flex: 1
  },
  itemTextName: {
    fontStyle: "normal",
    fontFamily: "Inter_500Medium"
  },
  itemTextLastMessage: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular"
  },
  timeDetails: {
    alignItems: "flex-end"
  },
  timeDetailsTimeSent: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular"
  },
  timeDetailsUnread: {
    justifyContent: "center",
    alignItems: "center"
  },
  timeDetailsUnreadText: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular"
  }
});
