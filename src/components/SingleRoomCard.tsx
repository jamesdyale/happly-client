import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "~hooks";

export const SingleRoomCard = ({ item }) => {
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => console.log("Opening Room")}
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

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10
  },
  tabText: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18
  },

  singleItemHolder: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    padding: 20
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 20
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
    fontSize: 20,
    fontWeight: "700"
  },
  itemText: {
    flex: 1
  },
  itemTextName: {
    fontStyle: "normal",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5
  },
  itemTextLastMessage: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18
  },
  timeDetails: {
    alignItems: "flex-end"
  },
  timeDetailsTimeSent: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5
  },
  timeDetailsUnread: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  timeDetailsUnreadText: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18
  }
});
