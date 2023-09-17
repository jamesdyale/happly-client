import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "~hooks";
import { ThemeSwitchModal } from "~modals";
import { ASYNC_STORAGE_KEYS, Themes } from "~constants";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedThemeAtom, themeAtom, userAtom } from "~state";
import Colors from "~constants/theme";
import { horizontalScale, moderateScale, storeData, verticalScale } from "~utils";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";

export const SettingsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [themeModalVisible, setThemeModalVisible] = React.useState(false);
  const changeTheme = useSetAtom(themeAtom);
  const user = useAtomValue(userAtom);
  const setSelectedTheme = useSetAtom(selectedThemeAtom);

  const openEmail = async (message: string) => {
    try {
      await Linking.openURL(encodeURI(message));
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not open email app.");
    }
  };

  const handleSelectTheme = async (theme: Themes) => {
    if (theme === Themes.LIGHT) {
      await storeData(ASYNC_STORAGE_KEYS.COLOR_SCHEME, "light");
      changeTheme(Colors.light);
      setSelectedTheme(Themes.LIGHT);
      setThemeModalVisible(false);
    } else {
      await storeData(ASYNC_STORAGE_KEYS.COLOR_SCHEME, "dark");
      changeTheme(Colors.dark);
      setSelectedTheme(Themes.DARK);
      setThemeModalVisible(false);
    }
  };

  const handleCopyToClipboard = async () => {
    const { id } = user;

    if (!id) {
      Alert.alert("Error", "Your UserID could not be copied to your clipboard. Please try again.");
      return;
    }

    await Clipboard.setStringAsync(id);

    Alert.alert("Copied to clipboard", "Your UserID has been copied to your clipboard.");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.MAIN_BG_COLOR
        }
      ]}
    >
      <ScrollView style={{ marginBottom: verticalScale(80) }}>
        <View
          style={[
            styles.settingsHeader,
            {
              borderBottomColor: "#E5E5E5"
            }
          ]}
        >
          <Icon
            name='chevron-back'
            size={moderateScale(25)}
            color={theme.MAIN_TEXT_COLOR}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[
              styles.settingsHeaderText,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            Settings
          </Text>
        </View>

        <View
          style={[
            styles.settingsItem,
            {
              borderBottomColor: "#E5E5E5"
            }
          ]}
        >
          <Text
            style={[
              styles.settingsItemTitle,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            General
          </Text>

          <TouchableOpacity style={styles.settingsSubItem} onPress={handleCopyToClipboard}>
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.MAIN_ACCENT_COLOR }]}>
                <Icon name='ios-person' size={moderateScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Copy UserID To Share With Friend
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() => setThemeModalVisible(true)}
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.MAIN_ACCENT_COLOR }]}>
                <Icon name='phone-portrait' size={horizontalScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Appearance
              </Text>
            </View>
          </TouchableOpacity>

          {/* <View style={styles.settingsSubItem}>
            <View style={styles.settingsItemContent}>
              <View
                style={[
                  styles.settingsItemIcon,
                  { backgroundColor: theme.MAIN_ACCENT_COLOR }
                ]}
              >
                <Icon
                  name='notifications-sharp'
                  size={20}
                  color={theme.APP_WHITE}
                />
              </View>
              <Text style={{ marginLeft: 20, color: theme.MAIN_TEXT_COLOR }}>
                Notifications & Alerts
              </Text>
            </View>
            <Icon
              name='chevron-forward'
              size={20}
              color={theme.MAIN_TEXT_COLOR}
              onPress={() => Alert.alert("Coming soon")}
            />
          </View> */}
        </View>

        <View
          style={[
            styles.settingsItem,
            {
              borderBottomColor: "#E5E5E5"
            }
          ]}
        >
          <Text
            style={[
              styles.settingsItemTitle,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            Experience
          </Text>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() =>
              openEmail(
                "mailto:engineeringwithjames@gmail.com?subject=Suggest a feature&body=Hi there, I would like to suggest a feature for the app."
              )
            }
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
                <Icon name='newspaper' size={moderateScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Suggest a feature
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() =>
              openEmail("mailto:engineeringwithjames@gmail?subject=REPORT: I found a bug&body=")
            }
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
                <Icon name='bug' size={moderateScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Report a bug
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://engineeringwithjames.github.io/happly-docs/privacy"
              )
            }
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
                <Icon
                  name='ios-file-tray-full-sharp'
                  size={moderateScale(20)}
                  color={theme.APP_WHITE}
                />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://jamesodeyale.github.io/happly-docs/terms_and_conditions"
              )
            }
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
                <Icon name='document-text' size={moderateScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>

          {/* TODO: Add review functionality - https://docs.expo.dev/versions/latest/sdk/storereview/ */}
          {/*const itunesItemId = ;*/}
          {/*// Open the iOS App Store in the browser -> redirects to App Store on iOS*/}
          {/*Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);*/}
          {/*// Open the iOS App Store directly*/}
          {/*Linking.openURL(*/}
          {/*  `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`*/}
          {/*);*/}
          {/*const androidPackageName = 'host.exp.exponent';*/}
          {/*// Open the Android Play Store in the browser -> redirects to Play Store on Android*/}
          {/*Linking.openURL(*/}
          {/*  `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`*/}
          {/*);*/}
          {/*// Open the Android Play Store directly*/}
          {/*Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);*/}
          {/*<View style={styles.settingsSubItem}>*/}
          {/*  <View style={styles.settingsItemContent}>*/}
          {/*    <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLUE }}>*/}
          {/*      <Icon name='document-text' size={20} color={APP_WHITE} />*/}
          {/*    </View>*/}
          {/*    <Text style={{ marginLeft: 20 }}>Terms of Service</Text>*/}
          {/*  </View>*/}
          {/*  <Icon name='chevron-forward' size={20} color={APP_BLACK}*/}
          {/*        onPress={() => WebBrowser.openBrowserAsync('https://jamesodeyale.github.io/happly-docs/terms_and_conditions')} />*/}
          {/*</View>*/}
        </View>

        <View style={[styles.settingsItem]}>
          <Text
            style={[
              styles.settingsItemTitle,
              {
                color: theme.MAIN_TEXT_COLOR
              }
            ]}
          >
            Follow Me
          </Text>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() =>
              WebBrowser.openBrowserAsync("https://www.instagram.com/engineeringwithjames/")
            }
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLACK }]}>
                <Icon name='ios-logo-instagram' size={moderateScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                Instagram
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsSubItem}
            onPress={() =>
              WebBrowser.openBrowserAsync("https://www.youtube.com/@engineeringwithjames")
            }
          >
            <View style={styles.settingsItemContent}>
              <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLACK }]}>
                <Icon name='ios-logo-youtube' size={moderateScale(20)} color={theme.APP_WHITE} />
              </View>
              <Text style={{ marginLeft: horizontalScale(20), color: theme.MAIN_TEXT_COLOR }}>
                YouTube
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*
      TODO: Add atom to control the theme switching when appearance button is clicked
      */}
        <ThemeSwitchModal
          handleSelectTheme={handleSelectTheme}
          themeModalVisible={themeModalVisible}
          setThemeModalVisible={setThemeModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  settingsHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    borderBottomWidth: moderateScale(1)
  },
  settingsHeaderText: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontSize: moderateScale(20),
    marginLeft: horizontalScale(15)
  },
  settingsItem: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20)
  },
  settingsItemTitle: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontSize: moderateScale(14),
    lineHeight: verticalScale(17),
    textTransform: "uppercase"
  },
  settingsItemContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  settingsSubItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(0),
    paddingLeft: horizontalScale(0),
    paddingRight: horizontalScale(0)
  },
  settingsSubItemImage: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(50)
  },
  settingsItemIcon: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(50),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
