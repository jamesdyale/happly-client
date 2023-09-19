import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "~hooks";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomTextInput, ReceiverMessage, SenderMessage } from "~components";
import { groupMessagesByDateTimeSent, useMetric } from "~utils";
import moment from "moment";
import { useAtomValue } from "jotai";
import { userAtom } from "~state";
import { Message, Room, User } from "~types";
import {
  ActionCreateMessageForRoom,
  ActionGetMessagesByRoomId,
  ActionGetRoomById,
  ActionUpdateRoomById
} from "~actions";
import { AddUserToRoomModal } from "~modals";
import { onSnapshot } from "firebase/firestore";
import { useToast } from "react-native-toast-notifications";
import { APP_WHITE } from "~styles";

export const RoomScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const toast = useToast();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const scrollViewRef = useRef<ScrollView | null>(null);

  // get the room id from the params
  const { roomID } = useRoute().params as { roomID: Room["id"] };

  const user = useAtomValue(userAtom);

  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState({});

  const [room, setRoom] = React.useState<Room | null>(null);
  const [addUserModal, setAddUserModal] = React.useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getRoom();
      getMessagesRelatedToRoom();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const getRoom = async () => {
    const roomResponse = await ActionGetRoomById(roomID);

    if (roomResponse) {
      const room = roomResponse.data() as Room;
      setRoom(room);
    }
  };

  const getMessagesRelatedToRoom = async () => {
    if (!roomID) {
      return;
    }

    const messagesQuery = ActionGetMessagesByRoomId(roomID);

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as unknown as Message;
        messages.push(data);
      });

      const groupedMessages = groupMessagesByDateTimeSent(messages);

      setMessages(groupedMessages);
    });

    return () => unsubscribe();
  };

  const addUserToRoom = async (invites: User["id"][]) => {
    if (invites.length === 0) {
      return;
    }

    const newMembers = [...room.members, ...invites];
    const newRoom: Room = {
      ...room,
      members: newMembers
    };

    setRoom(newRoom);

    await ActionUpdateRoomById(newRoom);

    setAddUserModal(false);
  };

  const handleSubmitMessage = async (message) => {
    if (message.length === 0) {
      return;
    }

    const newMessage: Pick<Message, "message" | "roomId" | "sender"> = {
      message,
      roomId: roomID,
      sender: user.id
    };

    try {
      await ActionCreateMessageForRoom(newMessage);
      setMessage("");
    } catch (error) {
      toast.show("An error happened when sending your message!", {
        type: "danger",
        duration: 4000,
        placement: "bottom",
        icon: <Icon name='alert-circle' size={moderateScale(20)} color={APP_WHITE} />
      });
    }
  };

  // Function to add a new message and scroll to the bottom
  const addMessageAndScroll = (newMessage: string) => {
    // Add the new message to your messages array
    // Assuming you have a state variable or similar to manage messages
    // messages.push(newMessage);

    // Use scrollTo or scrollToEnd to scroll to the bottom
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true }); // You can also use scrollTo if needed
    }

    // Update your component state with the new messages
    // Set your component's state to trigger a re-render with the new message
  };

  if (room === null) {
    return null;
  }

  return (
    <SafeAreaView
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.SECONDARY_BG_COLOR
        }
      ]}
    >
      <KeyboardAvoidingView
        style={[
          styles.container,
          {
            backgroundColor: theme.SECONDARY_BG_COLOR
          }
        ]}
      >
        <View
          style={[
            styles.header,
            {
              borderBottomColor: theme.BORDER_COLOR,
              paddingVertical: verticalScale(20),
              paddingHorizontal: horizontalScale(20),
              borderBottomWidth: moderateScale(1)
            }
          ]}
        >
          <Icon
            name='chevron-back'
            size={moderateScale(25)}
            color={theme.MAIN_TEXT_COLOR}
            onPress={() => navigation.goBack()}
            style={[
              styles.backIcon,
              {
                marginRight: horizontalScale(5)
              }
            ]}
          />
          <View style={styles.headerTextSection}>
            <View style={styles.headerText}>
              <Text
                style={[
                  styles.roomName,
                  {
                    color: theme.MAIN_TEXT_COLOR,
                    fontSize: moderateScale(20),
                    lineHeight: verticalScale(24)
                  }
                ]}
              >
                {room.name}
              </Text>
              <Text
                style={[
                  styles.members,
                  {
                    color: theme.MAIN_TEXT_COLOR + "90",
                    fontSize: moderateScale(12),
                    lineHeight: verticalScale(18)
                  }
                ]}
              >
                {room.members.length === 1
                  ? `${room.members.length} Member`
                  : `${room.members.length} Members`}
              </Text>
            </View>
            <View
              style={[
                styles.actionBtn,
                {
                  width: horizontalScale(80)
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.actionButtonContainer,
                  {
                    width: horizontalScale(30),
                    height: verticalScale(30),
                    borderRadius: moderateScale(15)
                  }
                ]}
                onPress={() => setAddUserModal(true)}
              >
                <Icon name='md-person-add-sharp' size={moderateScale(20)} color={theme.APP_BLACK} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButtonContainer,
                  {
                    width: horizontalScale(30),
                    height: verticalScale(30),
                    borderRadius: moderateScale(15)
                  }
                ]}
              >
                <Icon
                  name='md-ellipsis-vertical'
                  size={moderateScale(20)}
                  color={theme.APP_BLACK}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.roomConversation,
            {
              backgroundColor: theme.BORDER_COLOR + "40"
            }
          ]}
        >
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {Object.keys(messages).map((date) => (
              <View
                key={date}
                style={[
                  styles.messagesGroup,
                  {
                    marginBottom: verticalScale(20)
                  }
                ]}
              >
                <Text
                  style={[
                    styles.messagesGroupText,
                    {
                      fontSize: moderateScale(12),
                      lineHeight: verticalScale(18),
                      marginTop: verticalScale(20)
                    }
                  ]}
                >
                  {moment().format("DD/MM/YYYY") === date ? "Today" : date}
                </Text>
                {messages[date].map((message: Message) => (
                  <View
                    key={message.id}
                    style={{
                      display: "flex",
                      alignItems: message.sender !== user.id ? "flex-start" : "flex-end",
                      width: "100%"
                    }}
                  >
                    {message.sender !== user.id ? (
                      <ReceiverMessage {...message} />
                    ) : (
                      <SenderMessage {...message} />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={[
            styles.footer,
            {
              borderTopColor: theme.BORDER_COLOR,
              paddingVertical: verticalScale(10),
              paddingHorizontal: horizontalScale(20),
              borderTopWidth: moderateScale(1)
            }
          ]}
        >
          <View style={{ width: "100%" }}>
            <CustomTextInput
              bigLabel=''
              placeholder='Type your message...'
              handleChange={setMessage}
              handleSubmit={() => handleSubmitMessage(message)}
              value={message}
              icon='send'
              iconClicked={() => handleSubmitMessage(message)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <AddUserToRoomModal
        isVisible={addUserModal}
        handleClose={() => setAddUserModal(false)}
        addUserToRoom={addUserToRoom}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    height: "100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  backIcon: {
    width: "10%"
  },
  headerTextSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%"
  },
  headerText: {},
  roomName: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal"
  },
  members: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal"
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionButtonContainer: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  },
  roomConversation: {
    flex: 1
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  messagesGroup: {
    width: "100%"
  },
  messagesGroupText: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    color: "#999",
    width: "100%",
    textAlign: "center"
  },
  imageContainer: {
    width: "20%",
    alignItems: "center"
  }
});
