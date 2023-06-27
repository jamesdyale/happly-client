import { View, Text, StyleSheet, SafeAreaView, Linking, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { APP_BLACK, APP_BLUE, APP_WHITE, MAIN_ACCENT_COLOR } from '~styles'
import * as WebBrowser from 'expo-web-browser'

export const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingsHeader}>
        <Icon name='chevron-back' size={25} color={APP_BLACK} onPress={() => navigation.goBack()} />
        <Text style={styles.settingsHeaderText}>Settings</Text>
      </View>

      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemTitle}>General</Text>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: MAIN_ACCENT_COLOR }}>
              <Icon name='ios-person' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Your profile</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: MAIN_ACCENT_COLOR }}>
              <Icon name='phone-portrait' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Appearance</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} onPress={() => Alert.alert('Coming soon')} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: MAIN_ACCENT_COLOR }}>
              <Icon name='notifications-sharp' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Notifications & Alerts</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} onPress={() => Alert.alert('Coming soon')} />
        </View>
      </View>

      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemTitle}>Experience</Text>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLUE }}>
              <Icon name='newspaper' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Suggest a feature</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK}
                onPress={() => Linking.openURL('mailto:engineeringwithjames@gmail.com?subject=Suggest a feature&body=Hi there, I would like to suggest a feature for the app.')}
          />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLUE }}>
              <Icon name='bug' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Report a bug</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK}
                onPress={() => Linking.openURL('mailto:engineeringwithjames@gmail?subject=REPORT: I found a bug&body=')}
          />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLUE }}>
              <Icon name='ios-file-tray-full-sharp' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Privacy Policy</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK}
                onPress={() => WebBrowser.openBrowserAsync('https://jamesodeyale.github.io/happly-docs/privacy')} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLUE }}>
              <Icon name='document-text' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Terms & Conditions</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK}
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

      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemTitle}>Follow Me</Text>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLACK }}>
              <Icon name='ios-logo-instagram' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Instagram</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK}
                onPress={() => WebBrowser.openBrowserAsync('https://www.instagram.com/james_odeyale/')} />
        </View>

        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLACK }}>
              <Icon name='ios-logo-youtube' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>YouTube</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK}
                onPress={() => WebBrowser.openBrowserAsync('https://www.youtube.com/@jamesodeyale')} />
        </View>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },
  settingsHeaderText: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontSize: 20,
    color: '#000000',
    marginLeft: 15
  },
  settingsItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },
  settingsItemTitle: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
    textTransform: 'uppercase',
    color: APP_BLACK
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
