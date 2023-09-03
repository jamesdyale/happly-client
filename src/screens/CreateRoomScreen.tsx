import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton, CustomTextInput } from "~components";
import { formValidationOnBlur } from "~utils";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "~hooks";

export const CreateRoomScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [invite, setInvite] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [inviteError, setInviteError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateRoom = () => {};

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
            size={25}
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
              handleBlur={() =>
                setNameError(formValidationOnBlur("name", name))
              }
              value={name}
              error={nameError}
            />
            <CustomTextInput
              label='Description'
              placeholder='Enter the description'
              handleChange={setDescription}
              handleBlur={() =>
                setDescriptionError(
                  formValidationOnBlur("description", description)
                )
              }
              value={description}
              error={descriptionError}
            />
            <CustomTextInput
              label='Invite your accountability partners'
              placeholder='Add their user id'
              handleChange={setInvite}
              handleBlur={() =>
                setInviteError(formValidationOnBlur("invite", invite))
              }
              value={invite}
              icon='person-add'
            />
            <Text
              style={{
                color: theme.MAIN_ACCENT_COLOR,
                fontSize: 12,
                marginTop: 10
              }}
            >
              {"To get this tell your friends to go to Settings > Copy User ID"}
            </Text>
            {/* TODO: Feature to link it to this user's list of habits */}
          </View>
          <View style={{ marginTop: -30 }}>
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  CreateRoomFormHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  CreateRoomFormBody: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    height: "90%"
  },
  CreateRoomFormBodyText: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    marginLeft: 20
  }
});
