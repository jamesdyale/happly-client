import { View, Text, StyleSheet, SafeAreaView, Linking, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as WebBrowser from 'expo-web-browser'
import { useTheme } from '~hooks'
import { ThemeSwitchModal } from '~modals'

export const SettingsScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.settingsHeader, {
        borderBottomColor: '#E5E5E5'
      }]}>
        <Icon name='chevron-back' size={25} color={theme.APP_BLACK} onPress={() => navigation.goBack()} />
        <Text style={[styles.settingsHeaderText, {
          color: theme.MAIN_TEXT_COLOR
        }]}>Settings</Text>
      </View>

      <View style={[styles.settingsItem, {
        borderBottomColor: theme.BORDER_COLOR
      }]}>
        <Text style={[styles.settingsItemTitle, {
          color: theme.MAIN_TEXT_COLOR
        }]}>General</Text>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.MAIN_ACCENT_COLOR }]}>
              <Icon name='ios-person' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Your profile</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.MAIN_ACCENT_COLOR }]}>
              <Icon name='phone-portrait' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Appearance</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => Alert.alert('Coming soon')} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.MAIN_ACCENT_COLOR }]}>
              <Icon name='notifications-sharp' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Notifications & Alerts</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => Alert.alert('Coming soon')} />
        </View>
      </View>

      <View style={[styles.settingsItem, {
        borderBottomColor: '#E5E5E5'
      }]}>
        <Text style={[styles.settingsItemTitle, {
          color: theme.APP_BLACK
        }]}>Experience</Text>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
              <Icon name='newspaper' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Suggest a feature</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => Linking.openURL('mailto:engineeringwithjames@gmail.com?subject=Suggest a feature&body=Hi there, I would like to suggest a feature for the app.')}
          />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
              <Icon name='bug' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Report a bug</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => Linking.openURL('mailto:engineeringwithjames@gmail?subject=REPORT: I found a bug&body=')}
          />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
              <Icon name='ios-file-tray-full-sharp' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Privacy Policy</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => WebBrowser.openBrowserAsync('https://jamesodeyale.github.io/happly-docs/privacy')} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLUE }]}>
              <Icon name='document-text' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Terms & Conditions</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => WebBrowser.openBrowserAsync('https://jamesodeyale.github.io/happly-docs/terms_and_conditions')} />
        </View>

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

      <View style={[styles.settingsItem, {
        borderBottomColor: '#E5E5E5'
      }]}>
        <Text style={[styles.settingsItemTitle, {
          color: theme.APP_BLACK
        }]}>Follow Me</Text>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLACK }]}>
              <Icon name='ios-logo-instagram' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Instagram</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => WebBrowser.openBrowserAsync('https://www.instagram.com/james_odeyale/')} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={[styles.settingsItemIcon, { backgroundColor: theme.APP_BLACK }]}>
              <Icon name='ios-logo-youtube' size={20} color={theme.APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>YouTube</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={theme.MAIN_TEXT_COLOR}
                onPress={() => WebBrowser.openBrowserAsync('https://www.youtube.com/@jamesodeyale')} />
        </View>
      </View>

      {/*
      TODO: Add atom to control the theme switching when appearance button is clicked
      */}
      {/*<ThemeSwitchModal />*/}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  settingsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    borderBottomWidth: 1
  },
  settingsHeaderText: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontSize: 20,
    marginLeft: 15
  },
  settingsItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 1
  },
  settingsItemTitle: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
    textTransform: 'uppercase'
  },
  settingsItemContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  settingsSubItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  settingsSubItemImage: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
