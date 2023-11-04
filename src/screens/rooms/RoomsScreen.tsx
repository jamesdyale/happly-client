import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "~hooks";
import { SingleRoomCard } from "~components";
import { ROUTES } from "~constants";
import { ActionGetRoomsUserIsInByUserID } from "~actions";
import { useAtom, useAtomValue } from "jotai";
import { roomsAtom, userAtom } from "~state";
import { onSnapshot } from "firebase/firestore";
import { Room } from "~types";
import { useMetric } from "~utils";

enum Tab {
  FRIENDS = "friends",
  ROOMS = "rooms"
}

// const rooms = [
//   {
//     id: 1,
//     name: "Room 1",
//     lastMessage: "Hey, how are you?",
//     unread: 2,
//     photo: "https://picsum.photos/200"
//   },
//   {
//     id: 2,
//     name: "Room 2",
//     lastMessage: "Hey, how are you?",
//     unread: 0,
//     photo: "https://picsum.photos/200"
//   }
// ];

export const RoomsScreen = () => {
  const { horizontalScale, verticalScale, moderateScale } = useMetric();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState(Tab.ROOMS);
  const user = useAtomValue(userAtom);
  const [rooms, setRooms] = useAtom(roomsAtom);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getRooms();
    }
  }, []);

  const getRooms = async () => {
    const dataDocumentSnapshotQuery = ActionGetRoomsUserIsInByUserID(user.id);

    const unsubscribe = onSnapshot(dataDocumentSnapshotQuery, (querySnapshot) => {
      const rooms: Room[] = [];
      querySnapshot.forEach((doc) => {
        const room = doc.data() as Room;
        rooms.push(room);
      });
      setRooms(rooms);
    });

    return () => unsubscribe();
  };

  return (
    <SafeAreaView
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.MAIN_BG_COLOR
        }
      ]}
    >
      <View
        style={[
          styles.container,
          {
            paddingVertical: verticalScale(20),
            paddingHorizontal: horizontalScale(20),
            marginBottom: verticalScale(20)
          }
        ]}
      >
        <View
          style={[
            styles.header,
            {
              marginBottom: verticalScale(20)
            }
          ]}
        >
          <Text
            style={[
              styles.headerText,
              {
                color: theme.MAIN_TEXT_COLOR,
                fontSize: moderateScale(30),
                lineHeight: verticalScale(36)
              }
            ]}
          >
            Accountability
          </Text>
          {/* <TouchableOpacity onPress={() => console.log("searching")}>
            <Icon name='search' size={30} color={theme.MAIN_TEXT_COLOR} />
          </TouchableOpacity> */}
        </View>
        <View
          style={[
            styles.tabsContainer,
            {
              marginBottom: verticalScale(20)
            }
          ]}
        >
          {/* <TouchableOpacity onPress={() => setActiveTab(Tab.FRIENDS)} style={[styles.tab, {
            backgroundColor: activeTab === Tab.FRIENDS ? theme.MAIN_ACCENT_COLOR : theme.MAIN_ACCENT_COLOR + '50'
          }]}>
            <Text
              style={[styles.tabText, {
                color: activeTab === Tab.FRIENDS ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR
              }]}>
              Friend List
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setActiveTab(Tab.ROOMS)}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === Tab.ROOMS
                    ? theme.MAIN_ACCENT_COLOR
                    : theme.MAIN_ACCENT_COLOR + "50",
                paddingVertical: verticalScale(10),
                paddingHorizontal: horizontalScale(10),
                borderRadius: moderateScale(5),
                marginRight: horizontalScale(10),
                marginBottom: verticalScale(10)
              }
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === Tab.ROOMS
                      ? theme.CONTRAST_MAIN_TEXT_COLOR
                      : theme.MAIN_TEXT_COLOR,
                  fontSize: moderateScale(12),
                  lineHeight: verticalScale(18)
                }
              ]}
            >
              Rooms
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Accountability feature is not available yet");
              return;
              // navigate(ROUTES.CREATE_ROOM)
            }}
            style={[
              styles.addRoomButton,
              {
                backgroundColor: theme.MAIN_ACCENT_COLOR + "50",
                borderColor: theme.MAIN_ACCENT_COLOR + "50",
                paddingVertical: verticalScale(8),
                paddingHorizontal: horizontalScale(8),
                marginBottom: verticalScale(10),
                borderRadius: moderateScale(5),
                borderWidth: moderateScale(1)
              }
            ]}
          >
            <Icon name='add' size={moderateScale(20)} color={theme.MAIN_TEXT_COLOR} />
            <Text
              style={[
                styles.tabText,
                {
                  color: theme.MAIN_TEXT_COLOR,
                  fontSize: moderateScale(12),
                  lineHeight: verticalScale(18)
                }
              ]}
            >
              Create Room
            </Text>
          </TouchableOpacity>
        </View>
        {/* {activeTab === "friends" ? (
          <View>
            {friends.map((friend) => (
              <SingleItem key={friend.id} item={friend} />
            ))}
          </View>
        ) : ( */}
        <View>
          {!rooms ? (
            <View
              style={{
                display: "flex"
              }}
            >
              <Text>Loading...</Text>
            </View>
          ) : rooms.length < 1 ? (
            <Text>You have not been added to or created any rooms </Text>
          ) : (
            rooms.map((room) => <SingleRoomCard key={room.id} item={room} />)
          )}
        </View>
        {/* )} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontStyle: "normal",
    fontWeight: "700",
    display: "flex"
  },

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tab: {},
  tabText: {
    fontStyle: "normal",
    fontFamily: "Inter_400Regular"
  },
  addRoomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
