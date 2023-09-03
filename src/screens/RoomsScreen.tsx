import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet
} from "react-native";
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
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();

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

    const unsubscribe = onSnapshot(
      dataDocumentSnapshotQuery,
      (querySnapshot) => {
        const rooms: Room[] = [];
        querySnapshot.forEach((doc) => {
          const room = doc.data() as Room;
          rooms.push(room);
        });
        setRooms(rooms);
      }
    );

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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[
              styles.headerText,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            Accountability
          </Text>
          {/* <TouchableOpacity onPress={() => console.log("searching")}>
            <Icon name='search' size={30} color={theme.MAIN_TEXT_COLOR} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.tabsContainer}>
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
                    : theme.MAIN_ACCENT_COLOR + "50"
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
                      : theme.MAIN_TEXT_COLOR
                }
              ]}
            >
              Rooms
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate(ROUTES.CREATE_ROOM)}
            style={[
              styles.addRoomButton,
              {
                backgroundColor: theme.MAIN_ACCENT_COLOR + "50",
                borderColor: theme.MAIN_ACCENT_COLOR + "50"
              }
            ]}
          >
            <Icon name='add' size={20} color={theme.MAIN_TEXT_COLOR} />
            <Text
              style={[
                styles.tabText,
                {
                  color: theme.MAIN_TEXT_COLOR
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
    justifyContent: "space-between",
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
    marginBottom: 20
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
  },
  addRoomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1
  }
});
