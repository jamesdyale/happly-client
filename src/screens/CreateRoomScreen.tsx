import { View, Text, Button, KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton, CustomTextInput } from "~components";
import { formValidationOnBlur, horizontalScale, moderateScale, verticalScale } from "~utils";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "~hooks";
import { generateRoomId } from "~generators";
import { useAtomValue } from "jotai";
import { userAtom } from "~state";
import { Room } from "~types";
import { ActionCreateRoom, ActionGetRoomByUserId } from "~actions";
import { useToast } from "react-native-toast-notifications";

export const CreateRoomScreen = () => {
  const toast = useToast();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();

  const user = useAtomValue(userAtom);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [invite, setInvite] = useState("");
  const [inviteList, setInviteList] = useState([]);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [inviteError, setInviteError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setLoading(true);

    try {
      const roomData: Room = {
        id: generateRoomId(),
        name,
        description,
        members: inviteList,
        createdBy: user.id
      };

      const roomCreatedByUser = await ActionGetRoomByUserId(user.id);

      if (roomCreatedByUser.size >= 2) {
        toast.show("You can only create 2 rooms", {
          type: "danger",
          duration: 4000,
          placement: "bottom",
          icon: <Icon name='alert-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
        });
        return;
      }

      // Check the user's created rooms
      await ActionCreateRoom(roomData);

      toast.show("Room created successfully", {
        type: "success",
        duration: 4000,
        placement: "bottom",
        icon: <Icon name='checkmark-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
      });
    } catch (error) {
      toast.show("Something went wrong", {
        type: "danger",
        duration: 4000,
        placement: "bottom",
        icon: <Icon name='alert-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
      });
    } finally {
      setLoading(false);
    }

    // Else, show an error message
  };

  const handleSubmit = (text: string) => {
    setInviteList([...inviteList, text]);
    setInvite("");
  };

  return (
    <SafeAreaView
      style={[
        styles.CreateRoomContainer,
        {
          backgroundColor: theme.SECONDARY_BG_COLOR
        }
      ]}
    >
      <KeyboardAvoidingView behavior='padding' style={styles.CreateRoomForm}>
        <View style={styles.CreateRoomFormHeader}>
          <Icon
            name='chevron-back'
            size={moderateScale(25)}
            color={theme.MAIN_TEXT_COLOR}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[
              styles.CreateRoomFormBodyText,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            Create Room
          </Text>
        </View>
        <View style={styles.CreateRoomFormBody}>
          <View>
            <CustomTextInput
              label='Room Name'
              placeholder='Enter the room name'
              handleChange={setName}
              handleBlur={() => setNameError(formValidationOnBlur("name", name))}
              value={name}
              error={nameError}
            />
            <CustomTextInput
              label='Description'
              placeholder='Enter the description'
              handleChange={setDescription}
              handleBlur={() => setDescriptionError(formValidationOnBlur("description", description))}
              value={description}
              error={descriptionError}
            />
            <CustomTextInput
              label='Invite your accountability partners'
              placeholder='Add their user id'
              handleChange={setInvite}
              handleBlur={() => setInviteError(formValidationOnBlur("invite", invite))}
              handleSubmit={handleSubmit}
              value={invite}
              icon='person-add'
            />

            {inviteList.length > 0 && (
              <View
                style={{
                  marginTop: verticalScale(10),
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap"
                }}
              >
                <Text
                  style={{
                    color: theme.MAIN_TEXT_COLOR
                  }}
                >
                  Added Users
                </Text>
                <View
                  style={{
                    marginTop: verticalScale(10),
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  {inviteList.map((invite, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: theme.MAIN_ACCENT_COLOR,
                        paddingVertical: verticalScale(10),
                        paddingHorizontal: horizontalScale(10),
                        borderRadius: moderateScale(5),
                        marginRight: horizontalScale(10),
                        marginBottom: horizontalScale(10)
                      }}
                    >
                      <Text
                        style={{
                          color: theme.APP_WHITE,
                          fontSize: moderateScale(12)
                        }}
                      >
                        {invite}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <Text
              style={{
                color: theme.MAIN_ACCENT_COLOR,
                fontSize: moderateScale(12),
                marginTop: verticalScale(10)
              }}
            >
              {"To get this tell your friends to go to Settings > Copy User ID"}
            </Text>

            {/* TODO: Feature to link it to this user's list of habits */}
          </View>
          <View style={{ marginTop: verticalScale(-30) }}>
            <CustomButton
              bgColor={theme.MAIN_ACCENT_COLOR}
              color={theme.APP_WHITE}
              text='Create Room'
              onClick={handleCreateRoom}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  CreateRoomContainer: {},
  CreateRoomForm: {
    height: "100%",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20)
  },
  CreateRoomFormHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  CreateRoomFormBody: {
    marginTop: verticalScale(20),
    display: "flex",
    justifyContent: "space-between",
    height: "90%"
  },
  CreateRoomFormBodyText: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: moderateScale(24),
    marginLeft: horizontalScale(20)
  }
});
