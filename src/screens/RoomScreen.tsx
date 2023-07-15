import {
  View,
  Text,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '~hooks'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export const RoomScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()

  return (
    <SafeAreaView style={[styles.wrapper, {
      backgroundColor: theme.SECONDARY_BG_COLOR
    }]}>
      <KeyboardAvoidingView style={[styles.container, {
        backgroundColor: theme.SECONDARY_BG_COLOR
      }]}>
        <View style={[styles.header, {
          borderBottomColor: theme.BORDER_COLOR
        }]}>
          <Icon name='chevron-back' size={25}
                color={theme.MAIN_TEXT_COLOR}
                onPress={() => navigation.goBack()}
                style={styles.backIcon}
          />
          <View style={styles.headerTextSection}>
            <View style={styles.headerText}>
              <Text style={[styles.roomName, { color: theme.MAIN_TEXT_COLOR }]}>Sleeping Early</Text>
              <Text style={[styles.members, { color: theme.MAIN_TEXT_COLOR + '90' }]}>100 Members</Text>
            </View>
            <View style={styles.actionBtn}>
              <TouchableOpacity style={styles.actionButtonContainer} onPress={() => navigation.goBack()}>
                <Icon name='md-person-add-sharp' size={20} color={theme.APP_BLACK} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonContainer}>
                <Icon name='md-ellipsis-vertical' size={20} color={theme.APP_BLACK} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.roomConversation}>
          <ScrollView>
            <Text>Room Screen</Text>
          </ScrollView>
          <View style={[styles.footer]}>
          </View>
        </View>


      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    width: '100%'
  },
  backIcon: {
    marginRight: 5,
    width: '10%'
  },
  headerTextSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%'
  },
  headerText: {},
  roomName: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 24,
    fontStyle: 'normal'

  },
  members: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    fontStyle: 'normal'
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80
  },
  actionButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roomConversation: {
    flex: 1
  }
})

