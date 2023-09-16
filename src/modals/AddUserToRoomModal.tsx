import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "~hooks";
import { formValidationOnBlur, horizontalScale, moderateScale, verticalScale } from "~utils";
import { CustomButton, CustomTextInput } from "~components";

interface IAddUserToRoomModal {
  isVisible: boolean;
  handleClose: (value: boolean) => void;
  addUserToRoom: (invites: string[]) => void;
}

export const AddUserToRoomModal = ({ isVisible, handleClose, addUserToRoom }: IAddUserToRoomModal) => {
  const { theme } = useTheme();
  const [invite, setInvite] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [inviteList, setInviteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBlur = () => {
    setInviteError(formValidationOnBlur("invite", invite));
    setInvite("");
  };

  const handleSubmit = (text: string) => {
    if (text.length === 0) {
      setInviteError("Please enter a user id");
      return;
    } else {
      setInvite("");
      setInviteList([...inviteList, text]);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.SECONDARY_BG_COLOR
        }
      ]}
    >
      <Modal isVisible={isVisible} onBackdropPress={() => handleClose(false)} hideModalContentWhileAnimating={true}>
        <View
          style={[
            styles.bodySectionContainer,
            {
              backgroundColor: theme.SECONDARY_BG_COLOR
            }
          ]}
        >
          <View style={styles.bodySection}>
            <CustomTextInput
              label='Invite your accountability partners'
              placeholder='Add their User ID'
              handleChange={setInvite}
              handleBlur={() => handleBlur()}
              handleSubmit={handleSubmit}
              value={invite}
              icon='person-add'
              iconClicked={() => {
                handleSubmit(invite);
              }}
            />

            {inviteList.length > 0 && (
              <View
                style={{
                  marginTop: verticalScale(10),
                  display: "flex",
                  flexDirection: "column"
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
                    flexDirection: "column",
                    width: "100%"
                  }}
                >
                  {inviteList.map((invite, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: theme.MAIN_ACCENT_COLOR,
                        borderRadius: moderateScale(5),
                        height: verticalScale(40),
                        marginBottom: verticalScale(10),
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: horizontalScale(10)
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
                      <Icon
                        name='close'
                        size={moderateScale(20)}
                        color={theme.APP_WHITE}
                        onPress={() => setInviteList(inviteList.filter((item) => item !== invite))}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
            <Text
              style={{
                color: theme.MAIN_ACCENT_COLOR,
                fontSize: moderateScale(12),
                marginTop: verticalScale(5),
                marginBottom: verticalScale(5)
              }}
            >
              {"To get this tell your friends to go to Settings > Copy User ID"}
            </Text>
          </View>

          <View>
            <CustomButton
              bgColor={theme.MAIN_ACCENT_COLOR}
              color={theme.APP_WHITE}
              text='Add User(s)'
              onClick={() => addUserToRoom(inviteList)}
              disabled={loading}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bodySectionContainer: {
    padding: horizontalScale(20)
  },
  bodySection: {}
});
