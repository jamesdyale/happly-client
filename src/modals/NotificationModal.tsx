import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK, APP_GRAY, APP_WHITE, GRAY_TEXT, MAIN_ACCENT_COLOR } from '~styles'
import Modal from 'react-native-modal'
import { CustomButton } from '~components'
import { useTheme } from '~hooks'

export const NotificationModal = ({ handleTimeSelected, closeNotificationModal }) => {
  const [time, setTime] = React.useState(new Date())
  const [show, setShow] = React.useState(true)

  const { theme } = useTheme()

  const handleChange = (event, selectedTime) => {

  }

  return (
    <View style={styles.wrapper}>
      <Modal isVisible={true}>
        <SafeAreaView style={{
          display: 'flex',
          flex: 1,
          position: 'relative',
          alignItems: 'center'
        }}>
          <View style={[styles.container, {
            backgroundColor: theme.MAIN_BG_COLOR
          }]}>
            <View style={[styles.heading, {
              borderBottomColor: theme.BORDER_COLOR
            }]}>
              <Text style={[styles.titleSection, {
                color: theme.MAIN_TEXT_COLOR
              }]}>New reminder</Text>
              <TouchableOpacity onPress={closeNotificationModal}>
                <Icon name='close' size={25} color={theme.MAIN_TEXT_COLOR} />
              </TouchableOpacity>
            </View>
            <View style={styles.timePickerWrapper}>
              <DateTimePicker
                testID='dateTimePicker'
                value={time}
                mode='time'
                onChange={(e, selectedTime) => setTime(selectedTime)}
                display='spinner'
                is24Hour={true}
                textColor={theme.MAIN_TEXT_COLOR}
              />
            </View>
            <View>
              <CustomButton
                bgColor={theme.MAIN_ACCENT_COLOR}
                color={theme.CONTRAST_MAIN_TEXT_COLOR}
                text='Add reminder'
                onClick={() => handleTimeSelected(time)}
                disabled={false}
              />

            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red'
  },
  container: {
    width: '100%',
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10
  },
  timePickerWrapper: {
    marginBottom: 10
  },
  titleSection: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: 'red'
  },
  addReminderBtn: {
    backgroundColor: MAIN_ACCENT_COLOR,
    color: APP_WHITE,
    borderRadius: 6,
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  addReminderBtnText: {
    color: APP_WHITE,
    fontFamily: 'Inter_500Medium',
    fontSize: 14
  }
})
