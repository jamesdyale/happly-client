import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "~hooks";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "~constants";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const SingleRoomCard = ({ item }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
          backgroundColor: theme.CARD_BG
        }
      ]}
    >
      <View style={styles.imageContainer}>
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
                  color: theme.MAIN_TEXT_COLOR
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
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.itemTextLastMessage,
            {
              color: theme.MAIN_TEXT_COLOR + "80"
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
              color: theme.MAIN_TEXT_COLOR + "80"
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
                backgroundColor: theme.MAIN_ACCENT_COLOR
              }
            ]}
          >
            <Text
              style={[
                styles.timeDetailsUnreadText,
                {
                  color: theme.CONTRAST_MAIN_TEXT_COLOR
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

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20)
  },
  tab: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(5),
    marginRight: horizontalScale(10),
    marginBottom: verticalScale(10)
  },
  tabText: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18)
  },

  singleItemHolder: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20)
  },
  imageContainer: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(50),
    overflow: "hidden",
    marginRight: horizontalScale(20)
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
    fontSize: moderateScale(20),
    fontWeight: "700"
  },
  itemText: {
    flex: 1
  },
  itemTextName: {
    fontStyle: "normal",
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(14),
    lineHeight: verticalScale(24),
    marginBottom: horizontalScale(5)
  },
  itemTextLastMessage: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18)
  },
  timeDetails: {
    alignItems: "flex-end"
  },
  timeDetailsTimeSent: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(12),
    lineHeight: horizontalScale(18),
    marginBottom: verticalScale(5)
  },
  timeDetailsUnread: {
    width: horizontalScale(20),
    height: verticalScale(20),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center"
  },
  timeDetailsUnreadText: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(18)
  }
});
