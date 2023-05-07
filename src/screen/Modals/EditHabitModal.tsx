import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  selectedHabitAtom,
  useClearSelectedHabitAtom
} from '../../state/state'
import {
  APP_BLACK,
  APP_WHITE, GRAY_TEXT,
  MAIN_ACCENT_COLOR,
  SECONDARY_BG_COLOR
} from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons'

export const EditHabitModal = () => {
  const clearSelectedHabit = useSetAtom(useClearSelectedHabitAtom)
  const habitSelected = useAtomValue(selectedHabitAtom)

  const handleOnPressCloseIcon = () => {
    clearSelectedHabit()
  }

  const handleOnPressDelete = () => {
    // TODO: Open delete modal
    console.log('deleting habit')
  }

  const handleOnPressEdit = () => {
    // TODO: Open edit modal
  }

  const handleOnPressMarkAsDone = () => {
    // TODO: Mark habit as done
  }

  return (
    <View style={styles.container}>

      <View style={styles.titleSection}>
        <View>
          <Text style={styles.habitTitle}>{habitSelected?.title}</Text>
          <Text style={styles.highlightText}>Reminder: {habitSelected?.reminderAt} (In
            30mins) {/* TODO: write function to figure out the time difference consider a case where reminder is past */} </Text>
        </View>
        <TouchableOpacity onPress={handleOnPressCloseIcon}>
          <Icon style={styles.closeIcon} name='close' size={25} color={APP_WHITE} />
        </TouchableOpacity>
      </View>

      <View style={styles.bodySection}>
        <Icon style={styles.icon} name='notifications-outline' size={25} color={APP_BLACK} />
        <View>
          <Text style={styles.highlightText}>Reminders</Text>
          <Text style={styles.infoText}>{habitSelected?.reminderAt}</Text>
        </View>
      </View>

      <View style={styles.bodySection}>
        <Icon style={styles.icon} name='options-outline' size={25} color={APP_BLACK} />
        <View>
          <Text style={styles.highlightText}>Description</Text>
          <Text style={styles.infoText}>{habitSelected?.description}</Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionSectionButton}>
          <Icon name='trash' size={25} color={APP_BLACK} />
          <Text style={styles.infoText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionSectionButton}>
          <Icon name='create-outline' size={25} color={APP_BLACK} />
          <Text style={styles.infoText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionSectionButton}>
          <Icon name='checkbox-outline' size={25} color={APP_BLACK} />
          <Text style={styles.infoText}>Mark as done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY_BG_COLOR,
    padding: 20,
    position: 'absolute',
    zIndex: 1000,
    bottom: 0,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    paddingBottom: 15
  },
  bodySection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9'
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  actionSectionButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
  habitTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 24,
    color: GRAY_TEXT,
    marginBottom: 3
  },
  highlightText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    lineHeight: 12,
    color: GRAY_TEXT
  },
  infoText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: GRAY_TEXT,
    marginTop: 3
  },
  icon: {
    marginRight: 15
  },
  closeIcon: {
    backgroundColor: MAIN_ACCENT_COLOR,
    width: 30,
    height: 30,
    padding: 2,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    color: APP_WHITE
  }
})