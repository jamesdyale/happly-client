import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Modal } from 'react-native'
import { APP_BLACK, APP_RED, APP_WHITE, GRAY_TEXT, SECONDARY_BG_COLOR } from '../../styles'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import Icon from 'react-native-vector-icons/Ionicons'
import { useAtom, useAtomValue, useSetAtom } from 'jotai/index'
import { dailyHabitsAtom, progressAtom, selectedHabitAtom, showDeleteModalAtom } from '@state/state'
import { useToast } from 'react-native-toast-notifications'

export const DeleteHabitModal = () => {
  const toast = useToast()

  const setProgress = useSetAtom(progressAtom)
  const setDailyHabits = useSetAtom(dailyHabitsAtom)
  const setDeleteModal = useSetAtom(showDeleteModalAtom)
  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom)

  const handleOnPressDelete = async () => {
    const dataDocumentSnapshot = await getDoc(
      doc(FIREBASE_DB, 'habits', habitSelected.id)
    )

    if (dataDocumentSnapshot.exists()) {
      try {
        await deleteDoc(
          doc(FIREBASE_DB, 'habits', habitSelected.id)
        )

        // TODO: Improve this logic
        setDailyHabits((prev) => prev.filter((habit) => habit.id !== habitSelected.id))
        setProgress((prev) => prev.filter((stat) => stat.habitId !== habitSelected.id))

        setSelectedHabit(null)
        setDeleteModal(false)

        toast.show('Habit Deleted.', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='trash' size={20} color={APP_WHITE} />
        })
      } catch (e) {
        toast.show('An error happened when completing your habit. Please try again!', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
        })
      }
    }

    setSelectedHabit(null)
  }

  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={true}>
        <SafeAreaView
          style={{ display: 'flex', flex: 1, position: 'relative', alignItems: 'center' }}>
          <View
            style={styles.bodySectionContainer}>
            <View style={styles.bodySection}>
              <Text style={styles.mainBodyHeader}>Delete Habit?</Text>
            </View>
            <View style={styles.actionSection}>
              <TouchableOpacity style={{ ...styles.actionSectionButton, ...styles.exitBtn }}
                                onPress={() => setDeleteModal(false)}>
                <Text style={{ color: APP_BLACK, ...styles.infoText }}>No, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.actionSectionButton, ...styles.goForwardWithActionBtn }}
                onPress={handleOnPressDelete}>
                <Text style={{ color: APP_WHITE, ...styles.infoText }}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {},
  bodySectionContainer: {
    width: '80%',
    marginTop: 30,
    position: 'absolute',
    bottom: 100,
    backgroundColor: APP_WHITE,
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
  bodySection: {},
  actionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  actionSectionButton: {
    borderRadius: 10,
    padding: 15,
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBodyHeader: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: GRAY_TEXT
  },
  infoText: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17
  },
  exitBtn: {
    borderColor: '#B0C1CB',
    borderWidth: 1
  },
  goForwardWithActionBtn: {
    borderColor: APP_RED,
    backgroundColor: APP_RED,
    borderWidth: 1
  }

})
