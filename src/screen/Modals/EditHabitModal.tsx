import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAtom, useSetAtom } from 'jotai'
import {
  editHabitAtom,
  selectedHabitAtom, showDeleteModalAtom
} from '../../state/state'
import {
  APP_BLACK,
  APP_WHITE, GRAY_TEXT,
  MAIN_ACCENT_COLOR,
  SECONDARY_BG_COLOR
} from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { generateStatsId } from '../../generators/generateId'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import React from 'react'
import { ROUTES } from '../../constants'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActionCreateStat } from '../../actions/actionCreateStat'
import { useToast } from '../../utils'

export const EditHabitModal = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom)
  const setEditHabit = useSetAtom(editHabitAtom)
  const setDeleteModal = useSetAtom(showDeleteModalAtom)

  const handleOnPressCloseIcon = () => {
    setSelectedHabit(null)
  }

  const handleOnPressDelete = () => {
    setDeleteModal(true)
  }

  const handleOnPressEdit = () => {
    setEditHabit(habitSelected)
    setSelectedHabit(null)
    navigate(ROUTES.CREATE_HABIT)
  }

  const handleOnPressMarkAsDone = async () => {
    const docs = await getDocs(
      query(
        collection(FIREBASE_DB, 'stats'),
        where('habitId', '==', habitSelected.id)
      )
    )

    if (docs.empty) {
      const stat = {
        id: generateStatsId(),
        userId: habitSelected.userId,
        habitId: habitSelected.id,
        completedAt: new Date().toDateString(),
        progress: 100
      }

      try {
        await ActionCreateStat(stat)

        useToast({
          message: 'Congratulations',
          type: 'success',
          icon: 'trending-up'
        })
      } catch (e) {
        useToast({
          message: 'An error happened when completing your habit. Please try again!',
          type: 'danger',
          icon: 'alert-circle'
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <View>
          <Text style={styles.habitTitle}>{habitSelected.name}</Text>
          <Text style={styles.highlightText}>Reminder: (In
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
          {/*<Text style={styles.infoText}>{habitSelected?.reminderAt}</Text>*/}
        </View>
      </View>

      <View style={styles.bodySection}>
        <Icon style={styles.icon} name='options-outline' size={25} color={APP_BLACK} />
        <View>
          <Text style={styles.highlightText}>Description</Text>
          <Text style={styles.infoText}>{habitSelected.description}</Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionSectionButton} onPress={handleOnPressDelete}>
          <Icon name='trash' size={25} color={APP_BLACK} />
          <Text style={styles.infoText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionSectionButton} onPress={handleOnPressEdit}>
          <Icon name='create-outline' size={25} color={APP_BLACK} />
          <Text style={styles.infoText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionSectionButton} onPress={handleOnPressMarkAsDone}>
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
