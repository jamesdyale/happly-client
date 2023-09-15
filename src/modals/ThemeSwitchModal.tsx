import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { Themes } from "~constants";
import { useTheme } from "~hooks";
import { useAtomValue } from "jotai";
import { selectedThemeAtom } from "~state";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const ThemeSwitchModal = ({
  handleSelectTheme,
  themeModalVisible,
  setThemeModalVisible
}: {
  handleSelectTheme: (theme: Themes) => void;
  themeModalVisible: boolean;
  setThemeModalVisible: (value: boolean) => void;
}) => {
  const { theme } = useTheme();
  const selectedThemeValue = useAtomValue(selectedThemeAtom);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.SECONDARY_BG_COLOR
        }
      ]}
    >
      <Modal
        isVisible={themeModalVisible}
        onBackdropPress={() => setThemeModalVisible(false)}
        hideModalContentWhileAnimating={true}
      >
        <SafeAreaView style={{ display: "flex", flex: 1, position: "relative", alignItems: "center" }}>
          <View
            style={[
              styles.bodySectionContainer,
              {
                backgroundColor: theme.APP_WHITE
              }
            ]}
          >
            <View style={styles.bodySection}>
              <View style={styles.themeSelectionContainer}>
                <TouchableOpacity
                  style={[
                    styles.themeTextContainer,
                    {
                      backgroundColor: `${
                        selectedThemeValue === Themes.LIGHT ? theme.MAIN_ACCENT_COLOR : theme.MAIN_TEXT_COLOR
                      }`,
                      paddingVertical: verticalScale(20),
                      paddingHorizontal: horizontalScale(20),
                      // borderWidth: 1,
                      borderBottomLeftRadius: moderateScale(20),
                      borderTopLeftRadius: moderateScale(20)
                    }
                  ]}
                  onPress={() => handleSelectTheme(Themes.LIGHT)}
                >
                  <Icon
                    name='sunny'
                    size={moderateScale(25)}
                    color={
                      selectedThemeValue === Themes.LIGHT
                        ? theme.CONTRAST_MAIN_TEXT_COLOR
                        : theme.CONTRAST_MAIN_TEXT_COLOR
                    }
                  />
                  <Text
                    style={[
                      {
                        marginLeft: horizontalScale(10),
                        color: `${
                          selectedThemeValue === Themes.LIGHT
                            ? theme.CONTRAST_MAIN_TEXT_COLOR
                            : theme.CONTRAST_MAIN_TEXT_COLOR
                        }`
                      }
                    ]}
                  >
                    Light
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeTextContainer,
                    {
                      backgroundColor: `${
                        selectedThemeValue === Themes.DARK ? theme.MAIN_ACCENT_COLOR : theme.CONTRAST_MAIN_TEXT_COLOR
                      }`,
                      paddingVertical: verticalScale(20),
                      paddingHorizontal: horizontalScale(20),
                      borderBottomRightRadius: moderateScale(20),
                      borderTopRightRadius: moderateScale(20)
                    }
                  ]}
                  onPress={() => handleSelectTheme(Themes.DARK)}
                >
                  <Icon
                    name='moon'
                    size={moderateScale(25)}
                    color={selectedThemeValue === Themes.DARK ? theme.MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR}
                  />
                  <Text
                    style={[
                      {
                        marginLeft: horizontalScale(10),
                        color: `${selectedThemeValue === Themes.DARK ? theme.MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR}`
                      }
                    ]}
                  >
                    Dark
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.3
  },
  bodySectionContainer: {
    marginTop: verticalScale(30),
    position: "absolute",
    bottom: verticalScale(150),
    borderRadius: moderateScale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  bodySection: {},
  actionSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20)
  },
  themeSelectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  themeTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});
