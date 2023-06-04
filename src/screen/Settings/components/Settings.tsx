import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK, APP_BLUE, APP_GREEN, APP_WHITE, MAIN_ACCENT_COLOR } from '../../../styles'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingsHeader}>
        <Icon name='chevron-back' size={25} color={APP_BLACK} onPress={() => navigation.goBack()} />
        <Text style={styles.settingsHeaderText}>Settings</Text>
      </View>

      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemTitle}>Account</Text>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <Image style={styles.settingsSubItemImage} source={require('../../../assets/channels4_profile.png')} />
            <Text style={{ marginLeft: 20 }}>Your profile</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>
      </View>

      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemTitle}>Experience</Text>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: MAIN_ACCENT_COLOR }}>
              <Icon name='notifications-sharp' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Notifications</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLACK }}>
              <Icon name='phone-portrait' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>App Theme</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>
      </View>

      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemTitle}>About</Text>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_GREEN }}>
              <Icon name='star' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Rate us</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: MAIN_ACCENT_COLOR }}>
              <Icon name='newspaper' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Suggest a feature</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLACK }}>
              <Icon name='bug' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Report a bug</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
        </View>
        <View style={styles.settingsSubItem}>
          <View style={styles.settingsItemContent}>
            <View style={{ ...styles.settingsItemIcon, backgroundColor: APP_BLUE }}>
              <Icon name='document-text' size={20} color={APP_WHITE} />
            </View>
            <Text style={{ marginLeft: 20 }}>Help & Support</Text>
          </View>
          <Icon name='chevron-forward' size={20} color={APP_BLACK} />
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
    color: '#ED9107'
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
